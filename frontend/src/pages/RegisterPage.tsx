import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import AuthForm from "../components/AuthForm/AuthForm";
import { UserProps } from "../data/users";
import { registerUser } from "../services/apiClient";
import { handleFirebaseError } from "../utils/helpers";

/**
 * RegisterPage component that handles user registration.
 * Manages form submission, error handling, and navigation after successful registration.
 * @param {RegisterPageProps} props - The props for the RegisterPage component.
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
      const firebaseUser = userCredential.user;
      // Update the displayName field
      await updateProfile(firebaseUser, {
        displayName: name,
      });
      // Prepare user data to send to the backend
      const userData: Omit<UserProps, "_id"> = {
        name,
        email: firebaseUser.email ?? "",
      };
      // Send the user data to the backend
      await registerUser(userData);
      navigate("/");
    } catch (error: unknown) {
      console.error("Error logging in:", error);
      // Handle specific Firebase error
      if (error instanceof FirebaseError) {
        handleFirebaseError(error as FirebaseError, setError, true);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return <AuthForm isLoginMode={false} onSubmit={handleAuth} error={error} toggleMode={() => navigate("/login")} />;
};

export default RegisterPage;
