import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ChatsPane from "./components/ChatsPane/ChatsPane";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import MessagesPane from "./components/MessagesPane/MessagesPane";
import { ChatProps } from "./data/chats";
import { UserProps } from "./data/users";
import { getUserChats } from "./services/apiClient";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const [chatList, setChatList] = useState<ChatProps[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatProps | null>(null);
  const [userData, setUserData] = useState<UserProps | null>(null);

  // Initial request to backend on first render
  useEffect(() => {
    console.log(userData)
    if (!userData || !userData._id) return;
    let isMounted = true;
    (async () => {
      try {
        const data = await getUserChats(userData._id);
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
  }, [userData]);

  const handleUpdateChats = async (updatedChat: ChatProps | null) => {
    const updatedChats = chatList.map((c) => (c._id === updatedChat?._id ? updatedChat : c));
    setChatList(updatedChats);
  };

  const handleLogout = async () => {
    await logout();
    setUserData(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      {user && userData ? (
        <>
          <Header userData={userData} onLogout={handleLogout} />
          <Main>
            <ChatsPane chats={chatList} selectedChatId={selectedChat?._id} setSelectedChat={setSelectedChat} />
            <MessagesPane chat={selectedChat} onUpdateChats={handleUpdateChats} />
          </Main>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/login" element={<LoginPage setUserData={setUserData} />} />
            <Route path="/register" element={<RegisterPage setUserData={setUserData} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App;
