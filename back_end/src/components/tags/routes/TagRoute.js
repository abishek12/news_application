import express from "express";

// user controller
import { getTagController } from "../controllers/GetTagControllers.js";
import { createTagController } from "../controllers/CreateTagController.js";

// authorized middleware
import { authenticateToken } from "../../../middleware/authenticateToken.js";
import { authorizeRole } from "../../../middleware/authorize_role.js";

const route = express.Router();

route.get("/", getTagController);
route.post(
  "/",
  authenticateToken,
  authorizeRole(["admin", "subscriber"]),
  createTagController
);
// route.delete("/", deleteUserController);
// route.put("/", updateUserController);

export default route;
