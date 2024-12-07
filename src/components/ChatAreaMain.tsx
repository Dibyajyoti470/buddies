import React, { useEffect, useRef, useState } from "react";
import { Emoji, Send } from "@/assets/icons";
import TextareaField from "./TextareaField";
import { Message, chat } from "./chatData";
import { cn } from "@/utils";
import { db } from "@/firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export default function ChatAreaMain() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Listen for real-time updates
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(messagesData);

      // Scroll to the bottom when messages update
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();

    console.log(e, messageText);

    if (!messageText.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: messageText,
      senderId: "current-user",
      timestamp: serverTimestamp(),
    });

    setMessageText("");
  };

  const renderMessage = (key: number, message: Message): React.JSX.Element => {
    return (
      <div
        key={key}
        className={cn(
          "flex w-fit self-start px-4 py-[10px] bg-neutral-100 rounded-md",
          {
            "self-end": message.senderId === "current-user",
          }
        )}
      >
        <span className="text-[13px] text-neutral-700 font-normal">
          {message.text}
        </span>
      </div>
    );
  };

  return (
    <div className="absolute top-20 left-0 right-0 bottom-0 p-6 flex justify-center overflow-auto">
      <div className="flex flex-col gap-4 w-4/5 max-w-[920px]">
        {chat.map((message, index) => renderMessage(index, message))}
      </div>
      <form className="absolute left-1/2 -translate-x-1/2 bottom-6 w-4/5 max-w-[920px]">
        <TextareaField
          placeholder="Type a message..."
          minRows={1}
          maxRows={5}
          value={messageText}
          onChange={(e: any) => setMessageText(e.target.value)}
          onKeyDown={(e: any) => {
            if (e.key === "Enter" && !e.shiftKey) {
              sendMessage(e);
            }
          }}
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
