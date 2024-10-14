import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import { MessageItemProps } from "../components/MessageItem/MessageItem";
import { ChatProps } from "../data/chats";
import { UserProps } from "../data/users";

// Create an instance of axios with default configurations for API requests
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_LIVECHAT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include JWT token in headers
apiClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Function to get all chats for the specified user, filtered if necessary.
 * @param userId - The ID of the user for whom to fetch chats.
 * @returns A promise that resolves to an array of ChatProps.
 */
export const getUserChats = async (userId: string | null): Promise<ChatProps[]> => {
  const response = await apiClient.get(`/chats?userId=${userId}`);
  return response.data;
};

/**
 * Function to add a new message to the chat with the specified ID.
 * @param chatId - The ID of the chat to which the message will be added.
 * @param message - The message object to be added.
 * @param userId - The ID of the user sending the message.
 * @returns The response from the server containing the added message.
 */
export const addMessageToChat = async (
  chatId: string,
  message: Omit<MessageItemProps, "_id" | "status" | "sender">,
  userId: string
) => {
  const data = { ...message, sender: userId };
  const response = await apiClient.post(`/chats/${chatId}/messages?userId=${userId}`, data);
  return response.data;
};

/**
 * Function to register a new user in the backend.
 * @param userData - The user data to be sent to the backend.
 * @returns The response from the server after creating the user.
 */
export const registerUser = async (userData: Omit<UserProps, "_id">) => {
  const response = await apiClient.post("/users", userData);
  return response.data;
};

/**
 * Function to get user data by email from the backend.
 * @param email - The email of the user to be fetched.
 * @returns The user data object containing ID, email, and name.
 */
export const getUserByEmail = async (email: string): Promise<UserProps> => {
  const response = await apiClient.get(`/users?email=${email}`);
  return response.data.length > 0 ? response.data[0] : null;
};

export default apiClient;
