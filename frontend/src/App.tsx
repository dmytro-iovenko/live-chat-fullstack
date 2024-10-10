import { useState } from "react";
import ChatsPane from "./components/ChatsPane/ChatsPane";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import MessagesPane from "./components/MessagesPane/MessagesPane";
import chats, { ChatProps } from "./data/chats";

const App = () => {
  const [chatList, setChatList] = useState(chats);
  const [selectedChat, setSelectedChat] = useState(chats[0]);

  const handleUpdateChats = (updatedChats: ChatProps[]) => {
    // console.log(updatedChats);
    setChatList(updatedChats);
  };

  return (
    <>
      <Header />
      <Main>
        <ChatsPane chats={chatList} selectedChatId={selectedChat.id} setSelectedChat={setSelectedChat} />
        <MessagesPane chat={selectedChat} chats={chatList} onUpdateChats={handleUpdateChats} />
      </Main>
    </>
  );
};

export default App;
