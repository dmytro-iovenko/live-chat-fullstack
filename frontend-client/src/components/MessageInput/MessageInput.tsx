import "./MessageInput.css";

/**
 * MessageInput component that contains the input area and buttons for sending messages.
 * Renders a text area for input, buttons for actions, and an emoji picker.
 * @returns {JSX.Element} The MessageForm component.
 */
const MessageInput: React.FC = (): JSX.Element => {
  return (
    <form id="message-form" className="popup-content">
      <div className="message-area">
        <a href="#" id="attach-btn" className="message-area-btn">
          <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AttachFileIcon">
            <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6z"></path>
          </svg>
        </a>
        <div className="grow-wrap fixed">
          <textarea
            id="message-text"
            className="message-area-text"
            name="message-text"
            placeholder="Type a message..."></textarea>
        </div>
        <a href="#" id="emoji-btn" className="message-area-btn">
          <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SentimentSatisfiedAltIcon">
            <circle cx="15.5" cy="9.5" r="1.5"></circle>
            <circle cx="8.5" cy="9.5" r="1.5"></circle>
            <circle cx="15.5" cy="9.5" r="1.5"></circle>
            <circle cx="8.5" cy="9.5" r="1.5"></circle>
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m0-2.5c2.33 0 4.32-1.45 5.12-3.5h-1.67c-.69 1.19-1.97 2-3.45 2s-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5"></path>
          </svg>
        </a>
        <button id="send-btn" className="message-area-btn" type="submit" disabled>
          <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SendIcon">
            <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"></path>
          </svg>
        </button>
        <div className="message-emoji">
          <div className="tabs-container">
            <input type="radio" id="emoji-tab" name="tabs" checked />
            <label htmlFor="emoji-tab" className="tab-label">
              Emoji
            </label>
            <div className="tab-content">
              <div className="emoji-icon">&#128512;</div>
              <div className="emoji-icon">&#128513;</div>
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
  );
};

export default MessageInput;
