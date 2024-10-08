import React from "react";

/**
 * Props for the ChatTitle component.
 */
interface ChatTitleProps {
  title: string; // Title of the chat
}

/**
 * ChatTitle component that displays the title of the chat.
 * @param {ChatTitleProps} props - The properties object for the ChatTitle component.
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
