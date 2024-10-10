import React from "react";
import ChatItem from "../ChatItem/ChatItem";
import "./ChatList.css";
import { ChatPropsCommon } from "../../data/chats";

/**
 * ChatList component that displays a list of chat items.
 * Renders a list of ChatItem components dynamically.
 * @param {ChatPropsCommon} props - The props containing chat data and selection functions.
 * @param {ChatProps[]} props.chats - Array of chat objects to display in the chat list.
 * @param {(chat: ChatProps) => void} props.setSelectedChat - Function to set the selected chat when a user clicks on a chat.
 * @param {string} props.selectedChatId - ID of the currently selected chat, used for highlighting or tracking selection.
 * @returns {JSX.Element} The ChatList component containing all chat items.
 */
const ChatList: React.FC<ChatPropsCommon> = ({
  chats,
  setSelectedChat,
  selectedChatId,
}: ChatPropsCommon): JSX.Element => {
  //   const chats: Chats[] = [
  //     { id: 1, name: "Tina Cornell", message: "The test message", time: "15s" },
  //     { id: 2, name: "Collete Aicart", message: "Long messages should end with ellipses.", time: "35m" },
  //   ];

  return (
    <div className="container-body">
      <div className="tab">
        <input type="checkbox" id="cb1" defaultChecked />
        <div className="section-title">
          <label htmlFor="cb1" className="tab-label">
            My chats ({chats.length})
          </label>
        </div>
        <div className="tab-content">
          <div className="section-content">
            <div className="section-column">
              {chats.map((chat) => (
                <ChatItem key={chat.id} {...chat} setSelectedChat={setSelectedChat} selectedChatId={selectedChatId} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
