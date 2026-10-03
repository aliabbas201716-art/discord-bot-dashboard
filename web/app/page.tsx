import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold mb-4">Circle-inspired Discord Control Center</h1>
        <p className="text-slate-300 text-lg mb-8">
          Manage server settings, moderation, welcome systems, starboards, and automation from one dashboard.
        </p>
        <Link
          href="/api/auth/discord"
          className="inline-block bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-semibold"
        >
          Login with Discord
        </Link>
      </div>
    </main>
  );
}
