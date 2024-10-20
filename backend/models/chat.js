import mongoose from "mongoose";
import User from "./user.js";
import Message from "./message.js";
import Client from "./client.js";

// Define Chat schema
const chatSchema = new mongoose.Schema(
  {
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: async (value) => {
          const agent = await User.findById(value);
          return !!agent;
        },
        message: "Agent ID does not exist",
      },
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
      validate: {
        validator: async (value) => {
          const client = await Client.findById(value);
          return !!client;
        },
        message: "Client ID does not exist",
      },
    },
    users: [
      {
        type: mongoose.Schema.Types.Mixed, // Allows for both User and Client
        validate: {
          validator: async (value) => {
            if (value instanceof mongoose.Types.ObjectId) {
              // Check if it's a valid User
              const user = await User.findById(value);
              if (user) return true; // Returns true if the user exists

              // Check if it's a valid Client
              const client = await Client.findById(value);
              return !!client; // Returns true if the client exists
            }
            return false; // If it's neither, return false
          },
          message: "Invalid user: Must be a valid User ID or Client ID",
        },
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        // validate: {
        //   validator: async function (value) {
        //     console.log("this", this);
        //     console.log(`this.$session() value: ${this.$session()}`);
        //     const message = await Message.findById(value);
        //     return !!message;
        //   },
        //   message: "Message does not exist",
        // },
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // const { _newMessage, _deletedMessage, ...rest } = ret;
        // return {
        //   _id: doc._id,
        //   newMessage: _newMessage,
        //   deletedMessage: _deletedMessage,
        //   ...rest,
        // };
        const newMessage = ret._newMessage;
        const deletedMessage = ret._deletedMessage;
        delete ret._newMessage;
        delete ret._deletedMessage;
        delete ret.id;
        const reordered = {
          _id: doc._id,
          newMessage,
          deletedMessage,
          ...ret,
        };
        return reordered;
      },
    },
  }
);

// Define a virtual property for newMessage and deletedMessage
chatSchema.virtual("newMessage").get(function () {
  // console.log("newMessage", this._newMessage);
  return this._newMessage;
});
chatSchema.virtual("deletedMessage").get(function () {
  // console.log("deletedMessage", this._deletedMessage);
  return this._deletedMessage;
});

// Create compound index to query by both users and active status
// chatSchema.index({ users: 1, active: 1 });

// Pre-save hook for validation
chatSchema.pre("save", async function (next) {
  try {
    for (const [index, messageId] of this.messages.entries()) {
      const message = await Message.findById(messageId).session(this.$session());
      if (!message) {
        const error = new Error("Message does not exist");
        error.value = messageId;
        error.path = `messages.${index}`;
        throw error;
      }
    }
    next();
  } catch (error) {
    next({
      errors: {
        [error.path]: {
          name: "ValidatorError",
          message: [error.message],
          properties: {
            message: [error.message],
            type: "user defined",
            path: [error.path],
            value: [error.value],
          },
          kind: "user defined",
          path: [error.path],
          value: [error.value],
        },
      },
      _message: "Chat validation failed",
      name: "ValidationError",
      message: `Chat validation failed: ${error.path}: ${error.message}`,
    });
  }
});

// Create and export a model for 'chats' collection using the schema
export default mongoose.model("Chat", chatSchema);
