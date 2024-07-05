import path from "path"
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Files
import authRoutes from "./routers/auth-routes.js"
import messageRoutes from "./routers/message-routes.js"
import usersRouter from "./routers/users-routes.js"
import connectToDB from "./utils/db.js";
import { app, server } from "./socket/socket.js";

dotenv.config()
app.use(express.json())
app.use(cookieParser())

const __dirname = path.resolve()

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", usersRouter)

app.use(express.static(path.join(__dirname, "/client/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

server.listen(process.env.PORT, () => {
    connectToDB()
    console.log(`server is running in port http://localhost:${process.env.PORT}`);
})