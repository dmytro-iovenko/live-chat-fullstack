const agent = {
  name: "John Doe",
  position: "IT Consultant",
};

const messages = [
  {
    id: 1,
    title: "Mary Sue",
    text: "Hi, I'm looking for wireless noise-canceling headphones.",
    is_outgoing: true,
  },
  {
    id: 2,
    title: "Mary Sue",
    text: "Ideally white ones.",
    is_outgoing: true,
  },
  {
    id: 3,
    title: "John Doe",
    text: "Hi Tina, sure, check these out!",
    is_outgoing: false,
  },
  {
    id: 4,
    title: "John Doe",
    text: "www.perfectsoud.com/GTXmasterheadphones",
    is_outgoing: false,
  },
  {
    id: 5,
    title: "John Doe",
    // https://www.pexels.com/photo/black-cordless-headphone-in-black-pouch-2080611/
    image: {
      src: "https://images.pexels.com/photos/2080611/pexels-photo-2080611.jpeg?auto=compress&cs=tinysrgb&w=320",
      alt: "GT-R-6",
    },
    is_outgoing: false,
  },
  {
    id: 6,
    title: "John Doe",
    text: "Customers love their durability too - just take a look at the reviews.",
    is_outgoing: false,
  },
  {
    id: 7,
    title: "Mary Sue",
    text: "Looking good! What's their battery life on a single charge? And are they foldable?",
    is_outgoing: true,
  },
  {
    id: 8,
    title: "John Doe",
    text: "You can listen to 20 hours of music on a single charge! They are foldable and come with a trave case.",
    is_outgoing: false,
  },
  {
    id: 9,
    title: "Mary Sue",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    // https://tenor.com/gifapi/documentation#quickstart
    image: {
      src: "https://media1.tenor.com/images/c7504b9fb03c95b3b5687d744687e11c/tenor.gif?itemid=7212866",
    },
    is_outgoing: true,
  },
];

const storage = window.localStorage;
const chatContainer = document.querySelector(".chat-container");
const chatTitle = document.querySelector(".chat-title");
chatTitle.textContent = "Welcome to LiveChat";

// Create Start Chat Form using HTML template
const startChatContainer = createContainer("start-chat-template");
// Create Registration Form using HTML template
const registrationContainer = createContainer("registration-template");

// Render Start Chat Form
chatContainer.append(startChatContainer);

// A builder function to create a chat item
const createChatItem = (agent = {}) => {
  // Creating a DocumentFragment
  const frag = document.createDocumentFragment();
  const item = frag.appendChild(document.createElement("div"));
  item.classList.add("chat-item");
  const wrapper = item.appendChild(document.createElement("div"));
  wrapper.classList.add("chat-item-wrapper");
  const status = wrapper.appendChild(document.createElement("div"));
  status.classList.add("chat-item-status");
  const avatar = wrapper.appendChild(document.createElement("div"));
  avatar.classList.add("chat-item-avatar");
  avatar.classList.add(getColorClass(agent.name));
  avatar.textContent = getInitials(agent.name);
  const content = item.appendChild(document.createElement("div"));
  content.classList.add("chat-item-content");
  const title = content.appendChild(document.createElement("div"));
  title.classList.add("chat-item-title");
  title.textContent = agent.name;
  const text = content.appendChild(document.createElement("div"));
  text.classList.add("chat-item-text");
  text.textContent = agent.position;
  return frag;

  function getInitials(name) {
    return name
      .split(" ")
      .map((e) => e[0].toUpperCase())
      .join("")
      .slice(0, 2);
  }

  function getColorClass(name) {
    let initials = getInitials(name);
    let i =
      initials.split("").reduce((sum, e) => sum + e.charCodeAt(0), 0) % 10;
    return "avatar-" + i;
  }
};

const startChatForm = startChatContainer.querySelector("#start-chat");
startChatForm.prepend(createChatItem(agent));

// Handle Registration Form submission
startChatForm.addEventListener("submit", handleStartChat);

function handleStartChat(event) {
  // Prevent default submit logic
  event.preventDefault();
  // Remove Start Chat Form
  chatContainer.removeChild(startChatContainer);
  // Add Registration Form
  chatContainer.append(registrationContainer);
  // Handle Registration Form submission
  const registrationForm = document.getElementById("registration");
  registrationForm.addEventListener("submit", handleRegistration);
}

