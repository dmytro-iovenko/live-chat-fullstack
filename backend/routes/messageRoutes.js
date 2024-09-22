import express from "express";
import messageController from "../controllers/messageController.js";

// Create Express Router instance
const router = express.Router();

router
  .route("/")
  // Define a route to get all users
  .get(messageController.getMessages)
  // Define a route to create a new message
  .post(messageController.createMessage);

router
  .route("/:id")
  // Define a route to get message with the specified id
  .get(messageController.getMessageById);

export default router;
