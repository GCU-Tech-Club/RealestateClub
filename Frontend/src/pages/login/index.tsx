import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigator = useNavigate()

  const auth = getAuth()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      console.log(user)
      navigator('/accounts')
    } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        }
    }
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center h-full">
      <h1 className="text-4xl font-semibold text-gray-900 shadow-xl p-10 rounded-lg">Log into real estate club!</h1>
      {error && <p>{error}</p>}
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <input 
          type="email"
          className="border-2 border-gray-300 p-2 rounded-lg shadow-lg"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex items-center relative password">
        <input
          type={showPassword ? "text" : "password"}
          className="border-2 border-gray-300 p-2 rounded-lg shadow-lg"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
          <button onClick={(e) => {setShowPassword(!showPassword);e.preventDefault()}} className="absolute inset right-2">
            {showPassword ? (
              <svg className="svg-icon iconEyeOffSm" width="14" height="14"  viewBox="0 0 14 14"><path  d="M3.52 7.38 1.58 9.26A12 12 0 0 1 0 7s2.63-5.14 7.05-5.14q.99.01 1.86.32L7.44 3.6 7 3.57a3.5 3.5 0 0 0-3.48 3.81M5.3 9.99c.5.28 1.1.44 1.71.44 1.94 0 3.5-1.53 3.5-3.43q-.01-.94-.47-1.72L8.7 6.6q.05.2.05.4a1.73 1.73 0 0 1-2.13 1.67zm6.23-6.19A13 13 0 0 1 14 7s-2.62 5.14-6.95 5.14A6 6 0 0 1 4 11.3L2.27 13l-1.4-1.36L11.9 1l1.23 1.2z"/></svg>
            ) : (
              <svg className="svg-icon iconEyeSm" width="14" height="14"  viewBox="0 0 14 14"><path  d="M7.05 2C2.63 2 0 7.5 0 7.5S2.63 13 7.05 13C11.38 13 14 7.5 14 7.5S11.38 2 7.05 2M7 11.17A3.6 3.6 0 0 1 3.5 7.5 3.6 3.6 0 0 1 7 3.83c1.94 0 3.5 1.65 3.5 3.67A3.57 3.57 0 0 1 7 11.17m0-1.84c.97 0 1.75-.81 1.75-1.83S7.97 5.67 7 5.67s-1.75.81-1.75 1.83S6.03 9.33 7 9.33"/></svg>
            )
          }
          </button>
        </div>
        <button type="submit" className="p-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg">Login</button>
      </form>
      <div>
        New to real estate club?
        <Link className="text-blue-500 hover:text-blue-700" to="/register"> Register</Link>
      </div>
    </div>
  )
}

export default Login