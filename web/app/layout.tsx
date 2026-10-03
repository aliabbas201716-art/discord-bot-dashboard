import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Discord Bot Dashboard",
  description: "Circle-inspired Discord bot and server dashboard"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">{children}</body>
    </html>
  );
}
