import React from "react";
import Avatar from "../Avatar/Avatar";
import { Auth } from "firebase/auth";
import { ChatProps, chatData } from "./chatData";
import DoubleCheck from "../../assets/icons/DoubleCheck";
import { formatPastTime } from "@/utils/formats";

function Chat(props: ChatProps) {
  const {
    name,
    profileImageUrl,
    isOnline,
    isTyping,
    lastMessage,
    lastChatTime,
    unreadMessageCount,
  } = props;
  return (
    <div className="flex gap-4">
      <Avatar imageUrl={profileImageUrl} isOnline={isOnline} />
      <div className="flex flex-col justify-center gap-1">
        <div className="flex justify-between items-center">
          <span className="font-semibold">{name}</span>
          <span className="text-sm text-gray-600">{lastChatTime}</span>
        </div>
        <div className="w-full flex justify-between items-center">
          {isTyping ? (
            <span className="text-sm text-green-600">
              {name.split(" ")[0]} is typing...{" "}
            </span>
          ) : (
            <span className="text-sm w-full truncate">{lastMessage}</span>
          )}
          {unreadMessageCount > 0 ? (
            // <div className="w-6 h-6 flex justify-center items-center text-white font-semibold bg-primary-500 rounded-full">
            //   {unreadMessageCount}
            // </div>
            <span></span>
          ) : (
            <DoubleCheck className="w-5 h-5" />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Chats({ auth }: { auth: Auth }) {
  return (
    <div className="w-full flex flex-col gap-6">
      {chatData.map((chat: ChatProps) => (
        <Chat
          key={chat.id}
          id={chat.id}
          profileImageUrl={chat.profileImageUrl}
          isOnline={chat.isOnline}
          isTyping={chat.isTyping}
          name={chat.name}
          lastMessage={chat.lastMessage}
          lastChatTime={formatPastTime(chat.lastChatTime)}
          unreadMessageCount={chat.unreadMessageCount}
        />
      ))}
    </div>
  );
}
