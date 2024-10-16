import "./App.css";
import MessagesPane from "./components/MessagesPane/MessagesPane";

function App() {
  return (
    <>
      <MessagesPane />
    </>
  );
}

export default App;

{
  /* <div className="container-body">
          <div className="chat-container">
            <template id="start-chat-template">
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
            </template>
          </div>
          <div id="error-display"></div>
        </div> */
}
