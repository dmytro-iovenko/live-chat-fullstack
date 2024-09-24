import mongoose from "mongoose";
import Chat from "../models/chat.js";
import Message from "../models/message.js";

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
    const filter = req.filter;
    const chats = await Chat.find(filter).populate(["users", "messages"]).exec();
    res.send(chats).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to get chat with the specified id
const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id).populate(["users", "messages"]).exec();
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
  let session;
  try {
    // Start session
    session = await mongoose.startSession();
    // Start transaction
    session.startTransaction();
    // Create new message
    const newMessage = await Message.create([req.body], { session });
    // Find chat by ID
    const chat = await Chat.findById(req.params.id).session(session);
    // Add new message to messages array
    chat.messages.push(newMessage[0]._id);
    // Save updated chat
    await chat.save({ session });
    // Commit transaction
    await session.commitTransaction();
    // Populate and return the updated chat
    const updatedChat = await Chat.findById(req.params.id).populate(["users", "messages"]).exec();
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
    const chatUpdateResult = await Chat.updateOne(
      { _id: req.params.id },
      { $pull: { messages: req.params.messageId } },
      { session }
    );
    // Commit transaction
    await session.commitTransaction();
    // Populate and return the updated chat
    const updatedChat = await Chat.findById(req.params.id).populate(["users", "messages"]).exec();
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