function handleRegistration(event) {
  // Prevent default submit logic
  event.preventDefault();
  // Get Registration Form element
  const registrationForm = event.target;
  try {
    // Perform Name Validation
    const name = registrationForm.elements.name;
    validateName(name);
    // Perform Email Validation
    const email = registrationForm.elements.email;
    validateEmail(email);
    /** Registration Form - Form Submission */
    const chatname = generateChat(name.value, email.value);
    // Clear all form fields after successful submission
    registrationForm.reset();
    // Remove Registration Form
    chatContainer.removeChild(registrationContainer);
    // Start Chat
    startChat(chatname);
    console.log("OK");
  } catch (err) {
    displayError(err.message);
    if (err.cause && err.cause.focus) err.cause.focus();
    console.log(err);
  }

  // Registration Form - Username Validation:
  function validateName(element) {
    //The name cannot be blank.
    if (element.value === "") {
      throw new Error("The name cannot be blank.", { cause: element });
    }
    //The name must be at least four characters long.
    if (element.value.length < 4) {
      throw new Error("The name must be at least four characters long.", {
        cause: element,
      });
    }
    //The username must contain at least two unique characters.
    if (element.value.match(/^(.)\1+$/)) {
      throw new Error("The name must contain at least two unique characters.", {
        cause: element,
      });
    }
    //The name must not contain any special characters.
    if (element.value.match(/[^A-Za-z ]/)) {
      throw new Error("The name must not contain any special characters.", {
        cause: element,
      });
    }
    //The name must not contain leading or trailing spaces.
    if (element.value.match(/^\s|\s$/)) {
      throw new Error("The name must not contain leading or trailing spaces.");
    }
  }
  // Registration Form - Email Validation:
  function validateEmail(element) {
    //The email must be a valid email address.
    if (!element.value.match(/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/)) {
      throw new Error("The email must be a valid email address.", {
        cause: element,
      });
    }
    //The email must not be from the domain "example.com"
    if (element.value.match(/example\.com$/i)) {
      throw new Error('The email must not be from the domain "example.com"', {
        cause: element,
      });
    }
  }
  // Display error
  function displayError(error) {
    const errorDisplay = document.getElementById("error-display");
    errorDisplay.textContent = error;
    errorDisplay.style.display = "block";
    window.setTimeout(() => {
      errorDisplay.style.display = "none";
    }, 2000);
  }
}

