import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      requried: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      requried: true,
      default: "subscriber",
      enum: ["admin", "editor", "subscriber"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("users", userSchema);
