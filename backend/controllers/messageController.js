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

// Asynchronous function to update text of the message with the specified id
const updateMessageById = async (req, res) => {
  try {
    const query = {
      $set: { text: req.body.text || "" },
    };
    const options = {
      new: true, // return the modified document rather than the original
      runValidators: true, // trigger schema validation
    };
    const updatedMessage = await Message.findByIdAndUpdate(req.params.id, query, options);
    res.send(updatedMessage).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to delete message with the specified id
const deleteMessageById = async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    res.send(deletedMessage).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to get message with the specified id
const getMessageStatusById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    // Handle case where message is not found
    if (!message) {
      return res.send({ error: "Message not found" }).status(404);
    }
    const status = message.status;
    res.send({ status }).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

export default { createMessage, getMessages, getMessageById, updateMessageById, deleteMessageById, getMessageStatusById };
