import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./AuthForm.css";

interface AuthFormProps {
  isLoginMode: boolean;
  onSubmit: (credentials: { email: string; password: string; name?: string }) => void;
  error: string | null;
  toggleMode: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLoginMode, onSubmit, error }) => {
  const [credentials, setCredentials] = useState<{ email: string; password: string; name?: string }>({
    email: "",
    password: "",
    name: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{isLoginMode ? "Sign in" : "Sign up"}</h2>
        <form onSubmit={handleFormSubmit}>
          {!isLoginMode && (
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={credentials.name || ""}
                onChange={handleInputChange}
                required={!isLoginMode}
              />
              <FontAwesomeIcon className="icon" icon={faUser} />
            </div>
          )}
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
            <FontAwesomeIcon className="icon" icon={faEnvelope} />
          </div>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
            <FontAwesomeIcon className="icon" icon={faLock} />
            <FontAwesomeIcon
              className="toggle-password"
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
            />
          </div>
          <button type="submit">{isLoginMode ? "Sign in" : "Sign up"}</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {isLoginMode && (
          <div className="forgot-password">
            <button className="link">Forgot Password?</button>
          </div>
        )}
        <div className="switch-mode">
          {isLoginMode ? (
            <>
              Don't have an account? <Link to="/register">Sign up!</Link>
            </>
          ) : (
            <>
              Already have an account? <Link to="/login">Sign in!</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
