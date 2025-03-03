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
    // For multiple answer questions, add/remove answerId to/from userAnswers
    setUserAnswers(prevState => {
      const currentAnswers = prevState[currentQuestionIndex] || [];
      if (currentAnswers.includes(answerId)) {
        return {
          ...prevState,
          [currentQuestionIndex]: currentAnswers.filter(id => id !== answerId)
        };
      } else {
        return {
          ...prevState,
          [currentQuestionIndex]: [...currentAnswers, answerId]
        };
      }
    });
  };
  const handleSubmit = () => {
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
        {currentQuestion?.answers.map((answer) => (
          <div key={answer.id}>
            <input type={currentQuestion.answerType === 'single' ? 'radio' : 'checkbox'}
              name="answer"
              id={answer.id}
              value={answer.id}
              onChange={() => handleAnswerSelection(answer.id)}
              checked={userAnswers[currentQuestionIndex]?.includes(answer.id)}
            />
            <label htmlFor={answer.id}>{answer.text}</label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={userAnswers[currentQuestionIndex]?.length === 0}>Submit</button>

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