import React from "react";
import User from "./User";
import { Auth } from "firebase/auth";
import { ChatProps, UserData, chatList } from "./chatData";
import { formatPastTime } from "@/utils";
import { locations } from "@/constants";

export default function Chats({ auth }: { auth: Auth }) {
  return (
    <div className="w-full flex flex-col gap-6 p-6">
      {chatList.map((chat: UserData) => {
        const {
          id,
          name,
          profileImageUrl,
          lastMessage,
          lastChatTime,
          unreadMessageCount,
          isActive,
          isTyping,
        } = chat;
        return (
          <User
            key={id}
            id={id}
            profileImageUrl={profileImageUrl}
            isActive={isActive}
            isTyping={isTyping}
            name={name}
            lastMessage={lastMessage}
            lastChatTime={formatPastTime(lastChatTime || "")}
            unreadMessageCount={unreadMessageCount}
            location={locations.SIDE_PANEL}
          />
        );
      })}
    </div>
  );
}
