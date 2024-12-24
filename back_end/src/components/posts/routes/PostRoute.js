import express from "express";

// user controller
import { getPosts, getSinglePost } from "../controllers/GetPosts.js";
import { createPost } from "../controllers/CreatePost.js";

// authorized middleware
import { authenticateToken } from "../../../middleware/authenticateToken.js";
import { authorizeRole } from "../../../middleware/authorize_role.js";

const route = express.Router();

route.get("/", getPosts).get("/:slug", getSinglePost);
route.post(
  "/",
  authenticateToken,
  authorizeRole(["admin", "editor"]),
  createPost
);
// route.delete("/", deleteUserController);
// route.put("/", updateUserController);

export default route;
