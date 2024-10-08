import React from "react";
import ChatItem from "../ChatItem/ChatItem";
import "./ChatList.css";

/**
 * Chats interface representing the structure of a chat item.
 */
interface Chats {
  id: number; // Unique identifier for the chat item
  name: string; // Name of the chat participant
  message: string; // Last message in the chat
  time: string; // Time of the last message
}

/**
 * ChatList component that displays a list of chat items.
 * Renders a list of ChatItem components dynamically.
 * @returns {JSX.Element} The ChatList component containing all chat items.
 */
const ChatList: React.FC = (): JSX.Element => {
  const chats: Chats[] = [
    { id: 1, name: "Tina Cornell", message: "The test message", time: "15s" },
    { id: 2, name: "Collete Aicart", message: "Long messages should end with ellipses.", time: "35m" },
  ];

  return (
    <div className="container-body">
      <div className="tab">
        <input type="checkbox" id="cb1" />
        <div className="section-title">
          <label htmlFor="cb1" className="tab-label">
            My chats ({chats.length})
          </label>
        </div>
        <div className="tab-content">
          <div className="section-content">
            <div className="section-column">
              {chats.map((chat) => (
                <ChatItem key={chat.id} name={chat.name} message={chat.message} time={chat.time} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
