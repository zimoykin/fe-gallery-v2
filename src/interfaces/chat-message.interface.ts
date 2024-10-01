export interface ChatMessage {
  senderId: string;
  receiverId: string;
  text: string;
  date: Date;
  type: "text" | "image" | "video" | "audio" | "file" | "location";
}
