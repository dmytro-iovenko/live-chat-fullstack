import { useEffect, useState } from "react";
import ChatsPane from "./components/ChatsPane/ChatsPane";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import MessagesPane from "./components/MessagesPane/MessagesPane";
import { /*chats, */ ChatProps } from "./data/chats";

export const LIVECHAT_API_URL = import.meta.env.VITE_LIVECHAT_API_URL;

const App = () => {
  const [chatList, setChatList] = useState<ChatProps[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatProps | null>(null);

  // make initial request to backend on first render
  useEffect(() => {
    let isMounted = true;
    try {
      (async () => {
        const response = isMounted && (await fetch(`${LIVECHAT_API_URL}/chats`));
        const data = isMounted && (await response.json());
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

  const handleUpdateChats = (updatedChats: ChatProps[]) => {
    // console.log(updatedChats);
    setChatList(updatedChats);
  };

  return (
    <>
      <Header />
      <Main>
        <ChatsPane chats={chatList} selectedChatId={selectedChat?._id} setSelectedChat={setSelectedChat} />
        <MessagesPane chat={selectedChat} chats={chatList} onUpdateChats={handleUpdateChats} />
      </Main>
    </>
  );
};

export default App;
