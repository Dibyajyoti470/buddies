import React from "react";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full max-w-[1400px] h-screen flex justify-center items-center">
      {children}
    </main>
  );
}
