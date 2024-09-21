import mongoose from "mongoose";

// Define a schema for 'users' collection
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Create and export a model for 'users' collection using the schema
export default mongoose.model("users", userSchema);
