import React from "react";
import ChatList from "../ChatList/ChatList";
import ChatTitle from "../ChatTitle/ChatTitle";
import ChatContainer from "../ChatContainer/ChatContainer";
import ChatMessagesList from "../ChatMessageList/ChatMessageList";
import { ChatMessageProps } from "../ChatMessage/ChatMessage";
import "./Main.css";

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
        <div className="container-footer popup">
          <form id="message-form" action="#" method="post" className="popup-content">
            <div className="message-area">
              <div className="message-box">
                <textarea name="message-text" id="message-text" placeholder="Type a message..."></textarea>
              </div>
              <div className="message-buttons">
                <a href="#" id="attach-btn" className="message-area-btn">
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AttachFileIcon">
                    <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6z"></path>
                  </svg>
                </a>
                <a href="#" id="emoji-btn" className="message-area-btn">
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SentimentSatisfiedAltIcon">
                    <circle cx="15.5" cy="9.5" r="1.5"></circle>
                    <circle cx="8.5" cy="9.5" r="1.5"></circle>
                    <circle cx="15.5" cy="9.5" r="1.5"></circle>
                    <circle cx="8.5" cy="9.5" r="1.5"></circle>
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m0-2.5c2.33 0 4.32-1.45 5.12-3.5h-1.67c-.69 1.19-1.97 2-3.45 2s-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5"></path>
                  </svg>
                </a>
                <a href="#" id="gif-btn" className="message-area-btn">
                  <svg className="" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="GifIcon">
                    <path d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1m10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"></path>
                  </svg>
                </a>
                <span className="placeholder"></span>
                <button id="send-btn" className="message-area-btn" type="submit" disabled>
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SendIcon">
                    <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"></path>
                  </svg>
                  {/* <!-- <span>Send</span> --> */}
                </button>
              </div>
              <div className="message-emoji">
                <div className="tabs-container">
                  <input type="radio" id="emoji-tab" name="tabs" />
                  <label htmlFor="emoji-tab" className="tab-label">
                    Emoji
                  </label>
                  <div className="tab-content">
                    <div className="emoji-icon">&#128512;</div>
                    <div className="emoji-icon">&#128513;</div>
                    <div className="emoji-icon">&#128514;</div>
                    <div className="emoji-icon">&#128515;</div>
                    <div className="emoji-icon">&#128516;</div>
                    <div className="emoji-icon">&#128517;</div>
                    <div className="emoji-icon">&#128518;</div>
                    <div className="emoji-icon">&#128519;</div>
                    <div className="emoji-icon">&#128520;</div>
                    <div className="emoji-icon">&#128521;</div>
                    <div className="emoji-icon">&#128522;</div>
                    <div className="emoji-icon">&#128523;</div>
                    <div className="emoji-icon">&#128524;</div>
                    <div className="emoji-icon">&#128525;</div>
                    <div className="emoji-icon">&#128526;</div>
                    <div className="emoji-icon">&#128527;</div>
                    <div className="emoji-icon">&#128528;</div>
                    <div className="emoji-icon">&#128529;</div>
                    <div className="emoji-icon">&#128530;</div>
                    <div className="emoji-icon">&#128531;</div>
                    <div className="emoji-icon">&#128532;</div>
                    <div className="emoji-icon">&#128533;</div>
                    <div className="emoji-icon">&#128534;</div>
                    <div className="emoji-icon">&#128535;</div>
                    <div className="emoji-icon">&#128536;</div>
                    <div className="emoji-icon">&#128537;</div>
                    <div className="emoji-icon">&#128538;</div>
                    <div className="emoji-icon">&#128539;</div>
                    <div className="emoji-icon">&#128540;</div>
                    <div className="emoji-icon">&#128541;</div>
                    <div className="emoji-icon">&#128542;</div>
                    <div className="emoji-icon">&#128543;</div>
                    <div className="emoji-icon">&#128544;</div>
                    <div className="emoji-icon">&#128545;</div>
                    <div className="emoji-icon">&#128546;</div>
                    <div className="emoji-icon">&#128547;</div>
                    <div className="emoji-icon">&#128548;</div>
                    <div className="emoji-icon">&#128549;</div>
                    <div className="emoji-icon">&#128550;</div>
                    <div className="emoji-icon">&#128551;</div>
                    <div className="emoji-icon">&#128552;</div>
                    <div className="emoji-icon">&#128553;</div>
                    <div className="emoji-icon">&#128554;</div>
                    <div className="emoji-icon">&#128555;</div>
                    <div className="emoji-icon">&#128556;</div>
                    <div className="emoji-icon">&#128557;</div>
                    <div className="emoji-icon">&#128558;</div>
                    <div className="emoji-icon">&#128559;</div>
                    <div className="emoji-icon">&#128560;</div>
                    <div className="emoji-icon">&#128561;</div>
                    <div className="emoji-icon">&#128562;</div>
                    <div className="emoji-icon">&#128563;</div>
                    <div className="emoji-icon">&#128564;</div>
                    <div className="emoji-icon">&#128565;</div>
                    <div className="emoji-icon">&#128566;</div>
                    <div className="emoji-icon">&#128567;</div>
                  </div>
                  <input type="radio" id="gifs-tab" name="tabs" />
                  <label htmlFor="gifs-tab" className="tab-label">
                    GIFs
                  </label>
                  <div className="tab-content">GIFs Content Here. Short.</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Section>
    </main>
  );
};

export default Main;
