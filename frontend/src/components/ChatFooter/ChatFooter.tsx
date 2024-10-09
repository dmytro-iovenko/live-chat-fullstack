import "./ChatFooter.css";

/**
 * ChatFooter component that serves as a wrapper for the chat footer.
 * @param {Object} props - The props object containing child components.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {JSX.Element} The ChatContainer component.
 */
const ChatFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="container-footer popup">{children}</div>;
};

export default ChatFooter;
