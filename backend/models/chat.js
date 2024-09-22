import mongoose from "mongoose";
import User from "./user.js";
import Message from "./message.js";

// Define Chat schema
const chatSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        validate: {
          validator: async (value) => {
            const user = await User.findById(value);
            return !!user; // Returns true if the user exists, false otherwise
          },
          message: "User does not exist",
        },
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        validate: {
          validator: async (value) => {
            const message = await Message.findById(value);
            return !!message;
          },
          message: "Message does not exist",
        },
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);


// Create compound index to query by both users and active status
chatSchema.index({ users: 1, active: 1 });

// Create and export a model for 'chats' collection using the schema
export default mongoose.model("Chat", chatSchema);
