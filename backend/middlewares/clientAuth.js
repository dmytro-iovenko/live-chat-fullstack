import jwt from "jsonwebtoken";
import Client from "../models/client.js";
import "dotenv/config";

// Secret key for JWT
const JWT_SECRET = process.env.CLIENT_JWT_SECRET;

// Middleware to authenticate clients using Bearer token
const clientAuth = async (req, res, next) => {
  console.log("clientAuth!!!");

  // Get the Authorization header
  const authHeader = req.headers.authorization;
  console.log("authHeader", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing or invalid." });
  }

  // Extract the token
  const token = authHeader.split(" ")[1];
  console.log("token", token);

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("decoded", decoded);

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
    res.status(500).json({ message: "Internal server error." });
  }
};

export default clientAuth;
