import { ChatProps } from "../../data/chats";
import "./MessagesPaneHeader.css";

/**
 * Props for the MessagePaneHeader component.
 * Contains the title of the chat.
 */
interface MessagesPaneHeaderProps {
  selectedChat: ChatProps | null;
  agentId: string | null;
  onLogout: () => void;
  onBackButtonClick: () => void;
}

/**
 * MessagesPaneHeader component that displays the title of the chat.
 * @param {MessagesPaneHeaderProps} props - The properties object for the ChatTitle component.
 * @param {string} props.title - The title of the chat.
 * @returns {JSX.Element} The MessagesPaneHeader component.
 */
const MessagesPaneHeader: React.FC<MessagesPaneHeaderProps> = ({
  selectedChat,
  agentId,
  onLogout,
  onBackButtonClick,
}: MessagesPaneHeaderProps): JSX.Element => {
  const title = selectedChat && agentId ? selectedChat.sender.name : "Welcome to Live Chat";

  return (
    <div className="container-title">
      {(selectedChat || agentId) && (
        <div className="btn" onClick={onBackButtonClick}>
          <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowBackIcon">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"></path>
          </svg>
        </div>
      )}
      <div className="chat-title">{title}</div>
      <div className="menu-container">
        <input id="menu-toggle" type="checkbox" />
        <label className="btn menu-btn" htmlFor="menu-toggle">
          <span>&nbsp;</span>
          <div className="overlay"></div>
        </label>
        <ul className="menu-box">
          <li>
            <button className="menu-item" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MessagesPaneHeader;
