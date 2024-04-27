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
      <div className="flex flex-col flex-1 justify-center gap-1 truncate">
        <div className="flex justify-between gap-2 leading-tight">
          <span className="font-semibold truncate">{name}</span>
          <span className="text-xs font-medium text-gray-500">
            {lastChatTime}
          </span>
        </div>
        <div className="w-full flex gap-1 items-center leading-tight">
          {unreadMessageCount > 0 ? (
            <></>
          ) : (
            <DoubleCheck className="w-4 h-4 text-gray-500" />
          )}
          {isTyping ? (
            <span className="text-sm font-semibold text-green-600">
              {name.split(" ")[0]} is typing...{" "}
            </span>
          ) : (
            <span className="w-[90%] text-sm text-gray-500 font-medium truncate">
              {lastMessage}
            </span>
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
