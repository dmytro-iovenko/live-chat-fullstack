import mongoose from "mongoose";
import Chat from "../models/chat.js";
import Message from "../models/message.js";
import { populateUsers, populateMessages } from "../utils/chatUtils.js";
import User from "../models/user.js";

// Asynchronous function to create a new chat
const createChat = async (req, res) => {
  try {
    const { client } = req.body;

    if (!mongoose.Types.ObjectId.isValid(client)) {
      return res.status(400).send({ error: "Invalid Client ID" });
    }

    const data = {
      agent: req.user._id,
      client,
      users: [req.user._id, client],
      active: true, // ignore any user-provided active values, default to true
    };

    const newChat = await Chat.create(data);
    const populatedChat = await Chat.populate(newChat, ["agent", "client"]);
    const users = await populateUsers(populatedChat.users);
    const finalChat = { ...populatedChat.toObject(), users };

    res.status(201).send(finalChat);
  } catch (err) {
    res.status(400).send({ error: "An error occurred while creating the chat.", details: err.message });
  }
};

// Asynchronous function to get all chats, filtered if necessary
const getChats = async (req, res) => {
  try {
    const filter = (req.locals && req.locals.filter) || {};
    let chats = await Chat.find(filter).populate(["agent", "client", "messages"]).exec();
    const populatedChats = await Promise.all(
      chats.map(async (chat) => {
        const users = await populateUsers(chat.users);
        const messages = await populateMessages(chat.messages, req.user._id);
        return { ...chat.toObject(), users, messages };
      })
    );
    res.status(200).send(populatedChats);
  } catch (err) {
    res.status(400).send({ error: "An error occurred while retrieving chats.", details: err.message });
  }
};

// Asynchronous function to get chat with the specified id
const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id).populate(["agent", "client", "messages"]).exec();

    if (!chat) {
      return res.status(404).send({ error: "Chat not found." });
    }

    const users = await populateUsers(chat.users);
    const messages = await populateMessages(chat.messages, req.user._id);
    const populatedChat = { ...chat.toObject(), users, messages };
    res.status(200).send(populatedChat);
  } catch (err) {
    res.status(400).send({ error: "An error occurred while retrieving the chat.", details: err.message });
  }
};

// Asynchronous function to delete message with the specified id
const deleteChatById = async (req, res) => {
  try {
    const chatToDelete = await Chat.findById(req.params.id).populate(["agent", "client", "messages"]);

    if (!chatToDelete) {
      return res.status(404).send({ error: "Chat not found." });
    }

    await Chat.findByIdAndDelete(req.params.id);

    const users = await populateUsers(chatToDelete.users);
    const messages = await populateMessages(chatToDelete.messages, req.user._id);
    const finalChat = { ...chatToDelete.toObject(), users, messages };

    res.status(200).send(finalChat);
  } catch (err) {
    res.status(400).send({ error: "An error occurred while deleting the chat.", details: err.message });
  }
};

// Asynchronous function to add users to chat with the specified id
const addUsersToChat = async (req, res) => {
  try {
    const { users } = req.body;

    if (!Array.isArray(users) || !users.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).send({ error: "Invalid users array" });
    }

    // const user = await User.findById(`${users[0]}`)
    console.log(req.params.id, users[0])
    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { users: { $each: users } } },
      { new: true, runValidators: true }
    );

    const populatedChat = await Chat.populate(updatedChat, ["agent", "client", "messages"]);
    const populatedUsers = await populateUsers(populatedChat.users);
    const populatedMessages = await populateMessages(populatedChat.messages, req.user._id);
    const finalChat = { ...populatedChat.toObject(), users: populatedUsers, messages: populatedMessages };

    res.status(200).send(finalChat);
  } catch (err) {
    res.status(400).send({ error: "An error occurred while adding users to the chat.", details: err.message });
  }
};

// Asynchronous function to delete users from chat with the specified id
const deleteUsersFromChat = async (req, res) => {
  try {
    const { users } = req.body;

    if (!Array.isArray(users) || !users.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).send({ error: "Invalid users array" });
    }

    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { $pullAll: { users: users } },
      { new: true, runValidators: true }
    );

    const populatedChat = await Chat.populate(updatedChat, ["agent", "client", "messages"]);
    const populatedUsers = await populateUsers(populatedChat.users);
    const populatedMessages = await populateMessages(populatedChat.messages, req.user._id);
    const finalChat = { ...populatedChat.toObject(), users: populatedUsers, messages: populatedMessages };

    res.status(200).send(finalChat);
  } catch (err) {
    res.status(400).send({ error: "An error occurred while deleting users from the chat.", details: err.message });
  }
};

// Asynchronous function to add message to chat with the specified id
const addMessageToChat = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const sender = new mongoose.Types.ObjectId(`${req.user._id}`);
    const newMessage = await Message.create([{ ...req.body, sender }], { session });

    const chat = await Chat.findById(req.params.id).session(session);
    chat.messages.push(newMessage[0]._id);
    await chat.save({ session });

    await session.commitTransaction();

    const updatedChat = await Chat.findById(req.params.id).populate(["agent", "client", "messages"]).exec();
    updatedChat._newMessage = { ...newMessage[0].toObject(), sender: "You" };

    const users = await populateUsers(updatedChat.users);
    const messages = await populateMessages(updatedChat.messages, req.user._id);
    const populatedChat = { ...updatedChat.toJSON(), users, messages };

    res.status(200).send(populatedChat);
  } catch (err) {
    if (session) await session.abortTransaction();
    res.status(400).send({ error: "An error occurred while adding the message.", details: err.message });
  } finally {
    if (session) await session.endSession();
  }
};

// Asynchronous function to delete message from chat with the specified id
const deleteMessageFromChat = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const deletedMessage = await Message.findByIdAndDelete(req.params.messageId).session(session);

    if (!deletedMessage) {
      return res.status(404).send({ error: "Message not found." });
    }

    await Chat.updateOne({ _id: req.params.id }, { $pull: { messages: req.params.messageId } }, { session });
    await session.commitTransaction();

    const updatedChat = await Chat.findById(req.params.id).populate(["agent", "users", "messages"]).exec();
    updatedChat._deletedMessage = deletedMessage;

    const users = await populateUsers(updatedChat.users);
    const messages = await populateMessages(updatedChat.messages, req.user._id);
    const populatedChat = { ...updatedChat.toJSON(), users, messages };

    res.status(200).send(populatedChat);
  } catch (err) {
    if (session) await session.abortTransaction();
    res.status(400).send({ error: "An error occurred while deleting the message.", details: err.message });
  } finally {
    if (session) await session.endSession();
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
