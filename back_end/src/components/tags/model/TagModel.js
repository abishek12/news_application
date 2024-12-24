import mongoose from "mongoose";

let tagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  slugs: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export let Tag = mongoose.model("tags", tagSchema, "tags");
