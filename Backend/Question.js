const mongoose = require('mongoose');

// Define the Question schema
const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true }, // Array of options
    correctAnswer: { type: String, required: true },
    difficulty: { type: String, required: true }
});

// Create the Question model
const Question = mongoose.model('Question', questionSchema);
