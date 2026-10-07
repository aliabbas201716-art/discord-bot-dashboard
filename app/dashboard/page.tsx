import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) return null;

  const user = await prisma.dashboardUser.findUnique({
    where: { discordUserId: session.user.id },
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome, {user?.username}!</h1>
        <p className="text-slate-400">Manage your servers and bot settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="text-sm text-slate-400 mb-2">Servers Managed</div>
          <div className="text-3xl font-bold text-white">-</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="text-sm text-slate-400 mb-2">Moderation Actions</div>
          <div className="text-3xl font-bold text-white">-</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <div className="text-sm text-slate-400 mb-2">Warnings Issued</div>
          <div className="text-3xl font-bold text-white">-</div>
        </div>
      </div>

      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Getting Started</h2>
        <ol className="space-y-3 text-slate-300">
          <li className="flex gap-3">
            <span className="text-blue-400 font-semibold">1</span>
            <span>Go to "My Servers" to select a server to manage</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400 font-semibold">2</span>
            <span>Configure server settings like welcome messages, auto-roles, and moderation rules</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-400 font-semibold">3</span>
            <span>Changes take effect instantly on your Discord server</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
