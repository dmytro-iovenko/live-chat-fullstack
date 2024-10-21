import mongoose from "mongoose";
import Chat from "../models/chat.js";
import { populateUsers, populateChatData, deleteMessage, addMessage } from "../utils/chatUtils.js";

// Asynchronous function to create a new chat
const createChat = async (req, res) => {
  try {
    const { clientId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      return res.status(400).send({ error: "Invalid Client ID" });
    }
    const agent = req.user._id;
    const client = new mongoose.Types.ObjectId(`${clientId}`);
    const data = {
      agent,
      client,
      users: [agent, client],
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
        const populatedChatData = await populateChatData(chat, req.user._id);
        return { ...chat.toObject(), ...populatedChatData };
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

    const populatedChatData = await populateChatData(chat, req.user._id);
    const populatedChat = { ...chat.toObject(), ...populatedChatData };
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

    const populatedChatData = await populateChatData(chatToDelete, req.user._id);
    const finalChat = { ...chatToDelete.toObject(), ...populatedChatData };

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

    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { users: { $each: users.map((userId) => new mongoose.Types.ObjectId(`${userId}`)) } } },
      { new: true, runValidators: true }
    );

    const populatedChat = await Chat.populate(updatedChat, ["agent", "client", "messages"]);
    const populatedChatData = await populateChatData(populatedChat, req.user._id);
    const finalChat = { ...populatedChat.toObject(), ...populatedChatData };

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
      { $pullAll: { users: users.map((userId) => new mongoose.Types.ObjectId(`${userId}`)) } },
      { new: true, runValidators: true }
    );

    const populatedChat = await Chat.populate(updatedChat, ["agent", "client", "messages"]);
    const populatedChatData = await populateChatData(populatedChat, req.user._id);
    const finalChat = { ...populatedChat.toObject(), ...populatedChatData };

    res.status(200).send(finalChat);
  } catch (err) {
    res.status(400).send({ error: "An error occurred while deleting users from the chat.", details: err.message });
  }
};

// Asynchronous function to add message to chat with the specified id
const addMessageToChat = async (req, res) => {
  try {
    const newMessage = await addMessage(req.params.id, req.body, req.user._id);
    const updatedChat = await Chat.findById(req.params.id).populate(["agent", "client", "messages"]).exec();
    updatedChat._newMessage = { ...newMessage.toObject(), sender: "You" };

    const populatedChatData = await populateChatData(updatedChat, req.user._id);
    const populatedChat = { ...updatedChat.toJSON(), ...populatedChatData };

    res.status(200).send(populatedChat);
  } catch (err) {
    res.status(400).send({ error: "An error occurred while adding the message.", details: err.message });
  }
};

// Asynchronous function to delete message from chat with the specified id
const deleteMessageFromChat = async (req, res) => {
  try {
    const deletedMessage = await deleteMessage(req.params.id, req.params.messageId);
    const updatedChat = await Chat.findById(req.params.id).populate(["agent", "users", "messages"]).exec();
    updatedChat._deletedMessage = deletedMessage;

    const populatedChatData = await populateChatData(updatedChat, req.user._id);
    const populatedChat = { ...updatedChat.toJSON(), ...populatedChatData };

    res.status(200).send(populatedChat);
  } catch (err) {
    res.status(400).send({ error: "An error occurred while deleting the message.", details: err.message });
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
