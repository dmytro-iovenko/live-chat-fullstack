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
  .get(messageController.getMessageById)
  // Define a route to update message with the specified id
  .patch(messageController.updateMessageById)
  // Define a route to delete message with the specified id
  .delete(messageController.deleteMessageById);

router
  .route("/:id/status")
  // Define a route to get status of message with the specified id
  .get(messageController.getMessageStatusById)
  // Define a route to update status of message with the specified id
  .patch(messageController.updateMessageStatusById);

export default router;
