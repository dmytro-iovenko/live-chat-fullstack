import { MessageItemProps } from "../components/MessageItem/MessageItem";
import { UserProps } from "./users";

/**
 * Shared props for components that handle chat lists and selection.
 * This interface encapsulates the necessary properties for managing chat display and selection.
 */
export interface ChatPropsCommon {
  chats: ChatProps[]; // Array of chat objects to display
  setSelectedChat: (chat: ChatProps) => void; // Function to set the selected chat
  selectedChatId?: string; // ID of the currently selected chat
}

/**
 * Represents a chat object within the application.
 * Contains details about the chat, including its ID, sender, and messages exchanged.
 */
export interface ChatProps {
  _id: string; // Unique identifier for the chat
  sender: UserProps; // The user who initiated the chat
  messages: MessageItemProps[]; // Array of messages exchanged in the chat
}

const chats: ChatProps[] = [
  // {
  //   id: "1",
  //   sender: users[0],
  //   messages: [
  //     { id: "1", text: "Hi, I'm looking for wireless noise-canceling headphones.", sender: users[0] },
  //     { id: "2", text: "Ideally white ones.", sender: users[0] },
  //     { id: "3", text: "Hi Tina, sure, check these out!", sender: "You" },
  //     { id: "4", text: "www.perfectsound.com/GTXmasterheadphones", sender: "You" },
  //     {
  //       id: "5",
  //       image: {
  //         src: "https://images.pexels.com/photos/2080611/pexels-photo-2080611.jpeg?auto=compress&cs=tinysrgb&w=320",
  //         alt: "GT-R-6",
  //       },
  //       sender: "You",
  //     },
  //     { id: "6", text: "Customers love their durability too - just take a look at the reviews.", sender: "You" },
  //     {
  //       id: "7",
  //       text: "Looking good! What's their battery life on a single charge? And are they foldable?",
  //       sender: users[0],
  //     },
  //     {
  //       id: "8",
  //       text: "You can listen to 20 hours of music on a single charge! They are foldable and come with a travel case.",
  //       sender: "You",
  //     },
  //     { id: "9", text: "That's perfect! Do they come with a warranty?", sender: users[0] },
  //     { id: "10", text: "Yes, they come with a one-year warranty.", sender: "You" },
  //   ],
  // },
  // {
  //   id: "2",
  //   sender: users[1],
  //   messages: [
  //     { id: "1", text: "Hello! I need some help with my recent order.", sender: users[1] },
  //     { id: "2", text: "I ordered a laptop but haven't received it yet.", sender: users[1] },
  //     { id: "3", text: "Can you provide your order number?", sender: "You" },
  //     { id: "4", text: "Sure, it's #12345.", sender: users[1] },
  //     { id: "5", text: "Thanks! Let me check that for you.", sender: "You" },
  //     { id: "6", text: "It looks like your order was shipped yesterday.", sender: "You" },
  //     { id: "7", text: "Awesome! When can I expect it to arrive?", sender: users[1] },
  //     { id: "8", text: "It should arrive within 3-5 business days.", sender: "You" },
  //     { id: "9", text: "Great! Thanks for the help.", sender: users[1] },
  //     { id: "10", text: "You're welcome! Let me know if you need anything else.", sender: "You" },
  //   ],
  // },
  // {
  //   id: "3",
  //   sender: users[2],
  //   messages: [
  //     { id: "1", text: "Hi there! I have a question about my account.", sender: users[2] },
  //     { id: "2", text: "I forgot my password. Can you help me reset it?", sender: users[2] },
  //     { id: "3", text: "I tried resetting it through email, but it didn't work.", sender: users[2] },
  //     { id: "4", text: "Absolutely! I can send a reset link to your email.", sender: "You" },
  //     { id: "5", text: "Please send it to michael.brown@livechat.local.", sender: users[2] },
  //     { id: "6", text: "Done! Check your email.", sender: "You" },
  //     { id: "7", text: "I received it! Thanks for the quick help.", sender: users[2] },
  //     { id: "8", text: "You're welcome! Let me know if you need further assistance.", sender: "You" },
  //   ],
  // },
  // {
  //   id: "4",
  //   sender: users[3],
  //   messages: [
  //     { id: "1", text: "Hello! I'm interested in your return policy.", sender: users[3] },
  //     { id: "2", text: "Can I return an item if it's been opened?", sender: users[3] },
  //     { id: "3", text: "I bought a jacket but it doesn't fit well.", sender: users[3] },
  //     { id: "4", text: "Yes, as long as it's in good condition.", sender: "You" },
  //     { id: "5", text: "Great! I have a few items to return.", sender: users[3] },
  //     { id: "6", text: "How do I start the return process?", sender: users[3] },
  //     { id: "7", text: "Please provide your order number.", sender: "You" },
  //     { id: "8", text: "It's #54321.", sender: users[3] },
  //     { id: "9", text: "Thank you! I'll initiate the return for you.", sender: "You" },
  //     { id: "10", text: "Thanks for your help!", sender: users[3] },
  //   ],
  // },
  // {
  //   id: "5",
  //   sender: users[4],
  //   messages: [
  //     { id: "1", text: "Hi! I'm having issues with my app subscription.", sender: users[4] },
  //     { id: "2", text: "I was charged twice this month.", sender: users[4] },
  //     { id: "3", text: "I didn't expect that, can you check?", sender: users[4] },
  //     { id: "4", text: "Let me look into that for you.", sender: "You" },
  //     { id: "5", text: "That would be great! What did you find?", sender: users[4] },
  //     { id: "6", text: "It appears there was a system error. I'll process a refund.", sender: "You" },
  //     { id: "7", text: "Thanks! When will it be reflected?", sender: users[4] },
  //     { id: "8", text: "You should see it within 3-5 business days.", sender: "You" },
  //     { id: "9", text: "I appreciate your help with this!", sender: users[4] },
  //     { id: "10", text: "You're welcome! Let me know if you need anything else.", sender: "You" },
  //   ],
  // },
  // {
  //   id: "6",
  //   sender: users[5],
  //   messages: [
  //     { id: "1", text: "Hello! I'm looking for information on bulk orders.", sender: users[5] },
  //     { id: "2", text: "Do you have a minimum order quantity?", sender: users[5] },
  //     { id: "3", text: "And what kind of discounts do you offer?", sender: users[5] },
  //     { id: "4", text: "Yes, the minimum is 50 units.", sender: "You" },
  //     { id: "5", text: "What about the pricing for larger orders?", sender: users[5] },
  //     { id: "6", text: "We offer tiered discounts based on quantity.", sender: "You" },
  //     { id: "7", text: "That sounds good! Can I see a catalog?", sender: users[5] },
  //     { id: "8", text: "I can send you a link to our online catalog.", sender: "You" },
  //     { id: "9", text: "Yes, please do! I'm eager to check it out.", sender: users[5] },
  //     { id: "10", text: "Here's the link: www.example.com/catalog", sender: "You" },
  //   ],
  // },
  // {
  //   id: "7",
  //   sender: users[6],
  //   messages: [
  //     { id: "1", text: "Hi, I need support with a product I purchased.", sender: users[6] },
  //     { id: "2", text: "It's the wireless speaker, and it's not charging.", sender: users[6] },
  //     { id: "3", text: "I've tried multiple outlets without success.", sender: users[6] },
  //     { id: "4", text: "Have you tried using a different charging cable?", sender: "You" },
  //     { id: "5", text: "Yes, I've tried that too.", sender: users[6] },
  //     { id: "6", text: "Let's get this sorted out. Can I get your order number?", sender: "You" },
  //     { id: "7", text: "It's #67890.", sender: users[6] },
  //     { id: "8", text: "Thank you! I'll check the warranty for you.", sender: "You" },
  //     { id: "9", text: "Please let me know what you find.", sender: users[6] },
  //     { id: "10", text: "It's under warranty! We can replace it for you.", sender: "You" },
  //   ],
  // },
];

export default chats;
