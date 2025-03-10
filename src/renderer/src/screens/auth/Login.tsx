import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginType } from '../../types/auth.types'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState<loginType>({
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false) // Prevent multiple submits

  const handleLogin = async () => {
    if (isSubmitting) return // Prevent multiple clicks
    setIsSubmitting(true)

    const response = await window.electron.loginUser(userData.email, userData.password)

    if (response.success && response.isAuthenticated) {
      navigate('/dashboard')
    } else {
      await window.electron.openDialog('Login Failed', 'Try Correct crentendials.', 'error')
    }

    setIsSubmitting(false) // Re-enable input
  }

  return (
    <div className="h-screen w-full flex justify-center items-center ">
      <div className="relative group border border-gray-300/10 rounded-md px-6 py-12 bg-neutral-800 flex flex-col gap-2">
        <h1 className="text-5xl font-bold text-white/50 text-center">Login</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
            className="border border-gray-300/20 rounded-md p-2 w-96 outline-none focus:outline-none text-white"
            disabled={isSubmitting} // Disable input while submitting
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            onChange={(e) => setUserData((prev) => ({ ...prev, password: e.target.value }))}
            className="border border-gray-300/20 rounded-md p-2 w-96 outline-none focus:outline-none text-white"
            disabled={isSubmitting} // Disable input while submitting
          />
        </div>

        <button
          onClick={handleLogin}
          className="bg-white/10 rounded-md p-2 text-white mt-6"
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-white/50">
          Not Have an Account?{' '}
          <Link to={'/register'} className="text-violet-400 cursor-pointer">
            {' '}
            Register{' '}
          </Link>
        </p>

        <div className="absolute bottom-0 left-0 justify-center h-1 w-full items-center gap-1">
          <span className="bg-violet-800 w-full h-1 absolute bottom-0 left-0 rounded-b-md"></span>
          <span className="bg-violet-400 w-full h-[2px] group-hover:blur-lg blur-sm right-0 absolute bottom-0 left-0 rounded-b-md"></span>
        </div>
      </div>
    </div>
  )
}

export default Login
