import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  const handleAnswerSelection = (answerId) => {
    setUserAnswers(prevState => ({
      ...prevState,
      [currentQuestionIndex]: answerId
    }));
  };

  const handleSubmit = () => {
    if (userAnswers[currentQuestionIndex] === undefined) {
      alert("Please select an answer before submitting.");
      return;
    }
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => Math.min(prev + 1, questions.length - 1));
    setShowAnswer(false);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
    setShowAnswer(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="App">
      <h1>Question {currentQuestionIndex + 1} of {questions.length}</h1>
      <div>
        <p>{currentQuestion?.question}</p>
        {currentQuestion?.answers.map((answers, index) => (
          <div key={index}>
            <input
              type={currentQuestion.answerType === 'single' ? 'radio' : 'checkbox'}
              name="answer"
              id={answers.id}
              value={answers.id}
              onChange={() => handleAnswerSelection(answers.id)}
              checked={userAnswers[currentQuestionIndex] === answers.id}
            />
            <label htmlFor={answers.id}>{answers.text}</label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={userAnswers[currentQuestionIndex] === undefined}>Submit</button>
      {showAnswer && (
        <div>
          {currentQuestion.answers.map((answer) => (
            <p key={answer.id} style={{ color: answer.isCorrect ? 'green' : 'red' }}>
              {answer.text} {answer.isCorrect ? "(Correct)" : "(Incorrect)"}
            </p>
          ))}
        </div>
      )}
      <div>
        <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous Question</button>
        <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next Question</button>
      </div>
    </div>
  );
}

export default App;