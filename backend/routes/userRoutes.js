import express from "express";
import userController from "../controllers/userController.js";

// Create Express Router instance
const router = express.Router();

// Define a route to get all users
router.get("/", userController.getUsers);

// Define a route to create a new user
router.post("/", userController.createUser);

export default router;
