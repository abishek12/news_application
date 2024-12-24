import express from "express";

// user controller
import {
  getUsersController,
  getUserController,
} from "../controllers/GetUserController.js";
import { deleteUserController } from "../controllers/DeleteUserController.js";
import { updateUserController } from "../controllers/UpdateUserController.js";

// authorized middleware
import { authenticateToken } from "../../../middleware/authenticateToken.js";
import { authorizeRole } from "../../../middleware/authorize_role.js";

const route = express.Router();

route
  .get("/", authenticateToken, authorizeRole(["admin"]), getUsersController)
  .get("/profile", authenticateToken, getUserController)
  .delete(
    "/",
    authenticateToken,
    authorizeRole(["admin"]),
    deleteUserController
  )
  .put("/", authenticateToken, authorizeRole(["admin"]), updateUserController);

export default route;
