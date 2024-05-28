import React from "react";
import Avatar from "./Avatar";
import { UserData } from "./chatData";
import { locations } from "@/constants";
import DoubleCheck from "@/assets/icons/DoubleCheck";

interface UserComponentProps extends UserData {
  location: (typeof locations)[keyof typeof locations];
}

export default function User(props: UserComponentProps) {
  const {
    name,
    profileImageUrl,
    isActive,
    isTyping,
    lastMessage,
    lastChatTime,
    lastActive,
    unreadMessageCount,
    location,
  } = props;
  return (
    <div className="flex gap-4">
      <Avatar imageUrl={profileImageUrl} isActive={isActive} />
      <div className="flex flex-col flex-1 justify-center gap-1 truncate">
        <div className="flex justify-between gap-2 leading-tight">
          <span className="text-sm font-semibold truncate">{name}</span>
          <span className="text-xs font-medium text-gray-500">
            {location === locations.SIDE_PANEL && lastChatTime}
          </span>
        </div>
        <div className="w-full flex gap-1 items-center leading-tight">
          {unreadMessageCount! > 0 ? (
            <></>
          ) : (
            <DoubleCheck className="w-4 h-4 text-gray-500" />
          )}
          {isTyping ? (
            <span className="text-xs font-semibold text-green-600">
              Typing...{" "}
            </span>
          ) : (
            <span className="w-[90%] text-xs text-gray-500 font-medium truncate">
              {location === locations.SIDE_PANEL
                ? lastMessage
                : location === locations.CHATAREA_HEADER
                ? lastActive || "Active Now"
                : ""}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
