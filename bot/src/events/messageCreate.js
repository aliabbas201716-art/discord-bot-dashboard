const guildRepo = require("../database/repository/guildRepo");
const autoModService = require("../services/autoModService");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot || !message.guild) return;

    const guildConfig = await guildRepo.getGuildConfig(message.guild.id);
    if (!guildConfig) return;

    const autoModResult = await autoModService.run(message, guildConfig);
    if (autoModResult?.punished) return;

    const content = message.content.toLowerCase();
    if (content.includes("hello")) {
      await message.reply("Hey there! Welcome to the server.");
    }
  }
};
