"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await signIn("discord", { redirect: true, callbackUrl: "/dashboard" });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&h=900&fit=crop"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-85"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Logo/Title */}
          <div className="space-y-4">
            <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Server Control Hub
            </div>
            <p className="text-xl text-slate-300">
              Manage your Discord server settings, moderation, and automations from one powerful dashboard
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 hover:bg-slate-700/50 transition">
              <div className="text-2xl mb-2">⚙️</div>
              <h3 className="font-semibold mb-2">Server Settings</h3>
              <p className="text-sm text-slate-400">Configure welcome messages, auto-roles, and more</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 hover:bg-slate-700/50 transition">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="font-semibold mb-2">Moderation</h3>
              <p className="text-sm text-slate-400">Auto-mod, warnings, and comprehensive logging</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 hover:bg-slate-700/50 transition">
              <div className="text-2xl mb-2">✨</div>
              <h3 className="font-semibold mb-2">Live Sync</h3>
              <p className="text-sm text-slate-400">Changes take effect instantly without restart</p>
            </div>
          </div>

          {/* Login Button */}
          <div className="pt-8">
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.975 14.975 0 0 0 1.293-2.1a.07.07 0 0 0-.038-.098a13.11 13.11 0 0 1-1.872-.892a.072.072 0 0 1-.007-.12a10.4 10.4 0 0 0 .372-.294a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.294a.072.072 0 0 1-.006.12a12.977 12.977 0 0 1-1.873.892a.07.07 0 0 0-.038.098a14.998 14.998 0 0 0 1.293 2.1a.078.078 0 0 0 .084.028a19.963 19.963 0 0 0 6.002-3.03a.079.079 0 0 0 .033-.057c.5-4.572-.838-8.548-3.632-12.066a.06.06 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-.968-2.157-2.156c0-1.193.93-2.157 2.157-2.157c1.226 0 2.157.964 2.157 2.157c0 1.188-.931 2.156-2.157 2.156zm7.975 0c-1.183 0-2.157-.968-2.157-2.156c0-1.193.93-2.157 2.157-2.157c1.226 0 2.157.964 2.157 2.157c0 1.188-.931 2.156-2.157 2.156z"/>
              </svg>
              {isLoading ? "Logging in..." : "Login with Discord"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
