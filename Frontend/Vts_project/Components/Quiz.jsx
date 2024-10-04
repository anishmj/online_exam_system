import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions } = location.state || {};

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [answered, setAnswered] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  if (!questions || questions.length === 0) {
    return <p>No questions found. Please try again.</p>;
  }

  const handleAnswer = (selectedAnswer) => {
    if (!answered) {
      setUserAnswer(selectedAnswer);
      setAnswered(true);
      if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
        setScore(score + 1);
        setFeedback('Correct!');
      } else {
        setFeedback(`Incorrect! The correct answer is: ${questions[currentQuestionIndex].correct_answer}`);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setUserAnswer(null);
      setFeedback('');
      setAnswered(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const getShuffledOptions = () => {
    const options = [
      ...questions[currentQuestionIndex].incorrect_answers,
      questions[currentQuestionIndex].correct_answer,
    ];
    return options.sort(() => Math.random() - 0.5);
  };

  const handleQuizCompletion = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p>Your final score is: {score} out of {questions.length}</p>
        <button onClick={() => navigate('/taketest')} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Retake the Test</button>
        <button onClick={() => navigate('/')} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">Navigate to Home Page</button>
      </div>
    );
  };

  return (
    <div className="quiz-container flex flex-col items-center justify-center h-screen bg-gray-100">
      {!isQuizComplete ? (
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">{questions[currentQuestionIndex].question}</h2>
          <div className="options-container mb-4">
            {getShuffledOptions().map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`option-button ${userAnswer === option ? 'bg-blue-500 text-white' : 'bg-gray-200'} p-2 rounded w-full mb-2 hover:bg-blue-300 transition`}
              >
                {option}
              </button>
            ))}
          </div>
          {answered && (
            <div>
              <p className="mt-2 text-lg">{feedback}</p>
              <button onClick={handleNextQuestion} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition mt-4">Next Question</button>
            </div>
          )}
        </div>
      ) : (
        handleQuizCompletion()
      )}
    </div>
  );
};

export default Quiz;
