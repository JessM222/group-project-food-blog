import fs from "fs";
import path from "path";

if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

export function logRequestsToFile(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;

  const logMessage = `[${timestamp}] ${method} ${url} \n`;

  fs.appendFile(path.join("logs", "requests.log"), logMessage, (err) => {
    if (err) {
      console.error("Failed to log request:", err);
    }
  });

  next();
}
