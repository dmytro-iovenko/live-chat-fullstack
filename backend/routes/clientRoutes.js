import express from "express";
import clientController from "../controllers/clientController.js";
import clientAuth from "../middlewares/clientAuth.js";
import getClientId from "../middlewares/getClientId.js";

// Create Express Router instance
const router = express.Router();

router
  .route("/token")
  // Define a route to get token
  .post(clientController.getToken);

router
  .route("/agents")
  // Define a route to get all agents
  .get(clientController.getAgents);

router
  .route("/chats")
  // Define a route to get all chats
  .get(getClientId, clientController.getChats)
  // Define a route to create a new chat
  .post(clientAuth, clientController.createChat);

router
  .route("/chats/:id")
  // Define a route to get chat with the specified id
  .get(clientController.getChatById);

router
  .route("/chats/:id/messages")
  // Define a route to add message to chat with the specified id
  .post(clientController.addMessageToChat);

export default router;
