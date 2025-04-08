// Configure environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";

if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

function logRequestsToFile(req, res, next) {
  const logMessage = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}\n`;

  fs.appendFile(path.join("logs", "requests.log"), logMessage, (err) => {
    if (err) {
      console.error("Failed to log request:", err);
    }
  });

  next(); 
}

// Set our port to the PORT environment variable, or 3000 by default if the env is not configured
const PORT = process.env.PORT ?? 3000;

// Creates the express server
const app = express();

app.use(logRequestsToFile);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: [`http://localhost:${PORT}`, process.env.FRONTEND_ORIGIN],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
  })
);
app.use(express.json());
app.use(express.static("public"));

// Import and use our application routes.
import routes from "./routes/routes.js";
app.use("/", routes);

app.use('/images', express.static('images'));

// Make sure our database is up and running
import { getDatabase } from "./data/database.js";
await getDatabase();

// Start the server running.
app.listen(PORT, () => {
  console.log(`PGCIT Final Project server listening on port ${PORT}`);
});

