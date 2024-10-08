const agentName = "John Doe";
const customerName = "Mary Sue";

const messages = [
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

const chatMessages = document.getElementById("chat-messages");
const messageForm = document.getElementById("message-form");
const messageText = document.getElementById("message-text");
const sendButton = document.getElementById("send-btn");
const chatTitle = document.getElementById("chat-title");
chatTitle.textContent = customerName;

// A builder function to create message in the chat
function createMessage(message = {}) {
  // Creating a DocumentFragment
  const frag = document.createDocumentFragment();
  const chat = frag.appendChild(document.createElement("div"));
  chat.classList.add("chat-message");
  chat.classList.add(message.is_outgoing ? "message-out" : "message-in");
  const title = chat.appendChild(document.createElement("div"));
  title.classList.add("chat-message-title");
  title.textContent = message.title;
  const group = chat.appendChild(document.createElement("div"));
  group.classList.add("chat-message-group");
  const avatar = group.appendChild(createAvatar(message.title));
  const content = group.appendChild(document.createElement("div"));
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
    text.innerHTML = message.text;
  }
  return frag;

  function createAvatar(username) {
    const initials = getInitials(username);
    const avatarClass = getAvatarClass(initials);

    const frag = document.createDocumentFragment();
    const avatar = frag.appendChild(document.createElement("div"));
    avatar.classList.add("chat-message-avatar");
    avatar.classList.add(avatarClass);
    avatar.textContent = initials;

    return avatar;

    // Helper function to convert username into initials
    function getInitials(username) {
      const names = username.split(" ").slice(0, 2);
      const initials = names.map((name) => name.charAt(0).toUpperCase()).join("");
      return initials;
    }

    // Helper function to return unique avatar class from the initials
    function getAvatarClass(initials) {
      const uniqueMap = {};
      for (let i = 0; i < initials.length; i++) {
        const charCode = initials.charCodeAt(i);
        uniqueMap[initials[i]] = (uniqueMap[initials[i]] || 0) + charCode;
      }
      return "avatar-" + (Object.values(uniqueMap).reduce((sum, num) => sum + num, 0) % 10);
    }
  }
}

// Loop through chat messages to display them
messages.forEach((message) => {
  chatMessages.appendChild(createMessage(message));
});

// A function to scroll content down
function scrollDown(content) {
  if (content.scrollHeight > content.clientHeight) {
    content.scrollTop = content.scrollHeight;
  }
}

// Scroll Chat Messages down
scrollDown(chatMessages);

// Insert emoji to the message
const emoji = document.querySelector("#emoji-tab ~ .tab-content");
emoji.addEventListener("click", (event) => {
  if (messageText && event.target.classList.contains("emoji-icon")) {
    const [start, end] = [messageText.selectionStart, messageText.selectionEnd];
    messageText.setRangeText(event.target.textContent, start, end, "select");
    if (sendButton.disabled) sendButton.disabled = false;
  }
});

// Enable/Disable Send button
messageText.addEventListener("input", (event) => {
  if (sendButton.disabled && event.currentTarget.value !== "") {
    sendButton.disabled = false;
  } else if (event.currentTarget.value === "") {
    sendButton.disabled = true;
  }
});

// Handle sending new message
messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (messageText.value === "") return;
  const message = {
    id: crypto.randomUUID(),
    title: agentName,
    text: encodeHTML(messageText.value),
    is_outgoing: true,
    timestamp: Date.now(),
  };
  chatMessages.appendChild(createMessage(message));
  scrollDown(chatMessages);
  messageForm.reset();
  sendButton.disabled = true;

  // Return encoded (safe) text in html format
  function encodeHTML(text) {
    const encoded = text.replace(/[\u00A0-\u9999<>\&]/g, (i) => "&#" + i.charCodeAt(0) + ";");
    return encoded.split(/\r?\n/).join("<br>");
  }
});
