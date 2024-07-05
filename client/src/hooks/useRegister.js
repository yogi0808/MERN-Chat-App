import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const useRegister = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const register = async ({
    fullName,
    username,
    email,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      email,
      password,
      confirmPassword,
      gender,
    })
    if (!success) return

    setLoading(true)
    try {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          email,
          password,
          confirmPassword,
          gender,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        return toast.error(data.message)
      }

      localStorage.setItem("userInfo", JSON.stringify(data))

      setAuthUser(data)

      toast.success("Register Successfully.")
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false)
    }
  }

  return { loading, register }
}

const handleInputErrors = ({
  fullName,
  username,
  email,
  password,
  confirmPassword,
  gender,
}) => {
  if (
    !fullName ||
    !username ||
    !email ||
    !password ||
    !confirmPassword ||
    !gender
  ) {
    toast.error("Please fill in all fields")
    return false
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match")
    return false
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters")
    return false
  }

  return true
}

export default useRegister
