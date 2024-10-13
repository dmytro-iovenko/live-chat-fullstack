import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import AuthForm from "../components/AuthForm/AuthForm";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (credentials: { email: string; password: string; name?: string }) => {
    const { email, password, name } = credentials;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Error registering:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return <AuthForm isLoginMode={false} onSubmit={handleAuth} error={error} toggleMode={() => navigate("/login")} />;
};

export default RegisterPage;
