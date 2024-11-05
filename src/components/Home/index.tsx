import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Registration System</h1>
      {user ? (
        <div className="text-center"> {/* Center-aligns the contents */}
        <h2 className="text-2xl">Hello, {user.username}!</h2>
        <button 
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          onClick={() => {
            localStorage.removeItem('user');
            window.location.reload(); // Reload page to clear user information
          }}
        >
          Logout
        </button>
      </div>
      ) : (
        <div>
         <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mx-2">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mx-2">
              Register
            </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
