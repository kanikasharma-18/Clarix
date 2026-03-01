import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
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

// Groq API configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = 'openai/gpt-oss-120b';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

app.post('/api/generate-questions', async (req, res) => {
    try {
        const { subject, level, topics, count = 10 } = req.body;

        if (!subject || !level || !topics || topics.length === 0) {
            return res.status(400).json({ error: 'Missing required fields: subject, level, or topics array' });
        }

        console.log(`Generating ${count} ${subject} questions for level ${level} via Groq...`);

        const prompt = `You are an expert ${subject} educator creating a diagnostic quiz for ${level} students.
Generate exactly ${count} multiple choice questions.
The questions should be distributed across the following specific topics:
${JSON.stringify(topics, null, 2)}

Ensure the questions vary in difficulty (basic, intermediate, advanced) and test different levels of Bloom's Taxonomy.
Ensure the mathematical/scientific notation is clear and correct.

Return ONLY a valid JSON array (no markdown, no code fences) where each object has these exact keys:
- "concept" (string): The exact concept ID from the topics above
- "diff" (string): One of "basic", "int", "adv", or "application"
- "bloom" (string): e.g. "Recall", "Understanding", "Application", "Analyze"
- "text" (string): The question text
- "opts" (array of 4 strings): The four answer options
- "correct" (integer 0-3): 0-indexed position of the correct answer
- "hint" (string): A short hint for the student
- "exp" (string): A detailed explanation of the correct answer`;

        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages: [
                    { role: 'system', content: 'You are a helpful quiz generator. Always respond with valid JSON only, no markdown formatting.' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.4,
                response_format: { type: 'json_object' }
            })
        });

        if (!response.ok) {
            const errBody = await response.text();
            console.error('Groq API error:', response.status, errBody);
            throw new Error(`Groq API returned ${response.status}: ${errBody}`);
        }

        const data = await response.json();
        const raw = data.choices?.[0]?.message?.content;

        if (!raw) {
            throw new Error("Model returned empty response");
        }

        // Parse the JSON — handle both array and {questions: [...]} wrapper
        let questions;
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
            questions = parsed;
        } else if (parsed.questions && Array.isArray(parsed.questions)) {
            questions = parsed.questions;
        } else {
            throw new Error("Unexpected response format from model");
        }

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
