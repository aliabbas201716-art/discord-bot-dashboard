"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

interface Guild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
}

export default function GuildsPage() {
  const { data: session, status } = useSession();
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/");
    }

    if (status !== "authenticated") return;

    fetchGuilds();
  }, [status]);

  const fetchGuilds = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/guilds");
      if (!response.ok) throw new Error("Failed to fetch guilds");
      const data = await response.json();
      setGuilds(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch guilds");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">My Servers</h1>

      {error && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 mb-6 text-red-400">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center text-slate-400 py-12">
          Loading your servers...
        </div>
      )}

      {!loading && guilds.length === 0 && (
        <div className="text-center text-slate-400 py-12">
          <p>You don't have access to any servers with the bot.</p>
          <p className="text-sm mt-2">Invite the bot to your server and make sure you're an admin.</p>
        </div>
      )}

      {!loading && guilds.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guilds.map((guild) => (
            <a
              key={guild.id}
              href={`/dashboard/guild/${guild.id}`}
              className="group bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-blue-600 hover:bg-slate-800 transition"
            >
              <div className="flex items-center gap-4">
                {guild.icon ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                      alt={guild.name}
                      width={48}
                      height={48}
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-sm font-semibold">
                    {guild.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition">
                    {guild.name}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {guild.owner ? "Owner" : "Admin"}
                  </p>
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-400">
                → Manage Settings
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
