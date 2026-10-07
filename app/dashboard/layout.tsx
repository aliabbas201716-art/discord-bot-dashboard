import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        <aside className="w-72 border-r border-slate-800 bg-slate-900 p-6">
          <h1 className="mb-8 text-2xl font-bold">Server Control</h1>
          <nav className="space-y-2">
            <a href="/dashboard" className="block rounded-lg px-3 py-2 hover:bg-slate-800">Overview</a>
            <a href="/dashboard/guilds" className="block rounded-lg px-3 py-2 hover:bg-slate-800">My Servers</a>
            <a href="/dashboard/settings" className="block rounded-lg px-3 py-2 hover:bg-slate-800">Settings</a>
            <form action="/api/auth/logout" method="POST">
              <button className="w-full rounded-lg px-3 py-2 text-left text-red-400 hover:bg-red-500/10">Logout</button>
            </form>
          </nav>
        </aside>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
