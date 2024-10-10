import { useEffect, useRef } from "react";
import MessageItem, { MessageItemProps } from "../MessageItem/MessageItem";
import "./MessageList.css";

/**
 * Props for the ChatMessageList component.
 * Contains the messages to be displayed and the ID of the current chat.
 */
interface MessageListProps {
  messages: MessageItemProps[]; // Array of message objects
  chatId: string; // Unique identifier for the current chat, used to trigger re-rendering
}

/**
 * MessageList component that renders a list of chat messages.
 * Automatically scrolls to the latest message when messages change or the chat is switched.
 * @param {MessageListProps} props - The props object containing the messages.
 * @param {MessageItemProps[]} props.messages - An array of message objects to render.
 * @param {string} props.chatId - The ID of the current chat, used to determine when to scroll.
 * @returns {JSX.Element} The MessageList component.
 */
const MessageList: React.FC<MessageListProps> = ({ messages, chatId }: MessageListProps): JSX.Element => {
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
  }, [messages, chatId]);

  return (
    <div ref={contentRef} id="chat-messages" className="chat-messages">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
