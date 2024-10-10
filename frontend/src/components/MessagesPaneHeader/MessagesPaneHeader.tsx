import React from "react";
import "./MessagesPaneHeader.css";

/**
 * Props for the MessagePaneHeader component.
 * Contains the title of the chat.
 */
interface MessagesPaneHeaderProps {
  title: string; // The title of the chat to display
}

/**
 * MessagesPaneHeader component that displays the title of the chat.
 * @param {MessagesPaneHeaderProps} props - The properties object for the ChatTitle component.
 * @param {string} props.title - The title of the chat.
 * @returns {JSX.Element} The MessagesPaneHeader component.
 */
const MessagesPaneHeader: React.FC<MessagesPaneHeaderProps> = ({ title }: MessagesPaneHeaderProps): JSX.Element => {
  return (
    <div id="chat-title" className="container-title">
      {title}
    </div>
  );
};

export default MessagesPaneHeader;
