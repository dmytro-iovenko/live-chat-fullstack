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

export default router;
