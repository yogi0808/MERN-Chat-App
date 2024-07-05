import bcrypt from "bcryptjs"

import User from "../models/user-model.js"
import { generateToken } from "../utils/generate-token.js"

export const register = async (req, res) => {
    try {

        const { fullName, username, email, password, confirmPassword, gender, profilePic } = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match" });
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exist." })
        }

        const salt = await bcrypt.genSalt(10)
        const hasPassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const image = profilePic ? profilePic : gender === "male" ? boyProfilePic : girlProfilePic

        const newUser = new User({
            fullName,
            username,
            email,
            password: hasPassword,
            gender,
            profilePic: image
        })

        if (newUser) {

            generateToken(newUser._id, res)

            await newUser.save()

            return res.status(201).json({
                id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            })

        } else {
            return res.status(400).json({ error: "Invalid user data" });
        }

    } catch (e) {
        console.log("Error in register controller", e.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await User.findOne({ email })

        const isPasswordValid = await bcrypt.compare(password, user?.password || "")

        if (!user || !isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });

    } catch (e) {
        console.log("Error in login controller", e.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (e) {
        console.log("Error in logout controller", e.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}