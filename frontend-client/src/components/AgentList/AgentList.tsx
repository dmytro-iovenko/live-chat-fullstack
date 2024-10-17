import React from "react";
import "./AgentList.css";
import { UserProps } from "../../data/users";
import AgentItem from "../AgentItem/AgentItem";

export interface AgentListProps {
  agents: UserProps[]; // Array of chat objects to display
  onAgentSelect: (agentId: string) => void; // Function for selecting an agent
}

/**
 * ChatList component that displays a list of active agents.
 * Renders a list of AgentItem components dynamically.
 * @param {AgentListProps} props - The props containing agent data and selection functions.
 * @param {ChatProps[]} props.chats - Array of chat objects to display in the chat list.
 * @param {(chat: ChatProps) => void} props.setSelectedChat - Function to set the selected chat when a user clicks on a chat.
 * @returns {JSX.Element} The ChatList component containing all chat items.
 */
const AgentList: React.FC<AgentListProps> = ({ agents, onAgentSelect }: AgentListProps): JSX.Element => {
  return (
    <div className="chat-container">
      <div>
        <h4>Active agents ({agents.length})</h4>
      </div>
      {/* {agents && (
        <div className="tab">
          <input type="checkbox" id="cb1" defaultChecked />
          <div className="section-title">
            <label htmlFor="cb1" className="tab-label">
              Active agents ({agents.length})
            </label>
          </div>
          <div className="tab-content">
            <div className="section-content">
              <div className="section-column">
                {agents.map((agent) => (
                  <AgentItem key={agent._id} agent={agent} setSelectedChat={setSelectedChat} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )} */}
      {agents &&
        agents.map((agent) => <AgentItem key={agent._id} agent={agent} onClick={() => onAgentSelect(agent._id)} />)}
    </div>
  );
};

export default AgentList;
