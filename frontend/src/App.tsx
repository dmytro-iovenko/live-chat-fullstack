import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ChatsPane from "./components/ChatsPane/ChatsPane";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import MessagesPane from "./components/MessagesPane/MessagesPane";
import { ChatProps } from "./data/chats";
import { getChats } from "./services/apiClient";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "./firebase/firebaseConfig";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const App: React.FC = () => {
  const { user, loading } = useAuth();
  const [chatList, setChatList] = useState<ChatProps[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatProps | null>(null);
  // const [credentials, setCredentials] = useState({ email: "", password: "" });
  // const [isLoginMode, setIsLoginMode] = useState(true);
  // const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState("");

  // Initial request to backend on first render
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await getChats();
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
  }, []);

  const handleUpdateChats = async (updatedChat: ChatProps | null) => {
    const updatedChats = chatList.map((c) => (c._id === updatedChat?._id ? updatedChat : c));
    setChatList(updatedChats);
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setCredentials((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleAuth = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const { email, password } = credentials;

  //   if (!email || !password) {
  //     setError("Please fill in all fields");
  //     return;
  //   }
  //   setError("");

  //   try {
  //     if (isLoginMode) {
  //       await signInWithEmailAndPassword(auth, email, password);
  //     } else {
  //       await createUserWithEmailAndPassword(auth, email, password);
  //     }
  //   } catch (error) {
  //     console.error(isLoginMode ? "Error logging in:" : "Error registering:", error);
  //     setError(isLoginMode ? "Login failed. Please check your credentials." : "Registration failed.");
  //   }
  // };

  // const handleLogout = async () => {
  //   await auth.signOut();
  // };

  // const togglePasswordVisibility = () => {
  //   setShowPassword((prev) => !prev);
  // };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Header />
      {user ? (
        <Main>
          <ChatsPane chats={chatList} selectedChatId={selectedChat?._id} setSelectedChat={setSelectedChat} />
          <MessagesPane chat={selectedChat} onUpdateChats={handleUpdateChats} />
        </Main>
      ) : (
        <>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App;

{/* <>
  <div className="login-page">
    <div className="login-container">
      <h2>{isLoginMode ? "Sign in" : "Sign up"}</h2>
      <form onSubmit={handleAuth}>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleInputChange}
            required
          />
          <FontAwesomeIcon className="icon" icon={faEnvelope} />
        </div>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
          <FontAwesomeIcon className="icon" icon={faLock} />
          <FontAwesomeIcon
            className="toggle-password"
            icon={showPassword ? faEyeSlash : faEye}
            onClick={togglePasswordVisibility}
          />
        </div>
        <button type="submit">{isLoginMode ? "Sign in" : "Sign up"}</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="forgot-password">
        <button className="link">Forgot Password?</button>
      </div>
      <div onClick={() => setIsLoginMode(!isLoginMode)} className="switch-mode">
        {isLoginMode ? (
          <>
            Don't have an account? <button className="link">Sign up!</button>
          </>
        ) : (
          <>
            Already have an account? <button className="link">Sign in!</button>
          </>
        )}
      </div>
    </div>
  </div>
</>; */}
