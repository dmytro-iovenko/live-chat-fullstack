import "./ChatContainer.css";

/**
 * ChatContainer component that serves as a wrapper for the chat interface.
 * @param {Object} props - The props object containing child components.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {JSX.Element} The ChatContainer component.
 */
const ChatContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="container-body">
      <div className="chat-container">{children}</div>
    </div>
  );
};

export default ChatContainer;
