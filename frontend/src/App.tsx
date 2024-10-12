import { useEffect, useState } from "react";
import ChatsPane from "./components/ChatsPane/ChatsPane";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import MessagesPane from "./components/MessagesPane/MessagesPane";
import { ChatProps } from "./data/chats";
import { getChats } from "./services/apiClient";

const App = () => {
  const [chatList, setChatList] = useState<ChatProps[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatProps | null>(null);

  // make initial request to backend on first render
  useEffect(() => {
    let isMounted = true;
    try {
      (async () => {
        const data = await getChats();
        isMounted && console.log(data);
        isMounted && setChatList(data);
        if (data.length > 0) {
          isMounted && setSelectedChat(data[0]);
        }
      })();
      return () => {
        isMounted = false;
      };
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }, []);

  const handleUpdateChats = async (updatedChat: ChatProps | null) => {
    // Update the specific chat object in the original chats array
    const updatedChats = chatList?.map((c) => (c._id === updatedChat?._id ? updatedChat : c));
    setChatList(updatedChats);
  };

  return (
    <>
      <Header />
      <Main>
        <ChatsPane chats={chatList} selectedChatId={selectedChat?._id} setSelectedChat={setSelectedChat} />
        <MessagesPane chat={selectedChat} onUpdateChats={handleUpdateChats} />
      </Main>
    </>
  );
};

export default App;
