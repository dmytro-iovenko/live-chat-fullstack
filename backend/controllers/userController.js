import User from "../models/user.js";

// Asynchronous function to handle user creation
const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const result = await User.create(newUser);
    res.send(result).status(201);
  } catch (err) {
    console.error(err);
  }
};

// Asynchronous function to get all users
const getUsers = async (req, res) => {
  try {
    const results = await User.find();
    res.send(results).status(200);
  } catch (err) {
    console.error(err);
  }
};

export default { createUser, getUsers };
