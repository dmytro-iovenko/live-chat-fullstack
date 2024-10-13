import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import AuthForm from "../components/AuthForm/AuthForm";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (credentials: { email: string; password: string }) => {
    const { email, password } = credentials;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  return <AuthForm isLoginMode={true} onSubmit={handleAuth} error={error} toggleMode={() => navigate("/register")} />;
};

export default LoginPage;
