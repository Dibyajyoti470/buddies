import React from "react";
import User from "./User";
import { Auth } from "firebase/auth";
import { ChatProps, UserData, chatList } from "./chatData";
import { formatPastTime } from "@/utils";
import { locations } from "@/constants";

export default function Chats({ auth }: { auth: Auth }) {
  return (
    <div className="w-full flex flex-col gap-6 p-6">
      {chatList.map((chat: UserData) => (
        <User
          key={chat.id}
          id={chat.id}
          profileImageUrl={chat.profileImageUrl}
          isActive={chat.isActive}
          isTyping={chat.isTyping}
          name={chat.name}
          lastMessage={chat.lastMessage}
          lastChatTime={formatPastTime(chat.lastChatTime || "")}
          unreadMessageCount={chat.unreadMessageCount}
          location={locations.SIDE_PANEL}
        />
      ))}
    </div>
  );
}
