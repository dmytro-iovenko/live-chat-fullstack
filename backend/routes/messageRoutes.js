import express from "express";
import messageController from "../controllers/messageController.js";

// Create Express Router instance
const router = express.Router();

router
  .route("/")
  // Define a route to create a new message
  .post(messageController.createMessage);

export default router;
