import express from "express";
import userController from "../controllers/userController.js";

// Create Express Router instance
const router = express.Router();

router
  .route("/")
  // Define a route to get all users
  .get(userController.getUsers)
  // Define a route to create a new user
  .post(userController.createUser);

router
  .route("/:id")
  // Define a route to get user with the specified id
  .get(userController.getUserById)
  // Define a route to update user with the specified id
  .patch(userController.updateUserById)
  // Define a route to delete user with the specified id
  .delete(userController.deleteUserById);

export default router;
