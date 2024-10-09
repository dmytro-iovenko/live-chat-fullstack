import ChatList from "../ChatList/ChatList";
import "./ChatsPane.css";

/**
 * ChatsPane component that represents the sidebar containing the chat list.
 * Renders a container for the ChatList component, allowing users to view their chats.
 * @returns {JSX.Element} The ChatsPane component.
 */
const ChatsPane: React.FC = (): JSX.Element => {
  return (
    <section id="sidebar" className="container">
      <ChatList />
    </section>
  );
};

export default ChatsPane;
