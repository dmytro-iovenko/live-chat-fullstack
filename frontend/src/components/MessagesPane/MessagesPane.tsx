import { useState } from "react";
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
  chat: ChatProps; // Chat object containing messages and sender details
}

/**
 * MessagesPane component that displays the chat interface for messaging.
 * Renders the header, body, and footer for the messages pane, facilitating message viewing and sending.
 * @param {MessagePaneProps} props - The props containing chat information.
 * @param {ChatProps} props.chat - The chat object containing messages and sender details.
 * @returns {JSX.Element} The MessagesPane component.
 */
const MessagesPane: React.FC<MessagePaneProps> = ({ chat }: MessagePaneProps): JSX.Element => {
  const [chatMessages, setChatMessages] = useState(chat.messages);
  const [textAreaValue, setTextAreaValue] = useState("");

  return (
    <section id="main" className="container">
      <MessagesPaneHeader title={chat.sender.name} />
      <MessagesPaneBody>
        <MessageList messages={chatMessages} />
      </MessagesPaneBody>
      <MessagesPaneFooter>
        <MessageInput
          textAreaValue={textAreaValue}
          setTextAreaValue={setTextAreaValue}
          onSubmit={() => {
            const newId = chatMessages.length + 1;
            const newIdString = newId.toString();
            setChatMessages([
              ...chatMessages,
              {
                id: newIdString,
                text: textAreaValue,
                sender: "You",
              },
            ]);
          }}
        />
      </MessagesPaneFooter>
    </section>
  );
};

export default MessagesPane;
