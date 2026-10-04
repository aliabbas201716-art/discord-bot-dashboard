export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
            <div className="text-sm text-slate-400">Moderation</div>
            <div className="text-2xl font-bold mt-2">124</div>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
            <div className="text-sm text-slate-400">Warnings</div>
            <div className="text-2xl font-bold mt-2">17</div>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
            <div className="text-sm text-slate-400">Suggestions</div>
            <div className="text-2xl font-bold mt-2">9</div>
          </div>
        </div>
      </div>
    </main>
  );
}
