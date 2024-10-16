import { useState } from "react";
import "./FormContainer.css";
import { createChat, getToken } from "../../services/apiClient";
import { ChatProps } from "../../data/chats";

interface FormContainerProps {
  agentId: string; // Receive agentId as a prop
  onTokenUpdate: (token: string) => void;
  onChatUpdate: (chat: ChatProps) => void;
}

const FormContainer: React.FC<FormContainerProps> = ({ agentId, onTokenUpdate, onChatUpdate }) => {
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
  });

  /**
   * Handles form submission.
   * Prevents default form submission and calls the onSubmit function with current Client data.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send data to the backend to get the token
      const token = await getToken(clientData.name, clientData.email);
      onTokenUpdate(token);
      localStorage.setItem("token", token);
      console.log("Token saved:", token);
      // Use the token to create a chat
      const newChat = await createChat(agentId);
      onChatUpdate(newChat);
      console.log("Chat created:", newChat);
      // Handle successful chat creation (e.g., redirect or display message)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  /**
   * Handles changes to the input fields.
   * Updates the credentials state with the new input value.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input field.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="chat-container">
      <div>
        <p>Please fill in the form below before starting the chat.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input name="name" type="text" onChange={handleChange} required />
          <label htmlFor="email">E-mail:</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            pattern="^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            required
          />
          <button type="submit">Start the chat</button>
        </form>
      </div>
    </div>
  );
};

export default FormContainer;
