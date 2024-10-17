import axios from "axios";
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
    const token = localStorage.getItem("token");
    if (token) {
      console.log("apiClient.interceptors", token);

      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Function to get a JWT token from the server.
 * @param {string} name - The name of the client.
 * @param {string} email - The email of the client.
 * @returns {Promise<string>} - The JWT token.
 */
export const getToken = async (name: string, email: string): Promise<string> => {
  const response = await apiClient.post("/token", { name, email });
  return response.data.token;
};

/**
 * Function to get all available agents.
 * @returns A promise that resolves to an array of UserProps.
 */
export const getAgents = async (): Promise<UserProps[]> => {
  const response = await apiClient.get("/agents");
  return response.data;
};

/**
 * Function to get all active chats for the specified client.
 * @returns A promise that resolves to an array of ChatProps.
 */
export const getActiveChats = async (): Promise<ChatProps[]> => {
  const response = await apiClient.get("/chats");
  return response.data;
};

/**
 * Function to create a chat with the specified agent ID.
 * @param {string} agentId - The ID of the agent.
 * @returns {Promise<ChatProps>} - The created chat object.
 */
export const createChat = async (agentId: string): Promise<ChatProps> => {
  const response = await apiClient.post("/chats", { agentId });
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
  message: Omit<MessageItemProps, "_id" | "status" | "sender">
) => {
  const data = { ...message };
  const response = await apiClient.post(`/chats/${chatId}/messages`, data);
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
