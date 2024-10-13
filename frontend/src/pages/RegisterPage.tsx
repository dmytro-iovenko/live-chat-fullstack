import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import AuthForm from "../components/AuthForm/AuthForm";
import { UserProps } from "../data/users";
import { registerUser } from "../services/apiClient";

/**
 * Props for the RegisterPage component.
 * Contains the function to set user data in the parent component.
 */
interface RegisterPageProps {
  setUserData: (data: UserProps | null) => void; // Function to update user data
}
/**
 * RegisterPage component that handles user registration.
 * Manages form submission, error handling, and navigation after successful registration.
 * @param {RegisterPageProps} props - The props for the RegisterPage component.
 * @returns The RegisterPage component.
 */
const RegisterPage: React.FC<RegisterPageProps> = ({ setUserData }: RegisterPageProps) => {
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

      // Prepare user data to send to the backend
      const userData: Omit<UserProps, "id"> = {
        name,
        email: firebaseUser.email || "",
      };

      // Send the user data to the backend
      const user = await registerUser(userData);
      // Save new user data to state variable
      setUserData(user);
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
      case "auth/credential-already-in-use":
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
