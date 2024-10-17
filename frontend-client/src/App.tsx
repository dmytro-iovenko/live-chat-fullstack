import { useEffect, useRef, useState } from "react";
import "./App.css";
import { addMessageToChat, getActiveChats, getAgents, getChatById, getToken } from "./services/apiClient";
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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [messages, setMessages] = useState<MessageItemProps[]>([]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Initial request to backend to collect chat data, if any
  useEffect(() => {
    let isMounted = true;
    const storedChatId = localStorage.getItem("selectedChatId");
    const storedAgentId = localStorage.getItem("selectedAgentId");
    const storedClientName = localStorage.getItem("selectedClientName");
    const storedClientEmail = localStorage.getItem("selectedClientEmail");

    console.log("storedChatId", storedChatId);
    console.log("storedAgentId", storedAgentId);
    console.log("storedClientName", storedClientName);
    console.log("storedClientEmail", storedClientEmail);

    (async () => {
      if (storedAgentId) {
        setSelectedAgentId(storedAgentId);
      }
      // try {
      // if (storedClientName && storedClientEmail) {
      //   const token = await getToken(storedClientName, storedClientEmail);
      //   if (isMounted) {
      //     setToken(token);
      //     localStorage.setItem("token", token);
      //     console.log("Token saved:", token);
      //   }
      // }
      // } catch (error) {
      //   console.error("Error fetching token:", error);
      // }
      try {
        const token = localStorage.getItem("token");
        console.log("TOKEN!", token);
        if (token && storedChatId) {
          const chat = await getChatById(storedChatId);
          console.log("CHAT!", chat);
          if (isMounted && chat) {
            setSelectedChat(chat);
            setMessages(chat.messages);
            setSelectedAgentId(chat.sender._id);
          }
        }
        if (!storedAgentId && !storedChatId) {
          const agents = await getAgents();
          isMounted && setAgentList(agents);
        }
      } catch (error) {
        console.error("Error fetching agents:", error);
        isMounted && setToken(null);
        isMounted && localStorage.removeItem("token");
      } finally {
        isMounted && setIsLoaded(true);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (selectedAgentId) {
      localStorage.setItem("selectedAgentId", selectedAgentId);
    } else {
      (async () => {
        try {
          const agents = await getAgents();
          isMounted && setAgentList(agents);
        } catch (error) {
          console.error("Error fetching agents:", error);
          isMounted && setToken(null);
          isMounted && localStorage.removeItem("token");
        } finally {
          isMounted && setIsLoaded(true);
        }
      })();
    }
    if (selectedChat) {
      localStorage.setItem("selectedChatId", selectedChat._id);
      setMessages(selectedChat.messages);
    } else {
      (async () => {
        try {
          if (token) {
            const chats = await getActiveChats();
            isMounted && setChatList(chats);
          }
        } catch (error) {
          console.error("Error fetching chats:", error);
          if (isMounted) {
            setToken(null);
            localStorage.removeItem("token");
          }
        }
      })();
      return () => {
        isMounted = false;
      };
    }
  }, [selectedChat, selectedAgentId]);

  // Effect to update localStorage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Effect to update chat messages when chat changes
  // useEffect(() => {
  //   if (selectedChat) {
  //     const chatMessages = selectedChat.messages;
  //     setMessages(chatMessages);
  //   }
  // }, [selectedChat]);

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
    console.log("handleSubmit");
    const chat = selectedChat;
    if (!chat) return;
    const tempId = uuid();
    const newMessage: Omit<MessageItemProps, "_id" | "status" | "sender"> = {
      text: textAreaValue,
    };
    console.log("newMessage", newMessage);

    // Update the current messages array with the new message
    const updatedMessages = [
      ...messages,
      { ...newMessage, sender: "You", _id: tempId }, // Use temporary ID for local display
    ];
    console.log("updatedMessages", updatedMessages);
    setMessages(updatedMessages);

    try {
      // Add a new message to the chat with the specified ID and store added message
      const messages = await addMessageToChat(chat._id, newMessage);
      console.log(messages);

      // Update the message locally to use the MongoDB _id and status
      const updatedChatMessages = updatedMessages.map((msg) =>
        msg._id === tempId ? { ...msg, _id: messages.newMessage._id, status: messages.newMessage.status } : msg
      );
      console.log(updatedChatMessages);
      setMessages(updatedChatMessages);

      // Update the specific chat object in the original chats array
      const updatedChat = { ...chat, messages: updatedChatMessages };
      console.log(updatedChat);
      setSelectedChat(updatedChat);
    } catch (error) {
      console.error("Error updating chats:", error);
    }
  };

  const handleLogout = async () => {
    setToken(null);
  };

  const handleBackButtonClick = () => {
    if (!selectedChat && selectedAgentId) {
      setSelectedAgentId(null);
      localStorage.removeItem("selectedAgentId");
      console.log("2:");
    } else if (selectedChat) {
      setSelectedChat(null);
      localStorage.removeItem("selectedChatId");
      console.log("1:");
    }
  };

  console.log(selectedChat);
  return (
    <main>
      <section className="container">
        <MessagesPaneHeader /*title={token ? "Chat" : "Select an Agent"} */
          selectedChat={selectedChat}
          agentId={selectedAgentId}
          onLogout={handleLogout}
          onBackButtonClick={handleBackButtonClick}
        />
        <MessagesPaneBody>
          {!selectedChat && !selectedAgentId && isLoaded && (
            <>
              {chatList.length > 0 ? (
                <ChatList chats={chatList} onChatSelect={handleChatUpdate} />
              ) : (
                agentList.length > 0 && <AgentList agents={agentList} onAgentSelect={handleAgentSelect} />
              )}
            </>
          )}
          {!selectedChat && selectedAgentId && isLoaded && (
            <FormContainer
              agentId={selectedAgentId}
              onTokenUpdate={handleTokenUpdate}
              onChatUpdate={handleChatUpdate}
            />
          )}
          {selectedChat && isLoaded && <MessageList messages={selectedChat.messages} />}
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
