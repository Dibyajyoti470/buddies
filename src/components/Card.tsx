import React from "react";

export default function Card({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-96 p-8 bg-white rounded-lg shadow-xl">{children}</div>
  );
}
