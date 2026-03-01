import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'student' },
    level: { type: String, default: 'Intermediate' },
    goal: { type: String, default: 'Concept Mastery' },

    // Stores a map of concept IDs to scores (e.g., {'m11_sets': 85})
    mastery: { type: Map, of: Number, default: {} },

    sessions: { type: Number, default: 0 },
    history: { type: [Number], default: [] },
    streak: { type: Number, default: 0 },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
