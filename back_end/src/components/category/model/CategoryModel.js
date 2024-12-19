import mongoose from "mongoose";

let categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slugs: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    }
}, { timestamps: true, });

export let Category = mongoose.model('category', categorySchema, 'category');