import { FirebaseError } from "firebase/app";

type ErrorCodes =
  | "auth/user-not-found"
  | "auth/wrong-password"
  | "auth/invalid-email"
  | "auth/invalid-credential"
  | "auth/email-already-in-use"
  | "auth/credential-already-in-use"
  | "auth/weak-password";

interface ErrorMessageMap {
  [key: string]: string;
}

const errorMessages: Record<"login" | "registration", ErrorMessageMap> = {
  login: {
    "auth/user-not-found": "No user found with this email address.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-email": "The email address is not valid. Please check and try again.",
    "auth/invalid-credential": "The credentials provided are invalid. Please check and try again.",
    default: "Login failed. Please try again.",
  },
  registration: {
    "auth/email-already-in-use": "This email is already registered. Please use a different email.",
    "auth/credential-already-in-use": "This email is already registered. Please use a different email.",
    "auth/invalid-email": "The email address is not valid.",
    "auth/weak-password": "The password is too weak. Please use a stronger password.",
    default: "Registration failed. Please try again.",
  },
};

/**
 * Helper function to handle Firebase authentication errors.
 * Sets the error state with a user-friendly message based on the error code.
 * @param {FirebaseError} error - The error object returned from Firebase.
 * @param {React.Dispatch<React.SetStateAction<string>>} setError - Function to update the error state.
 * @param {boolean} isRegistration - Indicates if the context is registration (true) or login (false).
 */
export const handleFirebaseError = (
  error: FirebaseError,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  isRegistration: boolean
) => {
  const context = isRegistration ? "registration" : "login";
  const message = errorMessages[context][error.code as ErrorCodes] || errorMessages[context].default;
  setError(message);
};

/**
 * Helper function to format the input text by splitting it into lines
 * and converting new line characters into <br> elements.
 *
 * @param {string} [input] - The text to format, optional.
 * @returns {JSX.Element[]} An array of JSX elements representing the formatted text.
 *                          Returns an empty array if no input is provided.
 */
export const formatText = (input?: string): JSX.Element[] => {
  if (!input) return [];
  return input.split(/\r?\n/).map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
};
