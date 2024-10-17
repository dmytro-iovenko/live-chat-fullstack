import express from "express";
import connectDb from "./db/conn.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import cors from "cors";
import admin from "firebase-admin";
import "dotenv/config";

// Define connection string
const connectionString = process.env.ATLAS_URI;
// Define port number
const port = process.env.PORT || 3000;

// Create express instance
const app = express();

// Setup a cors middleware for our express app
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Process custom routes
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);
app.use("/chats", chatRoutes);
app.use("/client", clientRoutes);

// Error-handling Middleware
app.use((err, req, res, _next) => {
  const time = new Date();
  const status = err.status || 500;
  res.status(status);
  res.json({
    status: status,
    error: err.message,
    timestamp: time,
    path: req.url,
  });
  console.error("------");
  console.error(`${time.toLocaleString()}: ${err.stack}`);
});

// Parse the service account key
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

// Initialize the Firebase Admin SDK
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

// Start express server
app.listen(port, () => {
  console.log("Server is running on port:", port);
  // Connect to MongoDb using connection string
  connectDb(connectionString);
});
