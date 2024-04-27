import React from "react";
import Avatar from "./Avatar";
import User from "./User";
import { locations } from "@/constants/const";

export default function ChatAreaHeader() {
  const selectedUser = {
    id: "3",
    profileImageUrl:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isActive: true,
    isTyping: false,
    name: "Mike Jones",
    lastMessage: "Hey, are you free this weekend?",
    lastChatTime: "2024-04-26T09:15:00",
    unreadMessageCount: 1,
  };

  return (
    <div className="h-20 flex items-center px-6 border-b-1 border-gray-100">
      <User
        id={selectedUser.id}
        profileImageUrl={selectedUser.profileImageUrl}
        isActive={selectedUser.isActive}
        isTyping={selectedUser.isTyping}
        name={selectedUser.name}
        lastMessage={selectedUser.lastMessage}
        unreadMessageCount={selectedUser.unreadMessageCount}
        location={locations.CHATAREA_HEADER}
      />
    </div>
  );
}
