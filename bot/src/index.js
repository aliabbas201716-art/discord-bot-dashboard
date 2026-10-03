const { Client, GatewayIntentBits, Partials } = require("discord.js");
const env = require("./config/env");
const db = require("./database/connect");
const loadEvents = require("./events");
const loadCommands = require("./commands");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User]
});

client.commands = new Map();
client.cooldowns = new Map();
client.guildConfigCache = new Map();

async function boot() {
  try {
    await db.connect();
    await loadEvents(client);
    await loadCommands(client);
    await client.login(env.DISCORD_TOKEN);
  } catch (error) {
    console.error("Failed to boot Discord bot:", error);
    process.exit(1);
  }
}

boot();
