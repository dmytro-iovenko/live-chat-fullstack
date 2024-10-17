import mongoose from "mongoose";
import User from "./user.js";
import Client from "./client.js";

// Define Message schema
const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      // required: [true, "The message text cannot be blank"],
      required: false,
    },
    image: {
      type: {
        type: String,
        required: false,
      },
      src: {
        type: String,
        required: function () {
          return this.image && this.image.src !== undefined;
        },
        validate: {
          validator: function (value) {
            return value !== undefined && value.length > 0;
          },
          message: "Image source is required",
        },
      },
      alt: {
        type: String,
        required: false,
      },
    },
    sender: {
      type: mongoose.Schema.Types.Mixed, // Allows for both ObjectId and string
      required: [true, "The sender is required"],
      validate: {
        validator: async (value) => {
          if (typeof value === "string") {
            return value === "You"; // Allow the string "You"
          } else if (value instanceof mongoose.Types.ObjectId) {
            // Check if it's a valid User
            const user = await User.findById(value);
            if (user) return true; // Returns true if the user exists

            // Check if it's a valid Client
            const client = await Client.findById(value);
            return !!client; // Returns true if the client exists
          }
          return false; // If it's neither, return false
        },
        message: "Invalid sender: Must be a valid User ID or the string 'You'",
      },
    },
    status: {
      type: String,
      required: [true, "The status cannot be blank"],
      enum: ["delivered", "seen"],
      default: "delivered",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Create index on author_id for quick lookups
// messageSchema.index({ author_id: 1 });
// Create index on status for filtering by status
// messageSchema.index({ status: 1 });
// Create index on created_at for sorting by creation date
// messageSchema.index({ created_at: -1 });

// Create and export a model for 'messages' collection using the schema
export default mongoose.model("Message", messageSchema);
