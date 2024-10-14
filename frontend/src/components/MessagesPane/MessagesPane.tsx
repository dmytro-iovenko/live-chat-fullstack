import { useEffect, useRef, useState } from "react";
import MessagesPaneBody from "../MessagesPaneBody/MessagesPaneBody";
import MessagesPaneFooter from "../MessagesPaneFooter/MessagesPaneFooter";
import MessagesPaneHeader from "../MessagesPaneHeader/MessagesPaneHeader";
import MessageInput from "../MessageInput/MessageInput";
import MessageList from "../MessageList/MessageList";
import { MessageItemProps } from "../MessageItem/MessageItem";
import { ChatProps } from "../../data/chats";
import { UserProps } from "../../data/users";
import { v4 as uuid } from "uuid";
import { addMessageToChat } from "../../services/apiClient";
import "./MessagesPane.css";

/**
 * Props for the MessagesPane component.
 * Contains the chat object that holds message data and sender information.
 * @interface MessagePaneProps
 */
interface MessagePaneProps {
  chat: ChatProps | null; // Chat object containing messages and sender details
  onUpdateChats: (updatedChat: ChatProps | null) => void; // Function to update the chats array in the parent component.
  userData: UserProps | null; // Current user data object for identifying the sender
}

/**
 * MessagesPane component that displays the chat interface for messaging.
 * Renders the header, body, and footer for the messages pane, facilitating message viewing and sending.
 * @param {MessagePaneProps} props - The props containing chat information.
 * @param {ChatProps} props.chat - The chat object containing messages and sender details.
 * @param {(updatedChat: ChatProps) => void} props.onUpdateChats - Function to update the chats array in the parent component.
 * @param {UserProps | null} props.userData - Current user data object for identifying the sender.
 * @returns {JSX.Element} The MessagesPane component.
 */
const MessagesPane: React.FC<MessagePaneProps> = ({ chat, onUpdateChats, userData }: MessagePaneProps): JSX.Element => {
  const [chatMessages, setChatMessages] = useState(chat?.messages);
  const [textAreaValue, setTextAreaValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Ensure that the displayed messages update to reflect the currently selected chat from the sidebar.
  useEffect(() => {
    setChatMessages(chat?.messages);
  }, [chat?.messages]);

  const handleSubmit = async () => {
    if (!chat || !chatMessages || !userData || !userData._id) return;
    const tempId = uuid();
    const newMessage: Omit<MessageItemProps, "_id" | "status" | "sender"> = {
      text: textAreaValue,
    };

    // Update the current messages array with the new message
    const updatedMessages = [
      ...chatMessages,
      { ...newMessage, sender: "You", _id: tempId }, // Use temporary ID for local display
    ];
    setChatMessages(updatedMessages);

    try {
      // Add a new message to the chat with the specified ID and store added message
      const message = await addMessageToChat(chat._id, newMessage, userData._id);
      console.log(message);

      // Update the message locally to use the MongoDB _id and status
      const updatedChatMessages = updatedMessages.map((msg) =>
        msg._id === tempId ? { ...msg, _id: message._id, status: message.status } : msg
      );
      console.log(updatedChatMessages);
      setChatMessages(updatedChatMessages);

      // Update the specific chat object in the original chats array
      const updatedChat = { ...chat, messages: updatedChatMessages };
      console.log(updatedChat);
      onUpdateChats(updatedChat);
    } catch (error) {
      console.error("Error updating chats:", error);
    }

    // Update the specific chat object in the original chats array
    const updatedChat = { ...chat, messages: updatedMessages };
    onUpdateChats(updatedChat);
  };

  return (
    <section id="main" className="container">
      <MessagesPaneHeader title={chat?.sender.name} />
      <MessagesPaneBody>
        <MessageList messages={chatMessages} chatId={chat?._id} />
      </MessagesPaneBody>
      <MessagesPaneFooter>
        <MessageInput
          textAreaValue={textAreaValue}
          setTextAreaValue={setTextAreaValue}
          onSubmit={handleSubmit}
          textAreaRef={textAreaRef}
        />
      </MessagesPaneFooter>
    </section>
  );
};

export default MessagesPane;
