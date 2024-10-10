import ChatList from "../ChatList/ChatList";
import "./ChatsPane.css";
import { ChatPropsCommon } from "../../data/chats";

/**
 * ChatsPane component that represents the sidebar containing the chat list.
 * Renders a container for the ChatList component, allowing users to view their chats.
 * @param {ChatPropsCommon} props - The props containing chat data and selection functions.
 * @returns {JSX.Element} The ChatsPane component.
 */
const ChatsPane: React.FC<ChatPropsCommon> = (props: ChatPropsCommon): JSX.Element => {
  return (
    <section id="sidebar" className="container">
      <ChatList {...props} />
    </section>
  );
};

export default ChatsPane;
