import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          </div>

          <nav className="space-y-3">
            <a href="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition text-slate-300 hover:text-white">
              Overview
            </a>
            <a href="/dashboard/guilds" className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition text-slate-300 hover:text-white">
              My Servers
            </a>
            <a href="/api/auth/signout" className="block px-4 py-2 rounded-lg hover:bg-red-900/20 transition text-slate-300 hover:text-red-400">
              Logout
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
