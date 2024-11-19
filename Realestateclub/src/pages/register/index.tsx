
import React from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
    return (
        <div className="w-full flex flex-col gap-4 justify-center items-center h-full">
          <h1 className="text-4xl font-semibold text-gray-900 shadow-xl p-10 rounded-lg">Welcome to Real Estate Club Login</h1>
          <input type="text" className="border-2 border-gray-300 p-2 rounded-lg shadow-lg" placeholder="Username" />
          <input type="email" className="border-2 border-gray-300 p-2 rounded-lg shadow-lg" placeholder="Email" />
          <input type="text" className="border-2 border-gray-300 p-2 rounded-lg shadow-lg" placeholder="Password" />
          <div className="flex gap-2">
            <Link className="p-5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg" to="/register">Register</Link>
          </div>
        </div>
      )
}

export default Register;