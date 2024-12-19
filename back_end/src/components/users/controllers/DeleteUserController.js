import { User } from "../model/UserModel.js";

export const deleteUserController = async (req, res) => {
    try {
        let user_id = req.query.user_id;
        let items = await User.findOneAndDelete({
            _id: user_id,

        });

        if (!items) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Deleted Successfully",
        })
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: `Error: ${error}`
        });
    }
}