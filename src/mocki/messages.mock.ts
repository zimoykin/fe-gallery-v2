import { ChatMessage } from "../interfaces/chat-message.interface";

export const getMessages = (
  profileId1: string,
  profileId2: string,
): ChatMessage[] => [
  {
    senderId: profileId2,
    receiverId: profileId1,
    text: "hello",
    date: new Date(),
    type: "text",
  },
  {
    senderId: profileId1,
    receiverId: profileId2,
    text: "Good morning, How are You?",
    date: new Date(),
    type: "text",
  },
  {
    senderId: profileId2,
    receiverId: profileId1,
    text: "I am fine. Thanks!",
    date: new Date(),
    type: "text",
  },
  {
    senderId: profileId1,
    receiverId: profileId2,
    text: "What abour tomorrow?",
    date: new Date(),
    type: "text",
  },
];
