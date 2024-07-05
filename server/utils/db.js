import mongoose from "mongoose"

const connectToDB = async () => {
    const URI = process.env.DB_URI || ""
    try {

        await mongoose.connect(URI)

        console.log("Database connected Successfully.");

    } catch (e) {
        console.log("Error connecting to MongoDB", e.message);
        process.exit(0)
    }
}

export default connectToDB