import { formatText } from "../../utils/helpers";
import Avatar from "../Avatar/Avatar";
import "./MessageItem.css";

/**
 * Props for the Message component.
 * Contains the details of an individual chat message.
 */
export interface MessageItemProps {
  _id: string; // Unique identifier for the message
  chatId?: string; // Optional identifier for the chat the message belongs to, used in Soket.io logic
  text?: string; // The text content of the message
  image?: {
    src: string; // URL for the message image
    alt?: string; // Alt text for the message image
  };
  sender: string; // The message sender
  status?: "delivered" | "seen"; // The message status, restricted to specific values
}

/**
 * MessageItem component that displays an individual chat message.
 * Renders the message content, sender's name, and avatar based on the message properties.
 * @param {MessageItemProps} props - The props object containing the message data.
 * @param {MessageItemProps} props.message - The message object containing details about the message.
 * @returns {JSX.Element} The MessageItem component.
 */
const MessageItem: React.FC<{ message: MessageItemProps }> = ({ message }): JSX.Element => {
  const isYou = message.sender === "You";

  return (
    <div className={`chat-message ${isYou ? "message-out" : "message-in"}`}>
      <div className="chat-message-title">
        {message.sender} | {message.status || "sending"}
      </div>
      <div className="chat-message-group">
        {!isYou && <Avatar username={message.sender}></Avatar>}
        <div className="chat-message-content">
          {message.image && (
            <div className="chat-message-image">
              <img src={message.image?.src} alt={message.image?.alt} />
            </div>
          )}
          {message.text && <div className="chat-message-text">{formatText(message.text)}</div>}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
