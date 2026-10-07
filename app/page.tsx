import Image from "next/image";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
          alt="Person working on a computer"
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-slate-950/80" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm text-blue-200">
            Discord Server Management
          </p>

          <h1 className="text-5xl font-black tracking-tight text-white md:text-7xl">
            Server Control Hub
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Manage moderation, welcome settings, auto-mod, reactions, and automation from a single dashboard.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="/api/auth/discord"
              className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-500"
            >
              Login with Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
