// import library function
import express from "express";

// instance for route of express
const router = express.Router();

// import user-defined components

import userRoute from "../components/users/routes/UserRoutes.js";
router.use("/users", userRoute);

import authRoute from "../components/authentication/routes/AuthRoutes.js";
router.use("/auth", authRoute);

import postRoute from "../components/posts/routes/PostRoute.js";
router.use("/posts", postRoute);

import categoryRoute from "../components/category/routes/CategoryRoute.js";
router.use("/category", categoryRoute);

import tagRoute from "../components/tags/routes/TagRoute.js";
router.use("/tags", tagRoute);

export default router;