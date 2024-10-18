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
    let chats = await Chat.find({ client: clientId, active: true }).populate(["client", "agent", "messages"]).exec();
    // Process each chat and populate users and messages senders
    const populatedChats = await Promise.all(
      chats.map(async (chat) => {
        // Manually populate the users array to get agent or client data
        const users = await Promise.all(
          chat.users.map(async (userId) => {
            const agent = await User.findById(userId);
            const client = await Client.findById(userId);
            return agent || client;
          })
        );
        // Manually populate the messages array to get sender data
        const messages = await Promise.all(
          chat.messages.map(async (message) => {
            if (message.sender instanceof mongoose.Types.ObjectId) {
              const agent = await User.findById(message.sender);
              const client = await Client.findById(message.sender);
              const sender = agent ?? client;
              if (sender) {
                const name = clientId && clientId.equals(sender._id) ? "You" : sender.name;
                return { ...message.toObject(), sender: name };
              }
            }
            return { ...message.toObject() };
          })
        );
        return { ...chat.toObject(), users, messages };
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
    const clientId = req.client._id;
    const user = new mongoose.Types.ObjectId(`${agentId}`);

    // Check if a chat already exists for this client and agent
    const existingChat = await Chat.findOne({ agent: user, client: clientId, active: true })
      .populate(["client", "agent", "messages"])
      .exec();

    if (existingChat) {
      // Manually populate the users array to get agent or client data
      const users = await Promise.all(
        existingChat.users.map(async (userId) => {
          const agent = await User.findById(userId);
          const client = await Client.findById(userId);
          return agent || client;
        })
      );
      // Manually populate the messages array to get sender data
      const messages = await Promise.all(
        existingChat.messages.map(async (message) => {
          if (message.sender instanceof mongoose.Types.ObjectId) {
            const agent = await User.findById(message.sender);
            const client = await Client.findById(message.sender);
            const sender = agent ?? client;
            if (sender) {
              const name = clientId && clientId.equals(sender._id) ? "You" : sender.name;
              return { ...message.toObject(), sender: name };
            }
          }
          return { ...message.toObject() };
        })
      );
      const populatedChat = { ...existingChat.toObject(), users, messages };
      return res.status(200).send(populatedChat);
    }

    // If no existing chat, create a new one
    const chatData = {
      agent: user,
      client: clientId,
      users: [user, clientId],
      active: true, // ignore any user-provided active values, default to true
    };
    const newChat = await Chat.create(chatData);
    // Manually populate the users array to get agent or client data
    const users = await Promise.all(
      newChat.users.map(async (userId) => {
        const agent = await User.findById(userId);
        const client = await Client.findById(userId);
        return agent || client;
      })
    );
    // Manually populate the messages array to get sender data
    const messages = await Promise.all(
      newChat.messages.map(async (message) => {
        if (message.sender instanceof mongoose.Types.ObjectId) {
          const agent = await User.findById(message.sender);
          const client = await Client.findById(message.sender);
          const sender = agent ?? client;
          if (sender) {
            const name = clientId && clientId.equals(sender._id) ? "You" : sender.name;
            return { ...message.toObject(), sender: name };
          }
        }
        return { ...message.toObject() };
      })
    );
    const populatedChat = { ...newChat.toObject(), users, messages };
    res.send(newChat).status(201);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to get chat with the specified id
const getChatById = async (req, res) => {
  try {
    // Check Client ID
    if (!req.client || !req.client._id) {
      return res.status(400).send({ error: "Client ID is required." });
    }
    const clientId = req.client._id;
    console.log("0:", clientId);
    const chat = await Chat.findById(req.params.id).populate(["agent", "client", "messages"]).exec();
    if (!chat) {
      return res.status(401).json({ message: "Chat not found." });
    }
    // Manually populate the users array to get agent or client data
    const users = await Promise.all(
      chat.users.map(async (user) => {
        const agent = await User.findById(user);
        const client = await Client.findById(user);
        return agent || client;
      })
    );
    // Manually populate the messages array to get sender data
    const messages = await Promise.all(
      chat.messages.map(async (message) => {
        if (message.sender instanceof mongoose.Types.ObjectId) {
          const agent = await User.findById(message.sender);
          const client = await Client.findById(message.sender);
          const sender = agent ?? client;
          if (sender) {
            const name = clientId && clientId.equals(sender._id) ? "You" : sender.name;
            return { ...message.toObject(), sender: name };
          }
        }
        return { ...message.toObject() };
      })
    );
    const populatedChat = { ...chat.toObject(), users, messages };
    res.send(populatedChat).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to add message to chat with the specified id
const addMessageToChat = async (req, res) => {
  if (!req.client || !req.client._id) return res.status(400).send({ error: "Client ID is required." });
  const clientId = req.client._id;
  let session;
  try {
    // Start session
    session = await mongoose.startSession();
    // Start transaction
    session.startTransaction();
    // Create new message
    const sender = new mongoose.Types.ObjectId(`${clientId}`);
    const newMessage = await Message.create([{ ...req.body, sender }], { session });
    // Find chat by ID
    const chat = await Chat.findById(req.params.id).session(session);
    // Add new message to messages array
    chat.messages.push(newMessage[0]._id);
    // Save updated chat
    await chat.save({ session });
    // Commit transaction
    await session.commitTransaction();
    // Populate updated chat
    const updatedChat = await Chat.findById(req.params.id).populate(["agent", "client", "messages"]).exec();
    // Ensure virtual property is set on the fetched document
    updatedChat._newMessage = newMessage[0];
    // Manually populate the users array to get agent or client data
    const users = await Promise.all(
      updatedChat.users.map(async (user) => {
        const agent = await User.findById(user);
        const client = await Client.findById(user);
        return agent || client;
      })
    );
    // Manually populate the messages array to get sender data
    const messages = await Promise.all(
      updatedChat.messages.map(async (message) => {
        if (message.sender instanceof mongoose.Types.ObjectId) {
          const agent = await User.findById(message.sender);
          const client = await Client.findById(message.sender);
          const sender = agent ?? client;
          if (sender) {
            const name = clientId && clientId.equals(sender._id) ? "You" : sender.name;
            return { ...message.toObject(), sender: name };
          }
        }
        return { ...message.toObject() };
      })
    );
    const populatedChat = { ...updatedChat.toJSON(), users, messages };
    // console.log(populatedChat)
    res.send(populatedChat).status(200);
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
