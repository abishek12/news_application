import express from "express";

import { loginUserController } from "../controllers/SignInController.js";
import { registerUserController } from "../controllers/SignUpController.js";
import { resetPasswordController } from "../controllers/ResetPasswordController.js";

const route = express.Router();

route.post("/register", registerUserController);
route.post("/login", loginUserController);
route.put("/password-reset", resetPasswordController);

export default route;