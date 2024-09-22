import mongoose from "mongoose";

// Define Message schema
const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "The message text cannot be blank"],
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "The author_id is required"],
    },
    status: {
      type: String,
      enum: ["seen", "unseen", "delivered"],
      default: "unseen",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Create index on author_id for quick lookups
messageSchema.index({ author_id: 1 });
// Create index on status for filtering by status
messageSchema.index({ status: 1 });
// Create index on created_at for sorting by creation date
messageSchema.index({ created_at: -1 });

// Create and export a model for 'messages' collection using the schema
export default mongoose.model("Message", messageSchema);
