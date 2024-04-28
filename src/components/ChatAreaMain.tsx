import React from "react";
import Emoji from "@/assets/icons/Emoji";
import Send from "@/assets/icons/Send";
import TextareaField from "./TextareaField";
import { Message, chat } from "./chatData";
import { cn } from "@/utils/utils";

export default function ChatAreaMain() {
  const renderMessage = (message: Message): React.JSX.Element => {
    return (
      <div
        className={cn(
          "flex w-fit self-start px-4 py-3 bg-gray-100 rounded-md rounded-tl-none",
          {
            "self-end rounded-tl rounded-tr-none":
              message.senderId === "current-user",
          }
        )}
      >
        <span className="text-xs font-medium">{message.text}</span>
      </div>
    );
  };

  return (
    <div className="absolute top-20 left-0 right-0 bottom-0 p-6 flex justify-center overflow-auto">
      <div className="flex flex-col gap-4 w-4/5 max-w-[920px]">
        {chat.map((message) => renderMessage(message))}
      </div>
      <form className="absolute left-1/2 -translate-x-1/2 bottom-6 w-4/5 max-w-[920px]">
        <TextareaField
          placeholder="Type a message..."
          minRows={1}
          maxRows={5}
          startContent={
            <button type="button" className="mt-0.5 mr-0.5">
              <Emoji className="w-4 h-4 text-gray-500 fill-gray-500" />
            </button>
          }
          endContent={
            <button type="submit" className="mt-0.5 ml-2">
              <Send className="w-4 h-4 text-gray-500 stroke-gray-500" />
            </button>
          }
        />
      </form>
    </div>
  );
}
