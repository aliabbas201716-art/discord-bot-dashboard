# Circle-Inspired Discord Bot & Dashboard

A production-ready Discord bot with a modern web dashboard for server management, inspired by Circle Bot.

## Features

### 🤖 Bot Features
- **Moderation Suite**: Kick, ban, soft-ban, mute, timeout, warn commands
- **Auto-Moderation**: Spam detection, invite link filtering, mass mention prevention, blacklisted words
- **Event Logging**: Track deleted messages, edits, role updates, member activities
- **Welcome/Goodbye**: Customizable welcome and goodbye messages with auto-role assignment
- **Reaction Roles**: Interactive message menus for self-service role assignment
- **Starboard**: Showcase popular messages when they reach a threshold
- **Suggestions**: Discord modal-based suggestion system
- **Auto-Responders**: Keyword-triggered automated responses
- **Forms & Appeals**: Web-based form submissions for ban appeals and applications

### 🎨 Dashboard Features
- **Discord OAuth2 Authentication**: Secure login via Discord
- **Guild Management**: View and manage all authorized servers
- **Settings Panel**: Configure bot behavior per server
- **Moderation Dashboard**: View logs and manage moderation actions
- **Auto-Mod Configuration**: Customize filters and rules
- **Welcome Setup**: Design welcome/goodbye messages
- **Reaction Role Manager**: Create and manage reaction roles
- **Starboard Settings**: Configure starboard thresholds
- **Suggestions Queue**: Review and manage suggestions
- **Forms & Appeals**: Review user submissions

## Tech Stack

### Backend
- **Runtime**: Node.js 20
- **Bot Library**: discord.js v14
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Discord OAuth2

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Cache**: Redis (optional)

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- Discord Developer Application
- Docker & Docker Compose (optional)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/aliabbas201716-art/discord-bot-dashboard.git
   cd discord-bot-dashboard
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Discord bot token and OAuth credentials
   ```

3. **Install dependencies**
   ```bash
   cd bot && npm install
   cd ../web && npm install
   ```

4. **Setup database**
   ```bash
   # Start PostgreSQL (or use Docker Compose)
   docker-compose up -d postgres
   
   # Run migrations
   npx prisma migrate dev --name init
   ```

5. **Start the bot**
   ```bash
   cd bot
   npm run dev
   ```

6. **Start the dashboard**
   ```bash
   cd web
   npm run dev
   ```

Visit `http://localhost:3000` and login with Discord.

## Docker Deployment

```bash
docker-compose up --build
```

This will start:
- PostgreSQL database
- Redis cache
- Discord bot
- Web dashboard on port 3000

## Project Structure

```
.
├── bot/                    # Discord bot source
│   ├── src/
│   │   ├── index.js       # Bot entry point
│   │   ├── config/        # Environment config
│   │   ├── database/      # Database operations
│   │   ├── events/        # Discord event handlers
│   │   ├── commands/      # Bot commands
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utilities
│   └── package.json
├── web/                    # Next.js dashboard
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── dashboard/     # Dashboard pages
│   │   └── (auth)/        # Auth pages
│   ├── components/        # Reusable components
│   ├── lib/              # Utilities
│   └── package.json
├── prisma/
│   └── schema.prisma      # Database schema
├── docker-compose.yml
├── .env.example
└── README.md
```

## Configuration

See [SETUP.md](docs/SETUP.md) for detailed setup instructions.

See [ARCHITECTURE.md](docs/ARCHITECTURE.md) for architecture documentation.

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for production deployment guide.

## Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit your changes: `git commit -m 'Add amazing feature'`
3. Push to the branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.

## Roadmap

- [ ] Real-time dashboard sync via WebSocket
- [ ] Advanced analytics and statistics
- [ ] Custom command builder
- [ ] Multi-language support
- [ ] Mobile-friendly dashboard
- [ ] Premium features and subscriptions
- [ ] Community templates

## Acknowledgments

Inspired by Circle Bot. Built with ❤️ by the community.
