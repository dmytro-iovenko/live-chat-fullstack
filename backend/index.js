import express from "express";
import connectDb from "./db/conn.js";
import userRoutes from "./routes/userRoutes.js";
import "dotenv/config";

// Define connection string
const connectionString = process.env.ATLAS_URI;
// Define port number
const port = process.env.PORT || 3000;

// Create express instance
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

app.use("/users", userRoutes);

// Start express server
app.listen(port, () => {
  console.log("Server is running on port:", port);
  // Connect to MongoDb using connection string
  connectDb(connectionString);
});
