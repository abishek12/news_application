import mongoose from "mongoose";

let referSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    referralCode: { type: String, unique: true, required: true },
    referredUsers: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rewardGiven: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export let Refer = mongoose.model("refer", referSchema, "refer");