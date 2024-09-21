import mongoose from "mongoose";

// Define asynchronous function to connect to MongoDB database
const connectDb = async (connectionString) => {
  try {
    // Connect to MongoDB using the provided connection string
    await mongoose.connect(connectionString);
    // Log a success message if the connection is established
    console.log("Connected to MongoDB (mongoose).");
  } catch (err) {
    // Log an error message if the connection fails
    console.error(err);
  }
};

export default connectDb;