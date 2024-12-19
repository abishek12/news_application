// import library function
import express from "express";

// instance for route of express
const router = express.Router();

// import user-defined components

import userRoute from "../components/users/routes/UserRoutes.js";
router.use("/users", userRoute);

import authRoute from "../components/authentication/routes/AuthRoutes.js";
router.use("/auth", authRoute);

export default router;