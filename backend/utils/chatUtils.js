import mongoose from "mongoose";
import User from "../models/user.js";
import Client from "../models/client.js";
import Chat from "../models/chat.js";
import Message from "../models/message.js";

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

export const populateChatData = async (chat, userId) => {
  const users = await populateUsers(chat.users);
  const messages = await populateMessages(chat.messages, userId);
  return { users, messages };
};

export const addMessage = async (chatId, messageData, senderId) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const sender = new mongoose.Types.ObjectId(`${senderId}`);
    const newMessage = await Message.create([{ ...messageData, sender }], { session });

    const chat = await Chat.findById(chatId).session(session);
    chat.messages.push(newMessage[0]._id);
    await chat.save({ session });

    await session.commitTransaction();
    return newMessage[0];
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) await session.endSession();
  }
};

export const deleteMessage = async (chatId, messageId) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const deletedMessage = await Message.findByIdAndDelete(messageId).session(session);
    if (!deletedMessage) {
      throw new Error("Message not found.");
    }

    await Chat.updateOne({ _id: chatId }, { $pull: { messages: messageId } }, { session });
    await session.commitTransaction();
    return deletedMessage;
  } catch (err) {
    if (session) await session.abortTransaction();
    throw err;
  } finally {
    if (session) await session.endSession();
  }
};
