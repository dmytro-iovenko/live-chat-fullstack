import { useState } from "react";
import ChatsPane from "./components/ChatsPane/ChatsPane";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import MessagesPane from "./components/MessagesPane/MessagesPane";
import { chats } from "./data/chats";

const App = () => {
  const [selectedChat, setSelectedChat] = useState(chats[0]);

  return (
    <>
      <Header />
      <Main>
        <ChatsPane />
        <MessagesPane chat={selectedChat} />
      </Main>
    </>
  );
};

export default App;
