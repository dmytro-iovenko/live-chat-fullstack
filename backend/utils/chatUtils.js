import mongoose from "mongoose";
import User from "../models/user.js";
import Client from "../models/client.js";

export const populateUsers = async (userIds) => {
  return Promise.all(
    userIds.map(async (userId) => {
      const agent = await User.findById(userId);
      const client = await Client.findById(userId);
      return agent ?? client;
    })
  );
};

export const populateMessages = async (messages, userId) => {
  return Promise.all(
    messages.map(async (message) => {
      if (message.sender instanceof mongoose.Types.ObjectId) {
        const agent = await User.findById(message.sender);
        const client = await Client.findById(message.sender);
        const sender = agent || client;
        if (sender) {
          const name = userId && userId.equals(sender._id) ? "You" : sender.name;
          return { ...message.toObject(), sender: name };
        }
      }
      return { ...message.toObject() };
    })
  );
};
