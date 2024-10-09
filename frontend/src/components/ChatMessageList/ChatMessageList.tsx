import ChatMessage, { ChatMessageProps } from "../ChatMessage/ChatMessage";
import "./ChatMessageList.css";

/**
 * Props for the ChatMessageList component.
 * Represents an array of chat messages to be rendered.
 */
interface ChatMessageListProps {
  messages: ChatMessageProps[]; // Array of message objects
}

/**
 * ChatMessageList component that renders a list of chat messages.
 * Dynamically creates Message components based on the provided messages array.
 * @param {MessageListProps} props - The props object containing the messages.
 * @param {ChatMessageProps[]} props.messages - An array of message objects to render.
 * @returns {JSX.Element} The MessageList component.
 */
const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages }: ChatMessageListProps): JSX.Element => {
  return (
    <div id="chat-messages" className="chat-messages">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ChatMessageList;
