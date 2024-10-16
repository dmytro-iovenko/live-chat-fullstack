import { useEffect, useRef, useState } from "react";
import "./App.css";
import { getActiveChats, getAgents } from "./services/apiClient";
import { UserProps } from "./data/users";
import { ChatProps } from "./data/chats";
import ChatList from "./components/ChatList/ChatList";
import AgentList from "./components/AgentList/AgentList";
import MessagesPaneHeader from "./components/MessagesPaneHeader/MessagesPaneHeader";
import MessagesPaneBody from "./components/MessagesPaneBody/MessagesPaneBody";
import MessageList from "./components/MessageList/MessageList";
import MessagesPaneFooter from "./components/MessagesPaneFooter/MessagesPaneFooter";
import MessageInput from "./components/MessageInput/MessageInput";
// import messages from "./data/messages";
import FormContainer from "./components/FormContainer/FormContainer";
import { MessageItemProps } from "./components/MessageItem/MessageItem";
import { v4 as uuid } from "uuid";

function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token") || null);
  const [agentList, setAgentList] = useState<UserProps[]>([]);
  const [chatList, setChatList] = useState<ChatProps[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatProps | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const [messages, setMessages] = useState<MessageItemProps[]>([]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Initial request to backend to collect client's chats
  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("token");
    (async () => {
      try {
        const agents = await getAgents();
        isMounted && setAgentList(agents);
        if (token) {
          const chats = await getActiveChats();
          isMounted && setChatList(chats);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
        setToken(null);
        localStorage.removeItem("token");
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Effect to update localStorage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Effect to update chat messages when chat changes
  useEffect(() => {
    if (selectedChat) {
      const chatMessages = selectedChat.messages;
      setMessages(chatMessages);
    }
  }, [selectedChat]);

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgentId(agentId);
  };

  const handleTokenUpdate = (newToken: string) => {
    setToken(newToken);
  };

  const handleChatUpdate = (newChat: ChatProps) => {
    setSelectedChat(newChat);
  };

  const handleSubmit = async () => {
    const tempId = uuid();
    const newMessage: Omit<MessageItemProps, "_id" | "status" | "sender"> = {
      text: textAreaValue,
    };

    // Update the current messages array with the new message
    const updatedMessages = [
      ...messages,
      { ...newMessage, sender: "You", _id: tempId }, // Use temporary ID for local display
    ];
    setMessages(updatedMessages);
  };

  const handleLogout = async () => {
    setToken(null);
  };

  console.log(selectedChat)
  return (
    <main>
      <section className="container">
        <MessagesPaneHeader title={token ? "Chat" : "Select an Agent"} onLogout={handleLogout} />
        <MessagesPaneBody>
          {!selectedChat && !selectedAgentId && (
            <>
              {/* {chatList.length > 0 && <ChatList chats={chatList} onChatSelect={handleChatSelect} />} */}
              {agentList.length > 0 && <AgentList agents={agentList} onAgentSelect={handleAgentSelect} />}
            </>
          )}
          {!selectedChat && selectedAgentId && (
            <FormContainer
              agentId={selectedAgentId}
              onTokenUpdate={handleTokenUpdate}
              onChatUpdate={handleChatUpdate}
            />
          )}
          {selectedChat && <MessageList messages={selectedChat.messages} />}
        </MessagesPaneBody>
        <MessagesPaneFooter>
          {selectedChat && (
            <MessageInput
              textAreaValue={textAreaValue}
              setTextAreaValue={setTextAreaValue}
              onSubmit={handleSubmit}
              textAreaRef={textAreaRef}
            />
          )}
        </MessagesPaneFooter>
      </section>
    </main>
  );
}

export default App;

{
  /* <div className="container-body">
          <div className="chat-container">
            <template id="start-chat-template">
              <div className="form-container">
                <div>
                  <form id="start-chat">
                    <button type="submit">Chat now</button>
                  </form>
                </div>
              </div>
            </template>

            <template id="registration-template">
              <div className="form-container">
                <div>
                  <p>Please fill in the form below before starting the chat.</p>
                  <form id="registration">
                    <label htmlFor="name">Name:</label>
                    <input name="name" type="text" required />
                    <label htmlFor="email">E-mail:</label>
                    <input name="email" type="email" pattern="^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required />
                    <button type="submit">Start the chat</button>
                  </form>
                </div>
              </div>
            </template>
          </div>
          <div id="error-display"></div>
        </div> */
}
