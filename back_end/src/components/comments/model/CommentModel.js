import mongoose from "mongoose";

let commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "posts",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    content: { type: String, required: true },
    replies: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "users",
        },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export let Comment = mongoose.model("comments", commentSchema, "comments");
