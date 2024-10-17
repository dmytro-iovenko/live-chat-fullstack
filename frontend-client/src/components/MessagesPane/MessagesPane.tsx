import { useRef, useState } from "react";
import MessagesPaneBody from "../MessagesPaneBody/MessagesPaneBody";
import MessagesPaneFooter from "../MessagesPaneFooter/MessagesPaneFooter";
import MessageList from "../MessageList/MessageList";
import "./MessagesPane.css";
import messages from "../../data/messages";
import MessageInput from "../MessageInput/MessageInput";
import { MessageItemProps } from "../MessageItem/MessageItem";
import { v4 as uuid } from "uuid";

const MessagesPane = () => {
  const [chatMessages, setChatMessages] = useState(messages);
  const [textAreaValue, setTextAreaValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async () => {
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
  };

  return (
    <main>
      <section className="container">
        {/* <MessagesPaneHeader title={username} /> */}
        <MessagesPaneBody>
          <MessageList messages={chatMessages} />
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
    </main>
  );
};

export default MessagesPane;
