import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";

/**
 * Custom hook to access authentication context.
 * Retrieves the authentication context from AuthContext and ensures it is used within an AuthProvider.
 * Throws an error if the hook is used outside of the AuthProvider.
 * @returns {AuthContextType} The authentication context containing user and loading state.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  // Ensure the context is available, throwing an error if not
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
