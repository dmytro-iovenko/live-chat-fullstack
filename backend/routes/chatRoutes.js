import express from "express";
import chatController from "../controllers/chatController.js";
import filterChatsByActive from "../middlewares/filterChatsByActive.js";

// Create Express Router instance
const router = express.Router();

router
  .route("/")
  // Define a route to get all chats, filtered if necessary
  .get(filterChatsByActive, chatController.getChats)
  // Define a route to create a new chat
  .post(chatController.createChat);

router
  .route("/:id")
  // Define a route to get chat with the specified id
  .get(chatController.getChatById)
  // Define a route to delete chat with the specified id
  .delete(chatController.deleteChatById);

router
  .route("/:id/users")
  // Define a route to add user(s) to chat with the specified id
  .post(chatController.addUsersToChatById);

export default router;
