import dotenv from "dotenv";
import { Server } from "http";
import ConnectDB from "./config/db.connect";
import app from "./app";

// Load environment variables
dotenv.config();

const port = process.env.PORT || 8090;

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.error(`Error: ${err.message}`);
  console.error(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});

// Start the server
const server: Server = app.listen(port, async () => {
  await ConnectDB();
  console.log(`Server running on http://localhost:${port}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error(`Error: ${err.message}`);
  console.error(`Shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
