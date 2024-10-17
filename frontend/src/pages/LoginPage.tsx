import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import AuthForm from "../components/AuthForm/AuthForm";
import { getUserByEmail } from "../services/apiClient";
import { handleFirebaseError } from "../utils/helpers";

/**
 * LoginPage component that handles user login.
 * Manages form submission, error handling, and navigation after successful login.
 * @returns The LoginPage component.
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  /**
   * Function to handle user authentication during login.
   * Attempts to log in the user with provided credentials.
   * @param {Object} credentials - User credentials containing email and password.
   * @param {string} credentials.email - User's email address.
   * @param {string} credentials.password - User's password.
   * @returns {Promise<void>} Returns a promise indicating the completion of the login process.
   */
  const handleAuth = async (credentials: { email: string; password: string }): Promise<void> => {
    const { email, password } = credentials;

    try {
      // Attempt to sign in the user with Firebase using provided credentials
      await signInWithEmailAndPassword(auth, email, password);
      // Get user data from the backend
      const user = await getUserByEmail(email);
      // Check if the user was not found in the database
      if (!user) {
        // Logout from Firebase
        await signOut(auth);
        setError("User authenticated, but not found in the database. Please contact the administrator for assistance.");
        return;
      }
      navigate("/");
    } catch (error: unknown) {
      console.error("Error logging in:", error);
      // Handle specific Firebase error
      if (error instanceof FirebaseError) {
        handleFirebaseError(error as FirebaseError, setError, false);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return <AuthForm isLoginMode={true} onSubmit={handleAuth} error={error} toggleMode={() => navigate("/register")} />;
};

export default LoginPage;
