import React from "react";
import ChatAreaHeader from "./ChatAreaHeader";
import ChatAreaMain from "./ChatAreaMain";

export default function ChatArea() {
  return (
    <section className="flex flex-col relative">
      <ChatAreaHeader />
      <ChatAreaMain />
    </section>
  );
}
