import MessagesPaneBody from "../MessagesPaneBody/MessagesPaneBody";
import MessagesPaneFooter from "../MessagesPaneFooter/MessagesPaneFooter";
import MessagesPaneHeader from "../MessagesPaneHeader/MessagesPaneHeader";
import MessageInput from "../MessageInput/MessageInput";
import MessageList from "../MessageList/MessageList";
import "./MessagesPane.css";
import { ChatProps } from "../../data/chats";
// import messages from "../../data/messages";

/**
 * Props for the MessagesPane component.
 * Contains the chat object that holds message data and sender information.
 * @interface MessagePaneProps
 */
interface MessagePaneProps {
  chat: ChatProps;
}

/**
 * MessagesPane component that displays the chat interface for messaging.
 * Renders the header, body, and footer for the messages pane, facilitating message viewing and sending.
 * @param {MessagePaneProps} props - The props containing chat information.
 * @returns {JSX.Element} The MessagesPane component.
 */
const MessagesPane: React.FC<MessagePaneProps> = ({ chat }: MessagePaneProps): JSX.Element => {
  console.log(chat);
  return (
    <section id="main" className="container">
      <MessagesPaneHeader title={chat.sender.name} />
      <MessagesPaneBody>
        <MessageList messages={chat.messages} />
      </MessagesPaneBody>
      <MessagesPaneFooter>
        <MessageInput />
      </MessagesPaneFooter>
    </section>
  );
};

export default MessagesPane;
