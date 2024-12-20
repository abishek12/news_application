import express from "express";

// user controller
import { getTagController } from "../controllers/GetTagControllers.js";
import { createTagController } from "../controllers/CreateTagController.js";

// authorized middleware
import { authorizeRole } from "../../../middleware/authorize_role.js";

const route = express.Router();

route.get("/", getTagController);
route.post("/", createTagController);
// route.delete("/", deleteUserController);
// route.put("/", updateUserController);

export default route;