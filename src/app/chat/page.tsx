"use client";

import React, { useEffect, useState } from "react";
import "./Chat.scss";
import Logo from "/public/logo.svg";
import { auth } from "@/firebase/config";
import Chats from "@/components/Chats/Chats";

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
          <section className="flex flex-col gap-6 w-96 p-6 border-r-1 border-gray-100">
            <p className="flex items-center gap-2 font-semibold text-primary-500">
              <Logo className="w-5 h-5" />
              <span>Buddies</span>
            </p>
            <Chats auth={auth} />
          </section>
          <section className="p-6">
            <span>Chat</span>
          </section>
        </div>
      )}
    </>
  );
}
