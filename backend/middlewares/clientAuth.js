import jwt from "jsonwebtoken";
import Client from "../models/client.js";
import "dotenv/config";

// Secret key for JWT
const JWT_SECRET = process.env.CLIENT_JWT_SECRET;

// Middleware to authenticate clients using Bearer token
const clientAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "Authorization token is required." });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;

    // Validate email
    if (!email || typeof email !== "string" || email.trim() === "") {
      return res.status(400).send({ error: "Email is required." });
    }

    // Find client by email and check if client exists
    const client = await Client.findOne({ email }).collation({ locale: "en", strength: 2 });
    if (!client) {
      return res.status(404).send({ error: "Client not found." });
    }

    // Attach client info to the request
    req.client = client;
    next();
  } catch (error) {
    console.error(err);
    res.status(401).send({ error: "Invalid token." });
  }
};

export default clientAuth;
