import express from "express";

// user controller
import { getPosts, getPostById } from "../controllers/GetPosts.js";
import { createPost } from "../controllers/CreatePost.js";

// authorized middleware
import { authorizeRole } from "../../../middleware/authorize_role.js";

const route = express.Router();

route.get("/", getPosts);
route.post("/", createPost);
// route.delete("/", deleteUserController);
// route.put("/", updateUserController);

export default route;
