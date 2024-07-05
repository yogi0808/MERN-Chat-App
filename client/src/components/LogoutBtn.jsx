import React from "react"
import LogoutSvg from "../svgs/LogoutSvg"
import useLogout from "../hooks/useLogout.js"
import LoadingSvg from "../svgs/LoadingSvg"

const LogoutBtn = () => {
  const { loading, logout } = useLogout()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await logout()
  }

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit}
    >
      <button>{loading ? <LoadingSvg /> : <LogoutSvg />}</button>
    </form>
  )
}

export default LogoutBtn