function startChat(chatname) {
  // Get chat object
  const chat = getChat(chatname);
  console.log(chat);
  const messages = chat.messages;
  const username = chat.username;
  const email = chat.email;
  // Create Chat Messages Container
  const chatMessages = document.createElement("div");
  chatMessages.classList.add("chat-messages");
  chatContainer.appendChild(chatMessages);

  // Create Message Container using HTML template
  const messageContainer = createContainer("message-container-template");
  chatContainer.appendChild(messageContainer);

  // Get essential Message Container's elements
  const messageForm = messageContainer.querySelector("#message-form");
  const messageText = messageContainer.querySelector("#message-text");
  const sendButton = messageContainer.querySelector("#send-btn");

  // A builder function to create message in the chat
  const createMessage = (message = {}) => {
    // Creating a DocumentFragment
    const frag = document.createDocumentFragment();
    const element = frag.appendChild(document.createElement("div"));
    element.classList.add("chat-message");
    element.classList.add(message.is_outgoing ? "message-out" : "message-in");
    const title = element.appendChild(document.createElement("div"));
    title.classList.add("chat-message-title");
    title.textContent = message.title;
    const content = element.appendChild(document.createElement("div"));
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
  };

  // Loop through chat messages to display them
  messages.forEach((message) => {
    chatMessages.appendChild(createMessage(message));
  });

  // A function to scroll content down
  const scrollDown = (content) => {
    if (content.scrollHeight > content.clientHeight) {
      content.scrollTop = content.scrollHeight;
    }
  };
  // Scroll Chat Messages down
  scrollDown(chatMessages);

  // Set up message textarea to grow automatically
  messageText.addEventListener("input", () => {
    const grower = messageText.parentNode;
    grower.dataset.replicatedValue = messageText.value;
    if (countLines(messageText) > 1) {
      grower.classList.remove("fixed");
    } else if (!grower.classList.contains("fixed")) {
      grower.classList.add("fixed");
    }
    // https://stackoverflow.com/a/45252226
    // Function to returns the number of lines in a textarea,
    // including wrapped lines.
    function countLines(textarea) {
      let clone = textarea.cloneNode();
      clone.style.border = "none";
      clone.style.height = "0";
      clone.style.overflow = "hidden";
      clone.style.padding = "0";
      clone.style.position = "absolute";
      clone.style.left = "0";
      clone.style.top = "0";
      clone.style.zIndex = "-1";
      clone.style.visibility = "hidden";

      textarea.parentNode.appendChild(clone);

      let cs = window.getComputedStyle(textarea);
      let pl = parseInt(cs.paddingLeft);
      let pr = parseInt(cs.paddingRight);
      let lh = parseInt(cs.lineHeight);

      // [cs.lineHeight] may return 'normal', which means line height = font size.
      if (isNaN(lh)) lh = parseInt(cs.fontSize);

      // Copy content width.
      clone.style.width = textarea.clientWidth - pl - pr + "px";

      // Copy text properties.
      clone.style.font = cs.font;
      clone.style.letterSpacing = cs.letterSpacing;
      clone.style.whiteSpace = cs.whiteSpace;
      clone.style.wordBreak = cs.wordBreak;
      clone.style.wordSpacing = cs.wordSpacing;
      clone.style.wordWrap = cs.wordWrap;

      // Copy value.
      clone.value = textarea.value;

      let result = Math.floor(clone.scrollHeight / lh);
      if (result == 0) result = 1;
      textarea.parentNode.removeChild(clone);
      return result;
    }
  });

  // Insert emoji to the message
  const emojiArr = document.querySelectorAll(".emoji-icon");
  emojiArr.forEach((emojiItem) => {
    emojiItem.addEventListener("click", (event) => {
      const [start, end] = [
        messageText.selectionStart,
        messageText.selectionEnd,
      ];
      messageText.setRangeText(event.target.textContent, start, end, "select");
      if (sendButton.disabled) sendButton.disabled = false;
    });
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
      title: username,
      text: encodeHTML(messageText.value),
      is_outgoing: true,
      timestamp: Date.now(),
    };
    addMessage(chatname, message);
    chatMessages.appendChild(createMessage(message));
    scrollDown(chatMessages);
    resetForm();

    // Return encoded (safe) text in html format
    function encodeHTML(text) {
      const encoded = text.replace(
        /[\u00A0-\u9999<>\&]/g,
        (i) => "&#" + i.charCodeAt(0) + ";"
      );
      return encoded.split(/\r?\n/).join("<br>");
    }

    // Reset form and resize message textarea
    function resetForm() {
      const grower = messageText.parentNode;
      if (!grower.classList.contains("fixed")) {
        grower.classList.add("fixed");
      }
      sendButton.disabled = true;
      messageForm.reset();
    }
  });
}

// A builder function to create container using HTML template
function createContainer(name) {
  // Using an HTML template clone
  const template = document.getElementById(name);
  return template.content.firstElementChild.cloneNode(true);
}

// Return name of existing chat, if any, or create a new chat
function generateChat(username, email) {
  // Generate chatname from user's name
  const chatname = username.split(" ").join("_").toLowerCase();
  if (!storage.getItem(chatname)) {
    // Convert email to all lowercase before being stored.
    email = email.toLowerCase();
    // Generate first (welcome) message
    const welcomeMessage = {
      id: crypto.randomUUID(),
      title: agentname,
      text: `Hello ${username}. How may I help you?`,
      is_outgoing: false,
      timestamp: Date.now(),
    };
    storage.setItem(
      chatname,
      JSON.stringify({
        agentname,
        username,
        email,
        messages: [welcomeMessage],
      })
    );
  }
  return chatname;
}

// Return chat object from localStorage
function getChat(chatname) {
  const chat = storage.getItem(chatname);
  if (!chat) {
    throw new Error("That chat does not exist.");
  }
  return JSON.parse(chat);
}

// Add new message to the chat in localStorage
function addMessage(chatname, message) {
  const chat = getChat(chatname);
  chat.messages.push(message);
  storage.setItem(chatname, JSON.stringify(chat));
}
