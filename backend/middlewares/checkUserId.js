import mongoose from "mongoose";

// Checking for mandatory user ID in the request
const checkUserId = (req, res, next) => {
  const filter = (req.locals && req.locals.filter) || {};
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).send({ error: "User ID is required." });
  }
  filter.users = userId;
  // Passing data through filtering middleware
  req.locals = { ...req.locals, filter };
  next();
};

export default checkUserId;
