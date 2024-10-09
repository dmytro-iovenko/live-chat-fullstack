import MessageItem, { MessageItemProps } from "../MessageItem/MessageItem";
import "./MessageList.css";

/**
 * Props for the ChatMessageList component.
 * Represents an array of chat messages to be rendered.
 */
interface MessageListProps {
  messages: MessageItemProps[]; // Array of message objects
}

/**
 * MessageList component that renders a list of chat messages.
 * Dynamically creates Message components based on the provided messages array.
 * @param {MessageListProps} props - The props object containing the messages.
 * @param {MessageItemProps[]} props.messages - An array of message objects to render.
 * @returns {JSX.Element} The MessageList component.
 */
const MessageList: React.FC<MessageListProps> = ({ messages }: MessageListProps): JSX.Element => {
  console.log(messages)
  return (
    <div id="chat-messages" className="chat-messages">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
