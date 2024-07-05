import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const useLogin = () => {

    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const login = async ({ email, password }) => {

        const success = handleInputErrors({ email, password })

        if (!success) return

        setLoading(true)
        try {

            const response = await fetch(`/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (!response.ok) {
                return toast.error(data.message)
            }

            localStorage.setItem("userInfo", JSON.stringify(data))

            setAuthUser(data)

            toast.success("Login Successfully.")

        } catch (e) {
            toast.error(e.message);
        } finally {
            setLoading(false)
        }

    }

    return { loading, login }
}

const handleInputErrors = ({ email, password, }) => {
    if (!email || !password) {
        toast.error("Please fill in all fields")
        return false
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters")
        return false
    }

    return true
}

export default useLogin