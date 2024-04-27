"use client";

import React, { useEffect, useState } from "react";
import "./chat.scss";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import Logo from "@/assets/icons/Logo";

export default function Chat() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 11) + 5;

      setProgress((prevProgress) => {
        const nextProgress = prevProgress + increment;
        return nextProgress <= 100 ? nextProgress : 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {progress !== 100 ? (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-6">
          <Logo className="w-8 h-8 logo animate-spin" />
          <div className="flex w-[200px] h-1 bg-gray-200 rounded-md overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-primary-500 rounded-md transition-all duration-500"
            ></div>
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen grid grid-cols-[2fr_10fr]">
          <Sidebar />
          <ChatArea />
        </div>
      )}
    </>
  );
}
