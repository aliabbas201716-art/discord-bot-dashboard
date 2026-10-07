import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Discord Bot Dashboard",
  description: "Manage your Discord server with a powerful dashboard"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
