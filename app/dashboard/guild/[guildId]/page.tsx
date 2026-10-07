"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function GuildSettingsPage() {
  const params = useParams();
  const guildId = params.guildId as string;
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, [guildId]);

  const fetchConfig = async () => {
    try {
      const response = await fetch(`/api/guilds/${guildId}`);
      if (!response.ok) throw new Error("Failed to fetch config");
      const data = await response.json();
      setConfig(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const formData = new FormData(e.currentTarget);
      const updates = Object.fromEntries(formData);

      const response = await fetch(`/api/guilds/${guildId}/config`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error("Failed to update config");

      const updated = await response.json();
      setConfig(updated);
      alert("Settings updated and synced to bot!");
    } catch (err) {
      console.error(err);
      alert("Failed to update settings");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!config) return <div>Failed to load config</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Server Settings</h1>

      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Welcome Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Welcome System</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-2">Welcome Channel</label>
              <input
                type="text"
                name="welcomeChannel"
                defaultValue={config.welcomeChannel || ""}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white"
                placeholder="Channel ID"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">Welcome Message</label>
              <textarea
                name="welcomeMessage"
                defaultValue={config.welcomeMessage || ""}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white h-24"
                placeholder="Welcome message text"
              />
            </div>
          </div>
        </div>

        {/* Auto-Mod Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Auto-Moderation</h2>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="inviteFilter"
                defaultChecked={config.inviteFilter}
                className="w-4 h-4"
              />
              <span className="text-slate-300">Block invite links</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="mentionFilter"
                defaultChecked={config.mentionFilter}
                className="w-4 h-4"
              />
              <span className="text-slate-300">Block mass mentions</span>
            </label>

            <div>
              <label className="block text-sm text-slate-300 mb-2">Blacklisted Words (comma separated)</label>
              <textarea
                name="blacklistedWords"
                defaultValue={config.blacklistedWords?.join(", ") || ""}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white h-24"
                placeholder="word1, word2, word3"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Save & Sync to Bot
        </button>
      </form>
    </div>
  );
}
