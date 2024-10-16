import { MessageItemProps } from "../components/MessageItem/MessageItem";
import { UserProps } from "./users";

/**
 * Shared props for components that handle chat lists and selection.
 * This interface encapsulates the necessary properties for managing chat display and selection.
 */
export interface ChatPropsCommon {
  chats: ChatProps[]; // Array of chat objects to display
  setSelectedChat: (chat: ChatProps) => void; // Function to set the selected chat
  selectedChatId?: string; // ID of the currently selected chat
}

/**
 * Represents a chat object within the application.
 * Contains details about the chat, including its ID, sender, and messages exchanged.
 */
export interface ChatProps {
  _id: string; // Unique identifier for the chat
  sender: UserProps; // The user who initiated the chat
  messages: MessageItemProps[]; // Array of messages exchanged in the chat
}
