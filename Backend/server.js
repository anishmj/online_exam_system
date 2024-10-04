import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fetch from 'node-fetch'; // Ensure you're using an appropriate version of node-fetch
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define your question schema and model
const questionSchema = new mongoose.Schema({
    question: String,
    correct_answer: String,
    incorrect_answers: [String],
    category: String,
    difficulty: String,
});

const Question = mongoose.model('Question', questionSchema);

// API endpoint to fetch and save questions
app.get('/api/fetch-questions', async (req, res) => {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
        const data = await response.json();

        if (!data.results) {
            return res.status(500).json({ message: 'No questions found' });
        }

        // Save questions to the database
        const savedQuestions = await Question.insertMany(data.results);
        res.json(savedQuestions); // Send saved questions as response
    } catch (error) {
        console.error('Error fetching and saving questions:', error.message);
        res.status(500).json({ message: 'Error fetching and saving questions' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
