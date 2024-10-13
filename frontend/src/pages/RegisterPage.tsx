import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import AuthForm from "../components/AuthForm/AuthForm";
import { UserProps } from "../data/users";
import { registerUser } from "../services/apiClient";

/**
 * RegisterPage component that handles user registration.
 * Manages form submission, error handling, and navigation after successful registration.
 * @returns The RegisterPage component.
 */
const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  /**
   * Function to handle user authentication during registration.
   * Validates input, registers the user with Firebase, and sends user data to backend.
   * @param {Object} credentials - User credentials containing email, password, name, and confirmPassword.
   * @param {string} credentials.email - User's email address.
   * @param {string} credentials.password - User's chosen password.
   * @param {string} [credentials.name] - User's name for registration.
   * @param {string} [credentials.confirmPassword] - Confirmation of the chosen password.
   * @returns {Promise<void>} Returns a promise indicating the completion of the registration process.
   */
  const handleAuth = async (credentials: {
    email: string;
    password: string;
    name?: string;
    confirmPassword?: string;
  }): Promise<void> => {
    const { email, password, name, confirmPassword } = credentials;

    if (!name) {
      setError("The name cannot be blank.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Register the user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Prepare user data to send to the backend
      const userData: Omit<UserProps, "id"> = {
        name,
        email: user.email || "",
      };

      // Send the user data to the backend
      await registerUser(userData);
      navigate("/");
    } catch (error) {
      console.error("Error registering:", error);
      // Handle specific Firebase errors
      handleFirebaseError(error);
    }
  };

  /**
   * Function to handle Firebase registration errors.
   * Sets appropriate error messages based on Firebase error codes.
   * @param {any} error - The error object received from Firebase.
   */
  const handleFirebaseError = (error: any) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        setError("This email is already registered. Please use a different email.");
        break;
      case "auth/invalid-email":
        setError("The email address is not valid.");
        break;
      case "auth/weak-password":
        setError("The password is too weak. Please use a stronger password.");
        break;
      default:
        setError("Registration failed. Please try again.");
        break;
    }
  };

  return <AuthForm isLoginMode={false} onSubmit={handleAuth} error={error} toggleMode={() => navigate("/login")} />;
};

export default RegisterPage;
