import mongoose from "mongoose";

// Define a schema for 'users' collection
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true } // assign createdAt and updatedAt fields
);

// Create an index on the 'email' field to enforce uniqueness
userSchema.index({ email: 1 });

// Create and export a model for 'users' collection using the schema
export default mongoose.model("users", userSchema);
