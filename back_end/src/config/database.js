import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

export const connection = mongoose.connect(DB_URI,).then((value) => {
    console.log("Database Connection Established")
});