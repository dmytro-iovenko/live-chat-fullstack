import React from "react";
import ChatItem from "../ChatItem/ChatItem";
import "./ChatList.css";
import { ChatPropsCommon } from "../../data/chats";

/**
 * ChatList component that displays a list of active chat items.
 * Renders a list of ChatItem components dynamically.
 * @param {ChatPropsCommon} props - The props containing chat data and selection functions.
 * @param {ChatProps[]} props.chats - Array of chat objects to display in the chat list.
 * @param {(chat: ChatProps) => void} props.onChatSelect - Function to set the selected chat when a user clicks on a chat.
 * @returns {JSX.Element} The ChatList component containing all active chat items.
 */
const ChatList: React.FC<ChatPropsCommon> = ({ chats, onChatSelect }: ChatPropsCommon): JSX.Element => {
  return (
    <div className="chat-container">
      {chats && chats.map((chat) => <ChatItem key={chat._id} {...chat} onChatSelect={onChatSelect} />)}
    </div>
  );
};

export default ChatList;
