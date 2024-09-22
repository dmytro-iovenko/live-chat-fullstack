import Message from "../models/message.js";

// Asynchronous function to create a new message
const createMessage = async (req, res) => {
  try {
    const data = {
      ...req.body,
      status: undefined, // ignore any user-provided status values
    };
    const newMessage = await Message.create(data);
    res.send(newMessage).status(201);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to get all messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.send(messages).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to get message with the specified id
const getMessageById = async (req, res) => {
    try {
      const message = await Message.findById(req.params.id);
      res.send(message).status(200);
    } catch (err) {
      res.send(err).status(400);
    }
  };
  
export default { createMessage, getMessages, getMessageById };
