import "./MessagesPaneBody.css";

/**
 * MessagesPaneBody component that serves as a wrapper for the chat interface.
 * @param {Object} props - The props object containing child components.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {JSX.Element} The MessagesPaneBody component.
 */
const MessagesPaneBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="container-body">
      <div className="chat-container">
        {children}
        {/* <template id="start-chat-template">
          <div className="form-container">
            <div>
              <form id="start-chat">
                <button type="submit">Chat now</button>
              </form>
            </div>
          </div>
        </template>

        <template id="registration-template">
          <div className="form-container">
            <div>
              <p>Please fill in the form below before starting the chat.</p>
              <form id="registration">
                <label htmlFor="name">Name:</label>
                <input name="name" type="text" required />
                <label htmlFor="email">E-mail:</label>
                <input name="email" type="email" pattern="^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required />
                <button type="submit">Start the chat</button>
              </form>
            </div>
          </div>
        </template> */}
      </div>
      <div id="error-display"></div>
    </div>
  );
};

export default MessagesPaneBody;
