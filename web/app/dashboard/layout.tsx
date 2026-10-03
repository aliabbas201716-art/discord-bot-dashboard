import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discord Dashboard",
  description: "Discord Bot Dashboard"
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">{children}</div>
  );
}
