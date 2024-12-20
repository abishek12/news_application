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
});

export let Tag = mongoose.model("tags", tagSchema, "tags");
