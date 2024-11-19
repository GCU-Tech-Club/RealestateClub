import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'



const Login: React.FC = () => {
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const auth = getAuth()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
          await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            if (typeof)
          setError(error.message)
        }
    }

    return (
      <div className="w-full flex flex-col gap-4 justify-center items-center h-full">
        {error && <p>{error}</p>}
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            className="border-2 border-gray-300 p-2 rounded-lg shadow-lg"
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            className="border-2 border-gray-300 p-2 rounded-lg shadow-lg"
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit">Login</button>
        </form>
        <div>
            <h1 className="text-l font text-gray-900 p-0 rounded-lg mt-20">New to real estate club?</h1>
            <Link className="p-5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg" to="/register">Register</Link>
        </div>
      </div>
    )
  }

export default Login