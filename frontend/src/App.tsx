import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ChatsPane from "./components/ChatsPane/ChatsPane";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import MessagesPane from "./components/MessagesPane/MessagesPane";
import { ChatProps } from "./data/chats";
import { getUserChats } from "./services/apiClient";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const [chatList, setChatList] = useState<ChatProps[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatProps | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Initial request to backend to collect user's chats
  useEffect(() => {
    if (!isLoggedIn) return;
    let isMounted = true;
    (async () => {
      try {
        const data = await getUserChats();
        if (isMounted) {
          console.log(data);
          setChatList(data);
          if (data.length > 0) {
            setSelectedChat(data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [isLoggedIn]);

  const handleUpdateChats = async (updatedChat: ChatProps | null) => {
    const updatedChats = chatList.map((c) => (c._id === updatedChat?._id ? updatedChat : c));
    setChatList(updatedChats);
  };

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    setChatList([]);
    setSelectedChat(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      {user ? (
        <>
          <Header user={user} onLogout={handleLogout} />
          <Main>
            <ChatsPane chats={chatList} selectedChatId={selectedChat?._id} setSelectedChat={setSelectedChat} />
            <MessagesPane chat={selectedChat} onUpdateChats={handleUpdateChats} user={user} />
          </Main>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<RegisterPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </>
      )}
      {/* Redirect authenticated users trying to access login or register */}
      {user && (
        <Routes>
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
