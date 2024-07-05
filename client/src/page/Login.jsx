import React, { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../hooks/useLogin"
import LoadingSvg from "../svgs/LoadingSvg"

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const { loading, login } = useLogin()

  const handleOnChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(user)
  }

  return (
    <div className="glass p-6 min-w-96">
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-semibold text-center text-gray-300 mb-3">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          className="input"
          value={user.email}
          onChange={handleOnChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          className="input"
          value={user.password}
          onChange={handleOnChange}
        />
        <Link
          to="/register"
          className="text-sm hover:underline hover:text-blue-600 font-medium inline-block w-fit text-nowrap"
        >
          "Don't" have an account?
        </Link>
        <button className="btn mt-3">
          {loading ? <LoadingSvg /> : "Login"}
        </button>
      </form>
    </div>
  )
}

export default Login
