import React from "react";
import Avatar from "../Avatar/Avatar";
import "./AgentItem.css";
import { UserProps } from "../../data/users";

/**
 * Props for the ChatItem component.
 * This interface defines the structure of the properties needed to render a chat item.
 */
interface AgentItemProps {
  agent: UserProps; // The agent
  onClick: () => void; // Add onClick prop type
}

/**
 * ChatItem component that displays a single chat item.
 * Renders the user's avatar, name, last message, and time of the last message.
 * @param {ChatItemProps} props - The properties object for the ChatItem component.
 * @param {string} props.name - The name of the chat participant.
 * @param {string} props.message - The last message in the chat.
 * @param {string} props.time - The time of the last message.
 * @returns {JSX.Element} The ChatItem component displaying chat information.
 */
const AgentItem: React.FC<AgentItemProps> = ({ agent, onClick }: AgentItemProps): JSX.Element => {
  return (
    <div>
      {/* <!-- Start Chat Form --> */}
      <div className="chat-item">
        <div className="chat-item-container">
          <div className="chat-item-wrapper">
            <div className="chat-item-status"></div>
            <Avatar username={agent.name} />
          </div>
          <div className="chat-item-content">
            <div className="chat-item-title">{agent.name}</div>
            <div className="chat-item-text">{agent.email}</div>
          </div>
        </div>
        <button onClick={onClick}>Chat now</button>
      </div>
    </div>
  );
};

export default AgentItem;
