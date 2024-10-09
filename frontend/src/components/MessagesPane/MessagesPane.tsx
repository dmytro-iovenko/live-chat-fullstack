import MessagesPaneBody from "../MessagesPaneBody/MessagesPaneBody";
import MessagesPaneFooter from "../MessagesPaneFooter/MessagesPaneFooter";
import MessagesPaneHeader from "../MessagesPaneHeader/MessagesPaneHeader";
import MessageInput from "../MessageInput/MessageInput";
import MessageList from "../MessageList/MessageList";
import "./MessagesPane.css";
import messages from "../../data/messages";

/**
 * MessagesPane component that displays the chat interface for messaging.
 * Renders the header, body, and footer for the messages pane, facilitating message viewing and sending.
 * @returns {JSX.Element} The MessagesPane component.
 */
const MessagesPane: React.FC = (): JSX.Element => {
  const title: string = "Tina Cornell";
  return (
    <section id="main" className="container">
      <MessagesPaneHeader title={title} />
      <MessagesPaneBody>
        <MessageList messages={messages} />
      </MessagesPaneBody>
      <MessagesPaneFooter>
        <MessageInput />
      </MessagesPaneFooter>
    </section>
  );
};

export default MessagesPane;
