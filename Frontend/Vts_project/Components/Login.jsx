import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem(email);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.password === password) {
        setMessage('Login successful!');
        navigate('/taketest'); // Redirect to the Take Test page
      } else {
        setMessage('Incorrect password!');
      }
    } else {
      setMessage('User not found. Please sign up.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Welcome Back!</h2>
        <form onSubmit={handleLogin} className="flex flex-col">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 p-2 rounded-full w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 p-2 rounded-full w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-red-500 text-center font-medium">{message}</p>}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don&apos;t have an account? <a href="/signup" className="text-indigo-500 font-medium hover:underline">Sign up</a>
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-blue-500 to-transparent opacity-30 rounded-tl-lg rounded-tr-lg"></div>
    </div>
  );
};

export default Login;
