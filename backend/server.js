const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection String
const mongoURI = 'mongodb+srv://ivan:q7InvN55@exam-app.8gu8x.mongodb.net/exam-app?retryWrites=true&w=majority';
//const mongoURI = 'mongodb://atlas-sql-67bc001b23d8720628d7b088-8gu8x.a.query.mongodb.net/exam-app?ssl=true&authSource=admin';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

// Define your Question Schema
const QuestionSchema = new mongoose.Schema({
  question: String,
  answers: Array,
  correctAnswers: Array, // Assuming this field is needed
  answerType: String,
});

//const Question = mongoose.model('Question', QuestionSchema);
const Question = mongoose.model('question', QuestionSchema);

// API to get random questions
app.get('/api/questions', async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 677 }}]); // Fetch random 10 questions
    res.json(questions);
  } catch (error) {
    res.status(500).send('Error fetching questions: ' + error);
  }
});

/* POST route to insert exam details
app.post('/api/questions', async (req, res) => {
  try {
    const { question, answers, correctAnswers, answerType } = req.body;

    // Create a new Question document
    const newQuestion = new Question({
      question,
      answers,
      correctAnswers,
      answerType,
    });

    // Save the new question to the database
    await newQuestion.save();
    res.status(201).json({ message: 'Question added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error inserting question into database', details: error });
  }
});
*/

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
