import express from "express";
import "dotenv/config";

const port = process.env.PORT || 3000;
const app = express();

// Start express server
app.listen(port, () => console.log("Server is running on port:", port));
