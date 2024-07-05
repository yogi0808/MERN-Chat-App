import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import Home from "./page/Home"
import Login from "./page/Login"
import Register from "./page/Register"
import { Toaster } from "react-hot-toast"
import { useAuthContext } from "./context/AuthContext"

const App = () => {
  const { authUser } = useAuthContext()

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to={"/"} /> : <Register />}
        />
        <Route
          path="*"
          element={<div>404</div>}
        />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
