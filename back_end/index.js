import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";

/**
 * import user defined components
 */
import './src/config/database.js';

import { logger } from "./logger.js";
// Replacing console.log with winston
console.log = (message) => {
  logger.info(message);
};

const app = express();

// secret file
const PORT = process.env.PORT || 8888;
const version = process.env.version;

// use of middleware
app.use(express.json());
app.use(cookieParser());

// check health status of the server
app.get(`${version}/health`, (req, res) => res.send("Server is Working"));

// import routing for api-server
import apiRoute from "./src/routes/api_routes.js";
app.use(version, apiRoute);

app.listen(PORT, () => {
    console.log(`Server is Running at: ${PORT}`);
});
