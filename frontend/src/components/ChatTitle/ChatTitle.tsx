import React from "react";
import "./ChatTitle.css";

/**
 * Props for the ChatTitle component.
 * Contains the title of the chat.
 */
interface ChatTitleProps {
  title: string; // The title of the chat to display
}

/**
 * ChatTitle component that displays the title of the chat.
 * @param {ChatTitleProps} props - The properties object for the ChatTitle component.
 * @param {string} props.title - The title of the chat.
 * @returns {JSX.Element} The ChatTitle component.
 */
const ChatTitle: React.FC<ChatTitleProps> = ({ title }: ChatTitleProps): JSX.Element => {
  return (
    <div id="chat-title" className="container-title">
      {title}
    </div>
  );
};

export default ChatTitle;
