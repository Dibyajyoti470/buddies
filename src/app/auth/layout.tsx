import React from "react";
import Logo from "@/assets/icons/Logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col gap-8 w-96 p-8 bg-white rounded-lg shadow-xl">
      <p className="flex items-center gap-2 text-sm font-semibold text-primary-500">
        <Logo className="w-5 h-5" />
        <span>Buddies</span>
      </p>
      {children}
    </main>
  );
}
