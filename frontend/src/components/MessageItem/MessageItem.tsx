import { UserProps } from "../../data/users";
import Avatar from "../Avatar/Avatar";
import "./MessageItem.css";

/**
 * Props for the Message component.
 * Contains the details of an individual chat message.
 */
export interface MessageItemProps {
  id: string; // Unique identifier for the message
  text?: string; // The text content of the message
  image?: {
    src: string; // URL for the message image
    alt?: string; // Alt text for the message image
  };
  sender: UserProps; // The message sender
}

/**
 * MessageItem component that displays an individual chat message.
 * Renders the message content, sender's name, and avatar based on the message properties.
 * @param {MessageItemProps} props - The props object containing the message data.
 * @param {MessageItemProps} props.message - The message object containing details about the message.
 * @returns {JSX.Element} The MessageItem component.
 */
const MessageItem: React.FC<{ message: MessageItemProps }> = ({ message }): JSX.Element => {
  console.log(message)
  const is_outgoing = message.sender.id === "10"
  return (
    <div className={`chat-message ${is_outgoing ? "message-out" : "message-in"}`}>
      <div className="chat-message-title">{message.sender.name}</div>
      <div className="chat-message-group">
        <Avatar username={message.sender.name}></Avatar>
        <div className="chat-message-content">
          {message.image && (
            <div className="chat-message-image">
              <img src={message.image?.src} alt={message.image?.alt} />
            </div>
          )}
          {message.text && <div className="chat-message-text">{message.text}</div>}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
