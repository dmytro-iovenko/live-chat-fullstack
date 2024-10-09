import Avatar from "../Avatar/Avatar";
import "./ChatMessage.css";

/**
 * Props for the Message component.
 * Contains the details of an individual chat message.
 */
export interface ChatMessageProps {
  id: number; // Unique identifier for the message
  title: string; // The title or username of the message sender
  text?: string; // The text content of the message
  image?: {
    src: string; // URL for the message image
    alt?: string; // Alt text for the message image
  };
  is_outgoing: boolean; // Indicates if the message is outgoing
}

/**
 * ChatMessage component that displays an individual chat message.
 * Renders the message content, sender's name, and avatar based on the message properties.
 * @param {ChatMessageProps} props - The props object containing the message data.
 * @param {ChatMessageProps} props.message - The message object containing details about the message.
 * @returns {JSX.Element} The Message component.
 */
const ChatMessage: React.FC<{ message: ChatMessageProps }> = ({ message }): JSX.Element => {
  return (
    <div className={`chat-message ${message.is_outgoing ? "message-out" : "message-in"}`}>
      <div className="chat-message-title">{message.title}</div>
      <div className="chat-message-group">
        <Avatar username={message.title}></Avatar>
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

export default ChatMessage;
