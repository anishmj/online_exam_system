import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from '../Components/Signup';
import Login from '../Components/Login';
import TakeTest from '../Components/TakeTest';
import Quiz from '../Components/Quiz'; // Import Quiz component

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Router>
      <div className="app">
        <h1>{showLogin ? 'Login' : 'Signup'} Page</h1>
        <button onClick={toggleForm}>
          {showLogin ? 'Switch to Signup' : 'Switch to Login'}
        </button>
        <Routes>
          <Route path="/" element={showLogin ? <Login /> : <Signup />} />
          <Route path="/taketest" element={<TakeTest />} />
          {/* Pass state to Quiz route */}
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
