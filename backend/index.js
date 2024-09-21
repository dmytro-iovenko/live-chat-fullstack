import express from "express";
import "dotenv/config";
import connectDb from "./db/conn.js";

// Define connection string
const connectionString = process.env.ATLAS_URI;
// Define port number
const port = process.env.PORT || 3000;

// Create express instance
const app = express();


// Start express server
app.listen(port, () => {
  console.log("Server is running on port:", port);
  // Connect to MongoDb using connection string
  connectDb(connectionString);
});
