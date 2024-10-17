import mongoose from "mongoose";
import Chat from "../models/chat.js";
import Message from "../models/message.js";
import User from "../models/user.js";
import Client from "../models/client.js";

// Asynchronous function to create a new chat
const createChat = async (req, res) => {
  try {
    const { users, messages } = req.body;
    // Validate users and messages
    if (!Array.isArray(users) || !users.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      return res.send({ error: "Invalid users array" }).status(400);
    }
    if (!Array.isArray(messages) || !messages.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      return res.send({ error: "Invalid messages array" }).status(400);
    }
    const data = {
      users,
      messages,
      active: true, // ignore any user-provided active values, default to true
    };
    const newChat = await Chat.create(data);
    res.send(newChat).status(201);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to get all chats, filtered if necessary
const getChats = async (req, res) => {
  try {
    if (!req.user || !req.user._id) return res.status(400).send({ error: "User ID is required." });
    // Collect filters from req.locals.filter, if any
    const filter = (req.locals && req.locals.filter) || {};
    let chats = await Chat.find(filter).populate(["sender", "users", "messages"]).exec();
    // console.log(chats)
    // Process each chat and populate sender for messages
    const populatedChats = await Promise.all(
      chats.map(async (chat) => {
        const messages = await Promise.all(
          chat.messages.map(async (message) => {
            if (message.sender instanceof mongoose.Types.ObjectId) {
              // console.log(message, "1:",message.sender)
              const user = await User.findById(message.sender);
              const client = await Client.findById(message.sender);
              const sender = user ?? client;
              console.log(message, "2:", user, "3:", client, "4:", sender)
              if (sender) {
                const userId = new mongoose.Types.ObjectId(`${req.user._id}`);
                const name = userId && userId.equals(sender._id) ? "You" : sender.name;
                return { ...message.toObject(), sender: name };
              }
            }
            return { ...message.toObject() };
          })
        );
        return { ...chat.toObject(), messages };
      })
    );
    res.send(populatedChats).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to get chat with the specified id
const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id).populate(["sender", "users", "messages"]).exec();
    res.send(chat).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to delete message with the specified id
const deleteChatById = async (req, res) => {
  try {
    const deletedChat = await Chat.findByIdAndDelete(req.params.id);
    res.send(deletedChat).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to add users to chat with the specified id
const addUsersToChat = async (req, res) => {
  try {
    const { users } = req.body;
    // Validate users
    if (!Array.isArray(users) || !users.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      return res.send({ error: "Invalid users array" }).status(400);
    }
    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { users: { $each: users } } },
      { new: true, runValidators: true }
    );
    res.send(updatedChat).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to delete users from chat with the specified id
const deleteUsersFromChat = async (req, res) => {
  try {
    const { users } = req.body;
    // Validate users
    if (!Array.isArray(users) || !users.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      return res.send({ error: "Invalid users array" }).status(400);
    }
    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { $pullAll: { users: users } },
      { new: true, runValidators: true }
    );
    res.send(updatedChat).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to add message to chat with the specified id
const addMessageToChat = async (req, res) => {
  if (!req.user || !req.user._id) return res.status(400).send({ error: "User ID is required." });
  let session;
  try {
    // Start session
    session = await mongoose.startSession();
    // Start transaction
    session.startTransaction();
    // Create new message
    const sender = new mongoose.Types.ObjectId(`${req.user._id}`);
    const newMessage = await Message.create([{ ...req.body, sender }], { session });
    // Find chat by ID
    const chat = await Chat.findById(req.params.id).session(session);
    // Add new message to messages array
    chat.messages.push(newMessage[0]._id);
    // Save updated chat
    await chat.save({ session });
    // Commit transaction
    await session.commitTransaction();
    // Populate and return the updated chat
    const updatedChat = await Chat.findById(req.params.id).populate(["sender", "users", "messages"]).exec();
    // Ensure virtual property is set on the fetched document
    updatedChat._newMessage = newMessage[0];
    res.send(updatedChat).status(200);
  } catch (err) {
    // Abort transaction and rollback changes
    session && (await session.abortTransaction());
    res.send(err).status(400);
  } finally {
    // End session
    session && (await session.endSession());
  }
};

// Asynchronous function to delete message from chat with the specified id
const deleteMessageFromChat = async (req, res) => {
  let session;
  try {
    // Start session
    session = await mongoose.startSession();
    // Start transaction
    session.startTransaction();
    // Delete message with the specified id
    const deletedMessage = await Message.findByIdAndDelete(req.params.messageId).session(session);
    // Remove message ID from messages array
    await Chat.updateOne(
      { _id: req.params.id },
      { $pull: { messages: req.params.messageId } },
      { session }
    );
    // Commit transaction
    await session.commitTransaction();
    // Populate and return the updated chat
    const updatedChat = await Chat.findById(req.params.id).populate(["sender", "users", "messages"]).exec();
    // Ensure virtual property is set on the fetched document
    updatedChat._deletedMessage = deletedMessage;
    res.send(updatedChat).status(200);
  } catch (err) {
    // Abort transaction and rollback changes
    session && (await session.abortTransaction());
    res.send(err).status(400);
  } finally {
    // End session
    session && (await session.endSession());
  }
};

export default {
  createChat,
  getChats,
  getChatById,
  deleteChatById,
  addUsersToChat,
  deleteUsersFromChat,
  addMessageToChat,
  deleteMessageFromChat,
};
