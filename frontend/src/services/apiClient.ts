import axios from "axios";
import { MessageItemProps } from "../components/MessageItem/MessageItem";
import { ChatProps } from "../data/chats";
import { UserProps } from "../data/users";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_LIVECHAT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Function to get all chats, filtered if necessary.
 * @returns A promise that resolves to an array of ChatProps.
 */
export const getChats = async (): Promise<ChatProps[]> => {
  const response = await apiClient.get("/chats");
  return response.data;
};

/**
 * Function to add a new message to the chat with the specified ID.
 * @param chatId - The ID of the chat to which the message will be added.
 * @param message - The message object to be added.
 * @returns The response from the server containing the added message.
 */
export const addMessageToChat = async (chatId: string, message: Omit<MessageItemProps, "_id" | "status">) => {
  const response = await apiClient.post(`/chats/${chatId}/messages`, message);
  return response.data;
};

/**
 * Function to register a new user in the backend.
 * @param userData - The user data to be sent to the backend.
 * @returns The response from the server after creating the user.
 */
export const registerUser = async (userData: Omit<UserProps, "id">) => {
  const response = await apiClient.post("/users", userData);
  return response.data;
};

export default apiClient;
