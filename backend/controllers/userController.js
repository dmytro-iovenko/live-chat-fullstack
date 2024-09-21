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

// Asynchronous function to get user with the specified id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to update user with the specified id
const updateUserById = async (req, res) => {
  try {
    const options = {
      new: true, // return the modified document rather than the original
    };
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, options);
    res.send(updatedUser).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to update user with the specified id
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.send(deletedUser).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

export default { createUser, getUsers, getUserById, updateUserById, deleteUserById };
