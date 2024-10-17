import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Chat from "../models/chat.js";
import Message from "../models/message.js";
import User from "../models/user.js";
import Client from "../models/client.js";
import "dotenv/config";

// Secret key for JWT
const JWT_SECRET = process.env.CLIENT_JWT_SECRET;

// Asynchronous function to authenticate client and return JWT token
const getToken = async (req, res) => {
  console.log("POST /token", req.body);
  const { name, email } = req.body;
  console.log("getToken", name, email);

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  try {
    // Check if client exists
    let client = await Client.findOne({ email }).collation({ locale: "en", strength: 2 });

    // If client does not exist, create a new one
    if (!client) {
      client = new Client({ name, email });
      await client.save();
    }

    console.log("client", client);

    // Generate JWT token (1 hour expiry)
    const token = jwt.sign({ name: client.name, email: client.email }, JWT_SECRET, { expiresIn: "1h" });
    console.log("token", token);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Asynchronous function to get all agents
const getAgents = async (req, res) => {
  try {
    // Find users based on the filter
    const users = await User.find();
    res.send(users).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to get all chats
const getChats = async (req, res) => {
  try {
    if (!req.client || !req.client._id) {
      res.send([]).status(200);
    }
    const clientId = new mongoose.Types.ObjectId(`${req.client._id}`);
    let chats = await Chat.find({ client: clientId, active: true })
      .populate(["client", "sender", "users", "messages"])
      .exec();
    // Process each chat and populate sender for messages
    const populatedChats = await Promise.all(
      chats.map(async (chat) => {
        const messages = await Promise.all(
          chat.messages.map(async (message) => {
            if (message.sender instanceof mongoose.Types.ObjectId) {
              const user = await User.findById(message.sender);
              const client = await Client.findById(message.sender);
              const sender = user ?? client;
              if (sender) {
                const name = clientId && clientId.equals(sender._id) ? "You" : sender.name;
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

// Asynchronous function to create a new chat
const createChat = async (req, res) => {
  try {
    const { agentId } = req.body;
    // Validate User ID
    if (!mongoose.Types.ObjectId.isValid(agentId)) {
      return res.send({ error: "Invalid Agent ID" }).status(400);
    }
    // Check Client ID
    if (!req.client || !req.client._id) {
      return res.status(400).send({ error: "Client ID is required." });
    }
    const client = req.client._id;
    const user = new mongoose.Types.ObjectId(`${agentId}`);

    // Check if a chat already exists for this client and agent
    const existingChat = await Chat.findOne({ sender: user, client: client, active: true })
      .populate(["client", "sender", "users", "messages"])
      .exec();

    if (existingChat) {
      // Process each chat and populate sender for messages
      const messages = await Promise.all(
        existingChat.messages.map(async (message) => {
          if (message.sender instanceof mongoose.Types.ObjectId) {
            const sender = await User.findById(message.sender);
            if (sender) {
              const name = client && client.equals(sender._id) ? "You" : sender.name;
              return { ...message.toObject(), sender: name };
            }
          }
          return { ...message.toObject() };
        })
      );
      const populatedChat = { ...existingChat.toObject(), messages };
      return res.status(200).send(populatedChat);
    }

    // If no existing chat, create a new one
    const chatData = {
      sender: user,
      client: client,
      users: [user],
      active: true, // ignore any user-provided active values, default to true
    };
    const newChat = await Chat.create(chatData);
    res.send(newChat).status(201);
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

// Asynchronous function to add message to chat with the specified id
const addMessageToChat = async (req, res) => {
  if (!req.client || !req.client._id) return res.status(400).send({ error: "Client ID is required." });
  let session;
  try {
    // Start session
    session = await mongoose.startSession();
    // Start transaction
    session.startTransaction();
    // Create new message
    const sender = new mongoose.Types.ObjectId(`${req.client._id}`);
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

export default {
  getToken,
  getAgents,
  createChat,
  getChats,
  getChatById,
  addMessageToChat,
};
