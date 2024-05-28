import React from "react";
import Logo from "@/assets/icons/Logo";
import Card from "@/components/Card";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Card>
      <div className="flex flex-col gap-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-primary-500">
          <Logo className="w-5 h-5" />
          <span>Buddies</span>
        </p>
        {children}
      </div>
    </Card>
  );
}
