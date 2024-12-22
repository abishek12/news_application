import mongoose from "mongoose";

let postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slugs: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tags",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    images: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    reactions: {
      laugh: { type: Number, default: 0 },
      angry: { type: Number, default: 0 },
      sad: { type: Number, default: 0 },
      like: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export let Post = mongoose.model("posts", postSchema, "posts");
