import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TakeTest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const handleTakeTest = async () => {
    setLoading(true);
    setError('');

    // Fetch quiz questions
    try {
      const response = await fetch('http://localhost:5000/api/fetch-questions');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setQuestions(data);
      navigate('/quiz', { state: { questions: data } });
    } catch (err) {
      setError('Failed to fetch questions. Please try again later.');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the Test Page</h2>
        <p className="text-gray-600 mb-8">Click the button below to start your test.</p>
        
        <button
          onClick={handleTakeTest}
          className="bg-blue-600 text-white py-2 px-8 rounded-full hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Take Test'}
        </button>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex items-center justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default TakeTest;
