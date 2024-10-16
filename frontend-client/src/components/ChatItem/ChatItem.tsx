import React from "react";
import Avatar from "../Avatar/Avatar";
import "./ChatItem.css";
import { ChatProps } from "../../data/chats";
import { MessageItemProps } from "../MessageItem/MessageItem";
import { UserProps } from "../../data/users";

/**
 * Props for the ChatItem component.
 * This interface defines the structure of the properties needed to render a chat item.
 */
interface ChatItemProps {
  _id: string; // Unique identifier for the chat item
  sender: UserProps; // The user who sent the messages in the chat
  messages: MessageItemProps[]; // Array of messages exchanged in the chat
  selectedChatId?: string; // ID of the currently selected chat for highlighting (optional)
  setSelectedChat: (chat: ChatProps) => void; // Function to update the selected chat when a chat item is clicked
}

/**
 * ChatItem component that displays a single chat item.
 * Renders the user's avatar, name, last message, and time of the last message.
 * @param {ChatItemProps} props - The properties object for the ChatItem component.
 * @param {string} props.name - The name of the chat participant.
 * @param {string} props.message - The last message in the chat.
 * @param {string} props.time - The time of the last message.
 * @returns {JSX.Element} The ChatItem component displaying chat information.
 */
const ChatItem: React.FC<ChatItemProps> = (props: ChatItemProps): JSX.Element => {
  const { _id, sender, messages, selectedChatId, setSelectedChat } = props;
  const selected = selectedChatId === _id ? " selected" : "";
  const lastMessage = messages[messages.length - 1]?.text || "";
  return (
    <div
      className={"chat-item".concat(selected)}
      onClick={() => {
        setSelectedChat({ _id, sender, messages });
      }}>
      <Avatar username={sender.name} />
      <div className="chat-item-content">
        <p className="chat-item-title">{sender.name}</p>
        <p className="chat-item-text">{lastMessage}</p>
      </div>
      <div className="chat-item-info">
        <span className="chat-item-time">5mins</span>
      </div>
    </div>
  );
};

export default ChatItem;
