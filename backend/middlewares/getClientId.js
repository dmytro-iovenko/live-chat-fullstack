import jwt from "jsonwebtoken";
import Client from "../models/client.js";
import "dotenv/config";

// Secret key for JWT
const JWT_SECRET = process.env.CLIENT_JWT_SECRET;

// Middleware to authenticate clients using Bearer token
const getClientId = async (req, res, next) => {
  // Get the Authorization header, if any
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next();
  }

  // Extract the token
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the client by email
    const client = await Client.findOne({ email: decoded.email });

    if (!client) {
      return res.status(401).json({ message: "Client not found." });
    }

    // Attach client info to the request
    req.client = client;
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error });
  }
};

export default getClientId;
