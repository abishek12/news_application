import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import cors from 'cors';

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
app.use(express.urlencoded({extended:false}))
// use of middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: true,
}))
app.options("*",cors);

// secret file
const PORT = process.env.PORT || 8888;
const version = process.env.version;


// check health status of the server
app.get(`${version}/health`, (req, res) => res.send("Server is Working"));

// import routing for api-server
import apiRoute from "./src/routes/api_routes.js";
app.use(version, apiRoute);

app.listen(PORT, () => {
    console.log(`Server is Running at: ${PORT}`);
});

