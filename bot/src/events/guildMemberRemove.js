const guildRepo = require("../database/repository/guildRepo");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  async execute(member) {
    const guildConfig = await guildRepo.getGuildConfig(member.guild.id);
    if (!guildConfig) return;

    if (guildConfig.goodbyeChannel) {
      const channel = member.guild.channels.cache.get(guildConfig.goodbyeChannel);
      if (channel) {
        const embed = new EmbedBuilder()
          .setTitle("Goodbye!")
          .setDescription(guildConfig.goodbyeMessage || `${member.user.username} left the server.`)
          .setColor("#ef4444");

        await channel.send({ embeds: [embed] });
      }
    }
  }
};
