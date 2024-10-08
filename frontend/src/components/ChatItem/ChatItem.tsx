import React from "react";
import Avatar from "../Avatar/Avatar";
import "./ChatItem.css";

/**
 * Props for the ChatItem component.
 * Contains details about a chat participant and their last message.
 */
interface ChatItemProps {
  name: string; // Name of the chat participant
  message: string; // Last message in the chat
  time: string; // Time of the last message
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
const ChatItem: React.FC<ChatItemProps> = ({ name, message, time }: ChatItemProps): JSX.Element => {
  return (
    <div className="chat-item">
      <Avatar username={name} />
      <div className="chat-item-content">
        <p className="chat-item-title">{name}</p>
        <p className="chat-item-text">{message}</p>
      </div>
      <div className="chat-item-info">
        <span className="chat-item-time">{time}</span>
      </div>
    </div>
  );
};

export default ChatItem;
