import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import connectDB from './db.js';
import User from './models/User.js';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve the static frontend files from the parent directory
app.use(express.static(path.join(__dirname, '../')));

// Initialize the Gemini SDK
// It automatically picks up the GEMINI_API_KEY from the environment
const ai = new GoogleGenAI({});

// Define the exact JSON schema we want the model to return
// This must perfectly match the Question Bank (QB) structure the frontend expects.
const responseSchema = {
    type: Type.ARRAY,
    description: "A list of multiple choice questions",
    items: {
        type: Type.OBJECT,
        properties: {
            concept: {
                type: Type.STRING,
                description: "The exact concept ID passed in the prompt."
            },
            diff: {
                type: Type.STRING,
                description: "The difficulty level, one of: 'basic', 'int', 'adv', or 'application'."
            },
            bloom: {
                type: Type.STRING,
                description: "The bloom's taxonomy classification, e.g., 'Recall', 'Understanding', 'Application', 'Analyze'."
            },
            text: {
                type: Type.STRING,
                description: "The actual text of the question."
            },
            opts: {
                type: Type.ARRAY,
                description: "Array of exactly 4 possible string answers.",
                items: { type: Type.STRING }
            },
            correct: {
                type: Type.INTEGER,
                description: "The integer 0-indexed position of the correct answer in the opts array (0, 1, 2, or 3)."
            },
            hint: {
                type: Type.STRING,
                description: "A short, helpful hint for the student if they get stuck."
            },
            exp: {
                type: Type.STRING,
                description: "A detailed explanation of why the correct answer is right and why the others are wrong."
            }
        },
        required: ["concept", "diff", "bloom", "text", "opts", "correct", "hint", "exp"]
    }
};

app.post('/api/generate-questions', async (req, res) => {
    try {
        const { subject, level, topics, count = 10 } = req.body;

        if (!subject || !level || !topics || topics.length === 0) {
            return res.status(400).json({ error: 'Missing required fields: subject, level, or topics array' });
        }

        console.log(`Generating ${count} ${subject} questions for level ${level}...`);

        // Construct the prompt giving the model context about what to generate
        const prompt = `
            You are an expert ${subject} educator creating a diagnostic quiz for ${level} students.
            Generate exactly ${count} multiple choice questions.
            The questions should be distributed across the following specific topics:
            ${JSON.stringify(topics, null, 2)}
            
            Ensure the questions vary in difficulty (basic, intermediate, advanced) and test different levels of Bloom's Taxonomy.
            Ensure the mathematical/scientific notation is clear and correct.
            Return the output adhering strictly to the provided JSON schema.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                // Slightly lower temperature for more deterministic/factual quizzes
                temperature: 0.4,
            }
        });

        // The response text should be a valid JSON array matching the schema
        const questionsJson = response.text;

        if (!questionsJson) {
            throw new Error("Model returned empty or invalid response");
        }

        const questions = JSON.parse(questionsJson);
        res.json({ questions });

    } catch (error) {
        console.error('Error generating questions:', error);
        res.status(500).json({ error: 'Failed to generate questions. ' + error.message });
    }
});

// Register Route
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, name, role, level, goal } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({
            email,
            password: hashedPassword,
            name,
            role: role || 'student',
            level: level || 'Intermediate',
            goal: goal || 'Concept Mastery'
        });

        console.log(`Registered new user: ${email}`);

        const userResponse = { ...user._doc };
        delete userResponse.password;

        res.status(201).json({ user: userResponse });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        console.log(`Logged in existing user: ${email}`);

        const userResponse = { ...user._doc };
        delete userResponse.password;

        res.json({ user: userResponse });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Sync Route
app.put('/api/users/sync', async (req, res) => {
    try {
        const { email, mastery, sessions, history, streak } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update fields
        user.sessions = sessions;
        user.history = history;
        user.streak = streak;

        // Update mastery map
        for (const [key, value] of Object.entries(mastery)) {
            user.mastery.set(key, value);
        }

        await user.save();
        res.json({ success: true, user });
    } catch (error) {
        console.error('Sync error:', error);
        res.status(500).json({ error: 'Failed to sync data' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Clarix generative AI backend running on http://localhost:${PORT}`);
});
