import type { Metadata } from "next";
import { Inter, Noto_Sans, Poppins, Quicksand } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });
const notoSans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buddies",
  description: "Chat app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex justify-center items-center w-full min-h-screen`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
