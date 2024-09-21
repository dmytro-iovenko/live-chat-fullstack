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

export { createUser };