import { MessageItemProps } from "../components/MessageItem/MessageItem";
import users, { UserProps } from "./users";


export interface ChatProps {
  id: string;
  sender: UserProps;
  messages: MessageItemProps[];
};

export const chats: ChatProps[] = [
  {
    id: "1",
    sender: users[0],
    messages: [
      {
        id: "1",
        text: "Hi, I'm looking for wireless noise-canceling headphones.",
        sender: users[0],
      },
      {
        id: "2",
        text: "Ideally white ones.",
        sender: users[0],
      },
      {
        id: "3",
        text: "Hi Tina, sure, check these out!",
        sender: "You",
      },
      {
        id: "4",
        text: "www.perfectsoud.com/GTXmasterheadphones",
        sender: "You",
      },
      {
        id: "5",
        image: {
          src: "https://images.pexels.com/photos/2080611/pexels-photo-2080611.jpeg?auto=compress&cs=tinysrgb&w=320",
          alt: "GT-R-6",
        },
        sender: "You",
      },
      {
        id: "6",
        text: "Customers love their durability too - just take a look at the reviews.",
        sender: "You",
      },
      {
        id: "7",
        text: "Looking good! What's their battery life on a single charge? And are they foldable?",
        sender: users[0],
      },
      {
        id: "8",
        text: "You can listen to 20 hours of music on a single charge! They are foldable and come with a trave case.",
        sender: "You",
      },
      {
        id: "9",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
        image: {
          src: "https://media1.tenor.com/images/c7504b9fb03c95b3b5687d744687e11c/tenor.gif?itemid=7212866",
        },
        sender: users[0],
      },
    ],
  },
];
