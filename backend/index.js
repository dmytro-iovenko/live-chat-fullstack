import express from "express";
import connectDb from "./db/conn.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import "dotenv/config";

// Define connection string
const connectionString = process.env.ATLAS_URI;
// Define port number
const port = process.env.PORT || 3000;

// Create express instance
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Process custom routes
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);
app.use("/chats", chatRoutes);

// Error-handling Middleware
app.use((err, req, res, next) => {
  const time = new Date();
  const status = err.status || 500;
  res.status(status);
  res.json({
    status: status,
    error: err.message,
    timestamp: time,
    path: req.url,
  });
  console.error("------");
  console.error(`${time.toLocaleString()}: ${err.stack}`);
});

// Start express server
app.listen(port, () => {
  console.log("Server is running on port:", port);
  // Connect to MongoDb using connection string
  connectDb(connectionString);
});
