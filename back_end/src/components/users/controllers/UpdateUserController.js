import mongoose from "mongoose";

import { User } from "../model/UserModel.js";

export const updateUserController = async (req, res) => {
    try {
        let userId = req.query.userId;
        let { firstName, lastName } = req.body;
 
        // check the user id and update the value
        let value = await User.findOneAndUpdate({
            _id: new mongoose.Types.ObjectId(userId),
        }, {
            firstName, lastName,
        }, { new: true, });

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
            message: "User updated Successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: `Error: ${error}`
        });
    }
}