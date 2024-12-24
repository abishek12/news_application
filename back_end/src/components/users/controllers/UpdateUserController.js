import mongoose from "mongoose";

import { User } from "../model/UserModel.js";

export const updateUserController = async (req, res) => {
  try {
    let userId = req.query.userId;
    let { firstName, lastName, update_role } = req.body;
    let { id, role } = req.user;

    if (id !== userId || role.includes("admin")) {
        return res.status(403).json({
            status: 403,
            message: "You are not authorized to delete this user",
          });
    }

    // check the user id and update the value
    let value = await User.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(userId),
      },
      {
        firstName,
        lastName,
        role: update_role,
      },
      { new: true }
    );

    // check user id found and display message if not found
    if (!value) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    // user profile updated
    return res.status(200).json({
      status: 200,
      message: "User updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `Error: ${error}`,
    });
  }
};
