import { useEffect, useState } from "react";
import ChatsPane from "./components/ChatsPane/ChatsPane";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import MessagesPane from "./components/MessagesPane/MessagesPane";
import { ChatProps } from "./data/chats";
import { getChats } from "./services/apiClient";
import { useAuth } from "./context/AuthContext";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

const App = () => {
  const { user, loading } = useAuth();
  const [chatList, setChatList] = useState<ChatProps[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatProps | null>(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoginMode, setIsLoginMode] = useState(true);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = credentials;

    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error(isLoginMode ? "Error logging in:" : "Error registering:", error);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {user ? (
        <>
          <Header />
          <Main>
            <ChatsPane chats={chatList} selectedChatId={selectedChat?._id} setSelectedChat={setSelectedChat} />
            <MessagesPane chat={selectedChat} onUpdateChats={handleUpdateChats} />
          </Main>
        </>
      ) : (
        <div>
          <h2>{isLoginMode ? "Log In" : "Register"}</h2>
          <form onSubmit={handleAuth}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">{isLoginMode ? "Log In" : "Register"}</button>
          </form>
          <button onClick={() => setIsLoginMode(!isLoginMode)}>Switch to {isLoginMode ? "Register" : "Log In"}</button>
        </div>
      )}
    </>
  );
};

export default App;
