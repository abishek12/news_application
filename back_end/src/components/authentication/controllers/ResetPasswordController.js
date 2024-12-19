// import library function
import mongoose from "mongoose";

// import user-defined model
import { User } from "../../users/model/UserModel.js";
import { encryptPassword } from "../../../helper/password_helper.js";

export const resetPasswordController = async (req, res) => {
    try {
        let userId = req.query.user_id;
        let { new_password, confirm_password } = req.body;

        // check user password match or not
        if (new_password !== confirm_password) {
            return res.status(400).json({
                status: 400,
                message: "Password didn't matched",
            });
        }

        // encrypt password before updating
        let password = encryptPassword(new_password);
        let userItem = await User.findOneAndUpdate(
            { _id:new mongoose.Types.ObjectId(userId) },
            {
                password
            }, { new: true });

        // check if the user exists or not after process reseting password
        if (!userItem) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
            });
        }

        // reset completed
        return res.status(200).json({
            status: 200,
            message: "Password updated Successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: `Error: ${error}`,
        });
    }
}