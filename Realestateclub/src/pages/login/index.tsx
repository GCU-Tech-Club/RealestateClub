import { Link } from 'react-router-dom';
import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center h-full">
      <h1 className="text-4xl font-semibold text-gray-900 shadow-xl p-10 rounded-lg">Welcome to Real Estate Club Login</h1>
      <input type="email" className="border-2 border-gray-300 p-2 rounded-lg shadow-lg" placeholder="Email" />
      <input type="text" className="border-2 border-gray-300 p-2 rounded-lg shadow-lg" placeholder="Password" />
      <div className="flex flex-col gap-2 items-center">
        <Link className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg" to="/login">Login</Link>
        <h1 className="text-l font-semibold text-gray-900 p-0 rounded-lg mt-20">New to real estate club?</h1>
        <Link className="p-5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg" to="/register">Register</Link>
      </div>
    </div>
  )
}

export default Login;