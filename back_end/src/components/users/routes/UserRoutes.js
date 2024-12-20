import express from "express";

// user controller
import { getUsersController } from "../controllers/GetUserController.js";
import { deleteUserController } from "../controllers/DeleteUserController.js";
import { updateUserController } from "../controllers/UpdateUserController.js";

// authorized middleware
import { authorizeRole } from "../../../middleware/authorize_role.js";

const route = express.Router();

route.get("/", getUsersController);
route.delete("/", deleteUserController);
route.put("/", updateUserController);

export default route;
