/**
 * Props for the MessageList component.
 * Represents an array of chat messages to be rendered.
 */
interface ChatMessagesListProps {
  messages: Array<any>;
}

/**
 * MessageList component that renders a list of chat messages.
 * Dynamically creates Message components based on the provided messages array.
 * @param {MessageListProps} props - The props object containing the messages.
 * @param {any} props.messages - An array of message objects to render.
 * @returns {JSX.Element} The MessageList component.
 */
const ChatMessagesList: React.FC<ChatMessagesListProps> = ({ messages }) => {
  return (
    <div id="chat-messages" className="chat-messages">
      {/*
            <!-- https://tenor.com/gifapi/documentation#quickstart -->
            <!-- <img src="https://media1.tenor.com/images/c7504b9fb03c95b3b5687d744687e11c/tenor.gif?itemid=7212866" width="324px" height="257px"> -->
            <!-- <div className="chat-message message-in">
              <div className="chat-message-title">Tina Cornell</div>
              <div className="chat-message-group">
                <div className="chat-message-avatar avatar-4">TC</div>
                <div className="chat-message-content">
                  <div className="chat-message-image">
                    <img
                      src="https://media1.tenor.com/images/c7504b9fb03c95b3b5687d744687e11c/tenor.gif?itemid=7212866"
                    />
                  </div>
                  <div className="chat-message-text">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  </div>
                </div>
              </div>
            </div> --> 
            */}
    </div>
  );
};

export default ChatMessagesList;
