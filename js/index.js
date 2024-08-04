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
  const content = chat.appendChild(document.createElement("div"));
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

// Loop through chat messages to display them
messages.forEach((message) => {
  chatMessages.appendChild(createMessage(message));
});
