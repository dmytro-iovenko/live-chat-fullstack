import express from "express";
import chatController from "../controllers/chatController.js";

// Create Express Router instance
const router = express.Router();

router
  .route("/")
  // Define a route to create a new message
  .post(chatController.createChat);

export default router;
