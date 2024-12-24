import express from "express";

// user controller
import { getCategoryController } from "../controllers/GetCategoryController.js";
import { createCategoryController } from "../controllers/CreateCategoryController.js";

// authorized middleware
import { authenticateToken } from "../../../middleware/authenticateToken.js";
import { authorizeRole } from "../../../middleware/authorize_role.js";

const route = express.Router();

route.get("/", getCategoryController);
route.post("/",authenticateToken, authorizeRole(['admin', ['editor']]), createCategoryController);
// route.delete("/", deleteUserController);
// route.put("/", updateUserController);

export default route;