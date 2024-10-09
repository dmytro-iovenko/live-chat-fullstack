import ChatsPane from "./components/ChatsPane/ChatsPane";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import MessagesPane from "./components/MessagesPane/MessagesPane";

const App = () => {
  return (
    <>
      <Header />
      <Main>
        <ChatsPane />
        <MessagesPane />
      </Main>
    </>
  );
};

export default App;
