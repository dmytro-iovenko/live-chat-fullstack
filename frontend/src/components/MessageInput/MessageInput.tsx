import { useRef } from "react";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import "./MessageInput.css";

/**
 * MessageTextArea component that renders a text area for user input.
 * Handles changes to the text area and submits the message when conditions are met.
 * @param {MessageInputProps} props - The props containing text area value, setter, and submit function.
 * @returns {JSX.Element} The MessageArea component.
 */
const MessageTextArea: React.FC<MessageInputProps> = ({
  textAreaValue,
  setTextAreaValue,
  onSubmit,
}: MessageInputProps): JSX.Element => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleClick = () => {
    if (textAreaValue.trim() !== "") {
      onSubmit();
      setTextAreaValue("");
    }
  };

  return (
    <div className="message-box">
      <textarea
        placeholder="Type a message..."
        ref={textAreaRef}
        onChange={(event) => {
          setTextAreaValue(event.target.value);
        }}
        value={textAreaValue}
        onKeyDown={(event) => {
          if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
            handleClick();
          }
        }}></textarea>
    </div>
  );
};

/**
 * MessageButtons component that contains action buttons for sending and managing messages.
 * Handles click event for the Send button and submits the message when conditions are met.
 * @param {MessageInputProps} props - The props containing text area value, setter, and submit function.
 * @returns {JSX.Element} The MessageButtons component.
 */
const MessageButtons: React.FC<MessageInputProps> = ({
  textAreaValue,
  setTextAreaValue,
  onSubmit,
}: MessageInputProps): JSX.Element => {
  const handleClick = () => {
    if (textAreaValue.trim() !== "") {
      onSubmit();
      setTextAreaValue("");
    }
  };

  return (
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
      <button id="send-btn" className="message-area-btn" onClick={handleClick}>
        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SendIcon">
          <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"></path>
        </svg>
      </button>
    </div>
  );
};

/**
 * Props for the MessageInput component.
 * Contains the current value of the text area, a function to update the text area value, and a function to handle message submission.
 * @interface MessageInputProps
 */
export interface MessageInputProps {
  textAreaValue: string; // Current value of the text area
  setTextAreaValue: (value: string) => void; // Function to update the text area value
  onSubmit: () => void; // Function to handle message submission
}

/**
 * MessageInput component that contains the input area and buttons for sending messages.
 * Renders a text area for input, buttons for actions, and an emoji picker.
 * @param {MessageInputProps} props - The props containing text area value, setter, and submit function.
 * @returns {JSX.Element} The MessageForm component.
 */
const MessageInput: React.FC<MessageInputProps> = (props: MessageInputProps): JSX.Element => {
  return (
    <div id="message-form" className="popup-content">
      <div className="message-area">
        <MessageTextArea {...props} />
        <MessageButtons {...props} />
        <EmojiPicker />
      </div>
    </div>
  );
};

export default MessageInput;
