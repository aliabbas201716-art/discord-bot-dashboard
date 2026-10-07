# Discord Bot Web Dashboard

A production-ready web dashboard for managing Discord bot server settings with live synchronization.

## Features

- **Discord OAuth2 Authentication**: Secure login via Discord
- **Real-time Settings Sync**: Changes to server settings instantly propagate to the bot
- **Multi-server Management**: View and manage all servers you have admin access to
- **Moderation Dashboard**: View logs and moderation actions
- **Auto-Mod Configuration**: Customize filters and blacklisted words
- **Welcome/Goodbye System**: Design custom join and leave messages
- **Reaction Roles**: Create self-service role assignment menus
- **Starboard**: Configure message showcase channels
- **Suggestions & Appeals**: Review user submissions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18 + Tailwind CSS
- **Auth**: NextAuth.js v5 with Discord provider
- **Database**: PostgreSQL with Prisma ORM
- **Real-time Sync**: REST API + Socket.IO
- **Type Safety**: TypeScript

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 16+
- Discord Developer Application
- Bot Repo running (for API endpoints)

### Environment Setup

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Fill in your Discord OAuth credentials:

```env
# Get these from Discord Developer Portal
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
DISCORD_REDIRECT_URI=http://localhost:3000/api/auth/callback

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/botdb"

# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your-generated-secret

# Bot API for sync
BOT_API_URL=http://localhost:3001
```

3. Install dependencies:

```bash
npm install
```

4. Run migrations:

```bash
npx prisma migrate dev --name init
```

5. Start the dev server:

```bash
npm run dev
```

Visit `http://localhost:3000`

## Discord OAuth Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a New Application
3. Go to OAuth2 → General
4. Copy **Client ID** and **Client Secret**
5. Add Redirect URL: `http://localhost:3000/api/auth/callback`
6. Add to `.env.local`

## Database Schema

See `prisma/schema.prisma` for the full schema.

Key models:
- `GuildConfig` - Server settings
- `Warning` - User warnings and moderation history
- `DashboardUser` - Dashboard user sessions
- `LogEntry` - Event logs

## API Routes

- `POST /api/auth/signin` - Login with Discord
- `GET /api/guilds` - Get user's guilds
- `GET /api/guilds/[guildId]` - Get guild config
- `POST /api/guilds/[guildId]/config` - Update guild settings
- `GET /api/guilds/[guildId]/logs` - Get moderation logs
- `POST /api/guilds/[guildId]/sync` - Sync settings to bot

## Real-time Sync

When a user updates server settings in the dashboard:

1. Changes are saved to PostgreSQL
2. API triggers a POST to `/bot-api/sync/guild-config`
3. Bot receives update and invalidates its config cache
4. Bot reloads config from database
5. New rules take effect immediately

No bot restart required.

## Deployment

### Docker

```bash
docker build -t discord-bot-dashboard .
docker run -p 3000:3000 --env-file .env discord-bot-dashboard
```

### Vercel

```bash
npm i -g vercel
vercel
```

### Railway

```bash
railway login
railway link
railway up
```

## Project Structure

```
app/
├─ api/
│  ├─ auth/              # NextAuth routes
│  │  ├─ [...nextauth]/route.ts
│  │  └─ discord/route.ts
│  ├─ guilds/            # Guild API
│  │  ├─ route.ts
│  │  └─ [guildId]/
│  │     ├─ config/route.ts
│  │     ├─ logs/route.ts
│  │     └─ sync/route.ts
│  └─ sync/              # Bot sync endpoint
│     └─ route.ts
├─ (auth)/              # Auth pages
│  └─ login/page.tsx
├─ dashboard/           # Dashboard pages
│  ├─ page.tsx
│  ├─ layout.tsx
│  ├─ guilds/page.tsx
│  └─ [guildId]/
│     ├─ page.tsx
│     ├─ settings/page.tsx
│     ├─ moderation/page.tsx
│     ├─ auto-mod/page.tsx
│     └─ welcome/page.tsx
├─ layout.tsx
├─ page.tsx             # Homepage with auth
└─ globals.css

components/
├─ auth/
│  └─ DiscordLoginButton.tsx
├─ dashboard/
│  ├─ Sidebar.tsx
│  ├─ GuildCard.tsx
│  ├─ SettingsForm.tsx
│  ├─ ModerationPanel.tsx
│  ├─ AutoModPanel.tsx
│  ├─ WelcomePanel.tsx
│  └─ ReactionRolesPanel.tsx
└─ ui/
   ├─ Button.tsx
   ├─ Input.tsx
   ├─ Card.tsx
   └─ Modal.tsx

lib/
├─ auth.ts              # NextAuth config
├─ discord.ts           # Discord API helpers
├─ db.ts                # Prisma client
├─ fetcher.ts           # API fetch wrapper
└─ utils.ts

middleware.ts           # Auth middleware
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT
