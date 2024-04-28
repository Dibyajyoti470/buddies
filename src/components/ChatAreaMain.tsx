import React from "react";
import InputField from "./InputField";
import Emoji from "@/assets/icons/Emoji";
import Send from "@/assets/icons/Send";
import { Input } from "@nextui-org/react";

export default function ChatAreaMain() {
  return (
    <div className="absolute top-20 left-0 right-0 bottom-0 p-6 overflow-auto">
      <InputField
        className="absolute left-1/2 -translate-x-1/2 bottom-6 w-4/5 max-w-[920px]"
        placeholder="Type a message..."
        startContent={
          <button type="button" className="mr-0.5">
            <Emoji className="w-4 h-4 text-gray-500 fill-gray-500" />
          </button>
        }
        endContent={
          <button type="button" className="ml-0.5">
            <Send className="w-4 h-4 text-gray-500 stroke-gray-500" />
          </button>
        }
      />

      {/* <Input
        startContent={
          <button type="button" className="mr-0.5">
            <Emoji className="w-4 h-4 text-gray-500 fill-gray-500" />
          </button>
        }
        endContent={
          <button type="button" className="ml-0.5">
            Close
          </button>
        }
      /> */}
    </div>
  );
}
