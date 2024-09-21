import User from "../models/user.js";

// Asynchronous function to create a new user
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.send(newUser).status(201);
  } catch (err) {
    // Set custom error for unique keys
    // https://stackoverflow.com/a/66511297
    if (err.code === 11000 || err.code === 11001) {
      err.message = `The ${Object.keys(err.keyValue)[0]} already exists`;
      console.log(err);
    }
    res.send(err).status(400);
  }
};

// Asynchronous function to get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users).status(200);
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
