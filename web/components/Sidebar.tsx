export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-900 p-4 border-r border-slate-700">
      <div className="text-2xl font-bold mb-8">BotHub</div>
      <nav className="space-y-2">
        <a href="/dashboard" className="block p-2 rounded hover:bg-slate-800">Overview</a>
        <a href="/dashboard/guilds" className="block p-2 rounded hover:bg-slate-800">Guilds</a>
        <a href="/dashboard/settings" className="block p-2 rounded hover:bg-slate-800">Settings</a>
        <a href="/dashboard/moderation" className="block p-2 rounded hover:bg-slate-800">Moderation</a>
        <a href="/dashboard/auto-mod" className="block p-2 rounded hover:bg-slate-800">Auto Mod</a>
      </nav>
    </aside>
  );
}
