// library package
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";

// Import Model
import { User } from "../../users/model/UserModel.js";

export const loginUserController = async (req, res) => {
    try {
        let privateKey = process.env.JWT_TOKEN;

        // validation from server-side
        let schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).required(),
        });

        let { error } = schema.validate(req.body);

        if (error) return res.status(400).json({
            status: 400,
            message: error.details[0].message,
        });

        // any error does not occur than; process for login
        const { email, password } = req.body;

        // check user exists or not
        let userItem = await User.findOne({
            email,
        });

        // If user items exists or not
        if (!userItem)
            return res.status(404).json({
                status: 404,
                message: "User Not Found",
            });

        // compare user-stored password with the database password
        let decPassword = await bcrypt.compareSync(password, userItem['password']);

        if (!decPassword)
            return res.status(403).json({
                status: 403,
                message: "Password did not matched"
            });
 
        let token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: {
                id: userItem['_id'],
                first_name: userItem['firstName'],
                last_name: userItem['lastName'],
                email: userItem['email'],
                role: userItem['role']
            },
        }, privateKey);

        // set cookies in users browser
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "Strict",
            path: "/"
        });

        return res.status(200).json({
            status: 200,
            message: "Logging Successful",
            token,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: `Error: ${error}`,
        })
    }
}