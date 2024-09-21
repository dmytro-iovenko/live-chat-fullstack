import User from "../models/user.js";

// Asynchronous function to handle user creation
const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const result = await User.create(newUser);
    res.send(result).status(201);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to get all users
const getUsers = async (req, res) => {
  try {
    const results = await User.find();
    res.send(results).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to get all users
const getUserById = async (req, res) => {
  try {
    const results = await User.findById(req.params.id);
    res.send(results).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};
export default { createUser, getUsers, getUserById };
