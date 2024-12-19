import express from "express";

// user controller
import { getCategoryController } from "../controllers/GetCategoryController.js";
import { createCategoryController } from "../controllers/CreateCategoryController.js";

// authorized middleware
import { authorizeRole } from "../../../middleware/authorize_role.js";

const route = express.Router();

route.get("/", getCategoryController);
route.post("/", createCategoryController);
// route.delete("/", deleteUserController);
// route.put("/", updateUserController);

export default route;