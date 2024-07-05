import React, { useState } from "react"
import { Link } from "react-router-dom"
import useRegister from "../hooks/useRegister.js"
import LoadingSvg from "../svgs/LoadingSvg"

const Register = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  })

  const { loading, register } = useRegister()

  const handleOnChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await register(user)
  }

  return (
    <div className="glass p-6 min-w-96">
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-semibold text-center text-gray-300 mb-3">
          Register
          <span className="text-blue-500"> ChatApp</span>
        </h1>
        <input
          type="text"
          name="fullName"
          placeholder="Enter your Full Name"
          className="input"
          value={user.fullName}
          onChange={handleOnChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Enter your Username"
          className="input"
          value={user.username}
          onChange={handleOnChange}
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Enter your Confirm Password"
          className="input"
          value={user.confirmPassword}
          onChange={handleOnChange}
        />
        <select
          className="input"
          name="gender"
          onChange={handleOnChange}
        >
          <option
            value=""
            selected
            disabled
          >
            gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <Link
          to="/login"
          className="link"
        >
          Have an account?
        </Link>
        <button className="btn mt-3">
          {loading ? <LoadingSvg /> : "Register"}
        </button>
      </form>
    </div>
  )
}

export default Register
