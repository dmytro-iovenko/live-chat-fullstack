import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./AuthForm.css";

/**
 * Props for the AuthForm component.
 * Handles user authentication input for both login and registration.
 */
interface AuthFormProps {
  isLoginMode: boolean; // Indicates if the form is in login mode or signup mode
  onSubmit: (credentials: { email: string; password: string; name?: string; confirmPassword?: string }) => void; // Function to handle form submission
  error: string | null; // Error message to display if any
  toggleMode: () => void; // Function to toggle between login and signup modes
}

/**
 * AuthForm component for user authentication.
 * Renders a form for either signing in or signing up based on the mode.
 * @param {AuthFormProps} props - Props containing mode, submission handler, error message, and mode toggle function.
 * @param {boolean} props.isLoginMode - Indicates if the form is in login mode (true) or signup mode (false).
 * @param {(credentials: { email: string; password: string; name?: string; confirmPassword?: string }) => void} props.onSubmit - Function to handle form submission with user credentials.
 * @param {string | null} props.error - Error message to display if there is any issue during authentication.
 * @returns The AuthForm component.
 */
const AuthForm: React.FC<AuthFormProps> = ({ isLoginMode, onSubmit, error }: AuthFormProps) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /**
   * Handles changes to the input fields.
   * Updates the credentials state with the new input value.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input field.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles form submission.
   * Prevents default form submission and calls the onSubmit function with current credentials.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  /**
   * Toggles visibility of the password field.
   * Switches between showing and hiding the password.
   */
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  /**
   * Toggles visibility of the confirm password field.
   * Switches between showing and hiding the confirm password.
   */
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{isLoginMode ? "Sign in" : "Sign up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={credentials.name || ""}
                onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
            <FontAwesomeIcon className="icon" icon={faLock} />
            <FontAwesomeIcon
              className="toggle-password"
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
            />
          </div>
          {!isLoginMode && (
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={credentials.confirmPassword}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon className="icon" icon={faCheck} />
              <FontAwesomeIcon
                className="toggle-password"
                icon={showConfirmPassword ? faEyeSlash : faEye}
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          )}
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
