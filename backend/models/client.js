import mongoose from "mongoose";

// Define Client schema
const ClientSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Create and export a model for 'clients' collection using the schema
export default mongoose.model("Client", ClientSchema);
