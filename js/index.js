const chatMessages = document.getElementById("chat-messages");

// A builder function to create message in the chat
function createMessage(message = {}, out = false) {
  // Creating a DocumentFragment
  const frag = document.createDocumentFragment();

  // <div class="chat-message message-out">
  //   <div class="chat-message-title">Tina Cornell</div>
  //   <div class="chat-message-group">
  //     <div class="chat-message-avatar avatar-4">TC</div>
  //     <div class="chat-message-content">
  //       <div class="chat-message-image">
  //         <img
  //           src="https://media1.tenor.com/images/c7504b9fb03c95b3b5687d744687e11c/tenor.gif?itemid=7212866"
  //         />
  //       </div>
  //       <div class="chat-message-text">
  //         Lorem ipsum dolor sit, amet consectetur adipisicing elit.
  //       </div>
  //     </div>
  //   </div>
  // </div>

  const chat = frag.appendChild(document.createElement("div"));
  chat.classList.add("chat-message");
  chat.classList.add(out ? "message-out" : "message-in");
  const title = chat.appendChild(document.createElement("div"));
  title.classList.add("chat-message-title");
  title.textContent = message.title;
  const content = frag.appendChild(document.createElement("div"));
  content.classList.add("chat-message-content");
  if (message.image) {
    const image = content.appendChild(document.createElement("div"));
    image.classList.add("chat-message-image");
    const img = image.appendChild(document.createElement("img"));
    img.setAttribute("src", message.image.src);
    img.setAttribute("alt", message.image.alt);
  }
  if (message.text) {
    const text = content.appendChild(document.createElement("div"));
    text.classList.add("chat-message-text");
    text.textContent = message.text;
  }
  return frag;
}
