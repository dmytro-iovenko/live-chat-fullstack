import React from "react";
import ChatList from "../ChatList/ChatList";
import ChatTitle from "../ChatTitle/ChatTitle";
import ChatContainer from "../ChatContainer/ChatContainer";
import ChatMessagesList from "../ChatMessageList/ChatMessageList";
import { ChatMessageProps } from "../ChatMessage/ChatMessage";
import "./Main.css";
import MessageInput from "../MessageInput/MessageInput";
import ChatFooter from "../ChatFooter/ChatFooter";

// Dummy messages mocking a chat conversation
const messagesData = [
  {
    id: 1,
    title: "Mary Sue",
    text: "Hi, I'm looking for wireless noise-canceling headphones.",
    is_outgoing: false,
  },
  {
    id: 2,
    title: "Mary Sue",
    text: "Ideally white ones.",
    is_outgoing: false,
  },
  {
    id: 3,
    title: "John Doe",
    text: "Hi Tina, sure, check these out!",
    is_outgoing: true,
  },
  {
    id: 4,
    title: "John Doe",
    text: "www.perfectsoud.com/GTXmasterheadphones",
    is_outgoing: true,
  },
  {
    id: 5,
    title: "John Doe",
    image: {
      src: "https://images.pexels.com/photos/2080611/pexels-photo-2080611.jpeg?auto=compress&cs=tinysrgb&w=320",
      alt: "GT-R-6",
    },
    is_outgoing: true,
  },
  {
    id: 6,
    title: "John Doe",
    text: "Customers love their durability too - just take a look at the reviews.",
    is_outgoing: true,
  },
  {
    id: 7,
    title: "Mary Sue",
    text: "Looking good! What's their battery life on a single charge? And are they foldable?",
    is_outgoing: false,
  },
  {
    id: 8,
    title: "John Doe",
    text: "You can listen to 20 hours of music on a single charge! They are foldable and come with a trave case.",
    is_outgoing: true,
  },
  {
    id: 9,
    title: "Mary Sue",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    image: {
      src: "https://media1.tenor.com/images/c7504b9fb03c95b3b5687d744687e11c/tenor.gif?itemid=7212866",
    },
    is_outgoing: false,
  },
];

/**
 * Props for the Section component.
 * Represents a section of the page that can contain child components.
 */
interface SectionProps {
  id: string; // Unique identifier for the section
  children: React.ReactNode; // Child components to be rendered
}

/**
 * Section component that wraps content in a section element.
 * Renders a section of the page with a specific ID and children.
 * @param {SectionProps} props - The props for the Section component.
 * @param {string} props.id - Unique identifier for the section.
 * @param {React.ReactNode} props.children - Child components to be rendered.
 * @returns {JSX.Element} The Section component rendering the provided children.
 */
const Section: React.FC<SectionProps> = ({ id, children }: SectionProps): JSX.Element => {
  return (
    <section id={id} className="container">
      {children}
    </section>
  );
};

/**
 * Main component that represents the main content area of the application.
 * Combines sections for the chat list and chat conversation.
 * @returns {JSX.Element} The Main component rendering the main content area.
 */
const Main: React.FC = (): JSX.Element => {
  const title: string = "Tina Cornell";
  const messages: ChatMessageProps[] = messagesData;
  return (
    <main>
      <Section id="sidebar">
        <ChatList />
      </Section>
      <Section id="main">
        <ChatTitle title={title} />
        <ChatContainer>
          <ChatMessagesList messages={messages} />
        </ChatContainer>
        <ChatFooter>
          <MessageInput />
        </ChatFooter>
      </Section>
    </main>
  );
};

export default Main;
