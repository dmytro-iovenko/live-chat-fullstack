import { useEffect, useRef, useState } from "react";
import MessagesPaneBody from "../MessagesPaneBody/MessagesPaneBody";
import MessagesPaneFooter from "../MessagesPaneFooter/MessagesPaneFooter";
import MessagesPaneHeader from "../MessagesPaneHeader/MessagesPaneHeader";
import MessageInput from "../MessageInput/MessageInput";
import MessageList from "../MessageList/MessageList";
import { MessageItemProps } from "../MessageItem/MessageItem";
import { ChatProps } from "../../data/chats";
// import messages from "../../data/messages";
import "./MessagesPane.css";

/**
 * Props for the MessagesPane component.
 * Contains the chat object that holds message data and sender information.
 * @interface MessagePaneProps
 */
interface MessagePaneProps {
  chat: ChatProps; // Chat object containing messages and sender details
  chats: ChatProps[]; // Array of all chat objects.
  onUpdateChats: (updatedChats: ChatProps[]) => void; // Function to update the chats array in the parent component.
}

/**
 * MessagesPane component that displays the chat interface for messaging.
 * Renders the header, body, and footer for the messages pane, facilitating message viewing and sending.
 * @param {MessagePaneProps} props - The props containing chat information.
 * @param {ChatProps} props.chat - The chat object containing messages and sender details.
 * @param {ChatProps[]} props.chats - Array of all chat objects.
 * @param {(updatedChats: ChatProps[]) => void} props.onUpdateChats - Function to update the chats array in the parent component.
 * @returns {JSX.Element} The MessagesPane component.
 */
const MessagesPane: React.FC<MessagePaneProps> = ({ chat, chats, onUpdateChats }: MessagePaneProps): JSX.Element => {
  const [chatMessages, setChatMessages] = useState(chat.messages);
  const [textAreaValue, setTextAreaValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Ensure that the displayed messages update to reflect the currently selected chat from the sidebar.
  useEffect(() => {
    setChatMessages(chat.messages);
  }, [chat.messages]);

  const handleSubmit = () => {
    const newId = (chatMessages.length + 1).toString();
    const newMessage: MessageItemProps = {
      id: newId,
      text: textAreaValue,
      sender: "You",
    };

    // Update the current messages array with the new message
    const updatedMessages = [...chatMessages, newMessage];
    setChatMessages(updatedMessages);

    // Update the specific chat object in the original chats array
    const updatedChats = chats.map((c) => (c.id === chat.id ? { ...c, messages: updatedMessages } : c));
    onUpdateChats(updatedChats);
  };

  return (
    <section id="main" className="container">
      <MessagesPaneHeader title={chat.sender.name} />
      <MessagesPaneBody>
        <MessageList messages={chatMessages} chatId={chat.id} />
      </MessagesPaneBody>
      <MessagesPaneFooter>
        <MessageInput textAreaValue={textAreaValue} setTextAreaValue={setTextAreaValue} onSubmit={handleSubmit} textAreaRef={textAreaRef}/>
      </MessagesPaneFooter>
    </section>
  );
};

export default MessagesPane;
