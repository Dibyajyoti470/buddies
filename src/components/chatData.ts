import { mimeTypes } from "@/constants/const";

export interface UserData {
  id: string;
  name: string;
  profileImageUrl: string;
  isActive: boolean;
  isTyping: boolean;
  lastMessage?: string;
  lastChatTime?: string;
  lastActive?: string;
  unreadMessageCount?: number;
}

export interface ChatProps extends UserData {
  lastMessage: string;
  lastChatTime: string;
  unreadMessageCount: number;
}

export const chatList: UserData[] = [
  {
    id: "1",
    profileImageUrl:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isActive: true,
    isTyping: false,
    name: "John Doe",
    lastMessage: "Sure, let's decide on a suitable time after lunch.",
    lastChatTime: "2024-04-26T10:41:00",
    unreadMessageCount: 0,
  },
  {
    id: "2",
    profileImageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isActive: false,
    isTyping: false,
    name: "Jane Smith",
    lastMessage: "Sounds good!",
    lastChatTime: "2024-04-25T18:30:00",
    unreadMessageCount: 0,
  },
  {
    id: "3",
    profileImageUrl:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isActive: true,
    isTyping: true,
    name: "Mike Jones",
    lastMessage: "Hey, are you free this weekend?",
    lastChatTime: "2024-04-26T09:15:00",
    unreadMessageCount: 1,
  },
  {
    id: "4",
    profileImageUrl:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isActive: false,
    isTyping: false,
    name: "Emma Watson",
    lastMessage: "Sure, let's catch up soon!",
    lastChatTime: "2024-04-25T20:45:00",
    unreadMessageCount: 0,
  },
  {
    id: "5",
    profileImageUrl:
      "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isActive: false,
    isTyping: false,
    name: "David Johnson",
    lastMessage: "See you later!",
    lastChatTime: "2024-04-24T14:20:00",
    unreadMessageCount: 0,
  },
  {
    id: "6",
    profileImageUrl:
      "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isActive: true,
    isTyping: false,
    name: "Lisa Miller",
    lastMessage: "How was your day?",
    lastChatTime: "2024-04-26T11:30:00",
    unreadMessageCount: 2,
  },
  {
    id: "7",
    profileImageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isActive: true,
    isTyping: true,
    name: "Alex Smith",
    lastMessage: "Let's plan a trip!",
    lastChatTime: "2024-04-25T21:05:00",
    unreadMessageCount: 0,
  },
  {
    id: "8",
    profileImageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isActive: false,
    isTyping: false,
    name: "Sarah Jackson",
    lastMessage: "That sounds like a good idea!",
    lastChatTime: "2024-04-25T19:50:00",
    unreadMessageCount: 0,
  },
  {
    id: "9",
    profileImageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isActive: true,
    isTyping: false,
    name: "Ryan Adams",
    lastMessage: "I'm looking forward to it!",
    lastChatTime: "2024-04-26T08:55:00",
    unreadMessageCount: 0,
  },
];

interface Emoji {
  code: string;
  senderId: string;
}
interface Media {
  mimeType: (typeof mimeTypes)[keyof typeof mimeTypes];
  url: string;
}

export interface Message {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  senderId: string;
  emojies?: Emoji[];
  media?: Media;
}

export const chat: Message[] = [
  {
    id: "1",
    text: "Hey there!",
    createdAt: "2024-04-28T10:00:00Z",
    updatedAt: "2024-04-28T10:00:00Z",
    senderId: "user-1",
  },
  {
    id: "2",
    text: "Hi!",
    createdAt: "2024-04-28T10:01:00Z",
    updatedAt: "2024-04-28T10:01:00Z",
    senderId: "current-user",
  },
  {
    id: "3",
    text: "How are you?",
    createdAt: "2024-04-28T10:02:00Z",
    updatedAt: "2024-04-28T10:02:00Z",
    senderId: "user-1",
    emojies: [{ code: "😊", senderId: "user-1" }],
  },
  {
    id: "4",
    text: "I'm good, thanks!",
    createdAt: "2024-04-28T10:03:00Z",
    updatedAt: "2024-04-28T10:03:00Z",
    senderId: "current-user",
  },
  {
    id: "5",
    text: "Do you have any plans for the weekend?",
    createdAt: "2024-04-28T10:04:00Z",
    updatedAt: "2024-04-28T10:04:00Z",
    senderId: "user-1",
  },
  {
    id: "6",
    text: "Not yet, but I'm thinking of going hiking.",
    createdAt: "2024-04-28T10:05:00Z",
    updatedAt: "2024-04-28T10:05:00Z",
    senderId: "current-user",
  },
  {
    id: "7",
    text: "That sounds fun!",
    createdAt: "2024-04-28T10:06:00Z",
    updatedAt: "2024-04-28T10:06:00Z",
    senderId: "user-1",
  },
  {
    id: "8",
    text: "Yeah, I'm looking forward to it.",
    createdAt: "2024-04-28T10:07:00Z",
    updatedAt: "2024-04-28T10:07:00Z",
    senderId: "current-user",
  },
  {
    id: "9",
    text: "By the way, did you finish reading that book?",
    createdAt: "2024-04-28T10:08:00Z",
    updatedAt: "2024-04-28T10:08:00Z",
    senderId: "user-1",
  },
  {
    id: "10",
    text: "Not yet, but I'm halfway through.",
    createdAt: "2024-04-28T10:09:00Z",
    updatedAt: "2024-04-28T10:09:00Z",
    senderId: "current-user",
  },
];
