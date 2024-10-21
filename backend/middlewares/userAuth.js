import admin from "firebase-admin";
import User from "../models/user.js";

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "Authorization token is required." });
    }

    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;

    // Validate email
    if (!email || typeof email !== "string" || email.trim() === "") {
      return res.status(400).send({ error: "Email is required." });
    }

    // Find user by email
    const user = await User.findOne({ email }).collation({ locale: "en", strength: 2 });

    // Check if user exists
    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }

    // Attach user info to the request
    req.user = user;

    // Set filter for users
    req.locals = {
      ...(req.locals || {}),
      filter: { users: user._id },
    };

    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({ error: "Invalid token." });
  }
};

export default userAuth;
