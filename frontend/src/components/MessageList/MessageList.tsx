import { useEffect, useRef } from "react";
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
  const contentRef = useRef<HTMLDivElement>(null);

  // A function to scroll content down
  const scrollDown = (content: HTMLDivElement) => {
    if (content.scrollHeight > content.clientHeight) {
      content.scrollTop = content.scrollHeight;
    }
  };

  // Run effect when messages change
  useEffect(() => {
    // Use timer to allow DOM updates to complete
    const timeoutId = setTimeout(() => {
      if (contentRef.current) {
        scrollDown(contentRef.current);
      }
    }, 0);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [messages]);

  return (
    <div ref={contentRef} id="chat-messages" className="chat-messages">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
