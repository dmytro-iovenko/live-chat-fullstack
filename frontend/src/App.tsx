import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ChatsPane from "./components/ChatsPane/ChatsPane";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import MessagesPane from "./components/MessagesPane/MessagesPane";
import { ChatProps } from "./data/chats";
import { getUserChats } from "./services/apiClient";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const [chatList, setChatList] = useState<ChatProps[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatProps | null>(null);

  // Initial request to backend to collect user's chats
  useEffect(() => {
    if (!user) return;
    let isMounted = true;
    (async () => {
      try {
        const data = await getUserChats();
        if (isMounted) {
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
  }, [user]);

  const handleUpdateChats = async (updatedChat: ChatProps | null) => {
    const updatedChats = chatList.map((c) => (c._id === updatedChat?._id ? updatedChat : c));
    setChatList(updatedChats);
  };

  const handleLogout = async () => {
    await logout();
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
            {chatList.length > 0 ? (
              <ChatsPane chats={chatList} selectedChatId={selectedChat?._id} setSelectedChat={setSelectedChat} />
            ) : (
              <div>Loading...</div>
            )}

            {selectedChat ? (
              <MessagesPane chat={selectedChat} onUpdateChats={handleUpdateChats} user={user} />
            ) : (
              <div>Loading...</div>
            )}
          </Main>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
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
