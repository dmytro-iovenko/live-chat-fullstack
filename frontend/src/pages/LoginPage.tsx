import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import AuthForm from "../components/AuthForm/AuthForm";
import { getUserByEmail } from "../services/apiClient";
import { UserProps } from "../data/users";

/**
 * Props for the LoginPage component.
 * Contains the function to set user data in the parent component.
 */
interface LoginPageProps {
  setUserData: (data: UserProps | null) => void; // Function to update user data
}

/**
 * LoginPage component that handles user login.
 * Manages form submission, error handling, and navigation after successful login.
 * @param {LoginPageProps} props - The props for the LoginPage component.
 * @returns The LoginPage component.
 */
const LoginPage: React.FC<LoginPageProps> = ({ setUserData }: LoginPageProps) => {
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
      // Save user data
      setUserData(user);
      console.log(user);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle specific Firebase error
      handleFirebaseError(error);
    }
  };

  /**
   * Helper function to handle Firebase authentication errors.
   * Sets the error state with a user-friendly message based on the error code.
   * @param {any} error - The error object returned from Firebase.
   */
  const handleFirebaseError = (error: any) => {
    switch (error.code) {
      case "auth/user-not-found":
        setError("No user found with this email address.");
        break;
      case "auth/wrong-password":
        setError("Incorrect password. Please try again.");
        break;
      case "auth/invalid-email":
        setError("The email address is not valid. Please check and try again.");
        break;
      case "auth/invalid-credential":
        setError("The credentials provided are invalid. Please check and try again.");
        break;
      default:
        setError("Login failed. Please try again.");
        break;
    }
  };

  return <AuthForm isLoginMode={true} onSubmit={handleAuth} error={error} toggleMode={() => navigate("/register")} />;
};

export default LoginPage;
