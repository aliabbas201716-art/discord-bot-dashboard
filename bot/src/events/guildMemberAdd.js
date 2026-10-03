const guildRepo = require("../database/repository/guildRepo");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const guildConfig = await guildRepo.getGuildConfig(member.guild.id);
    if (!guildConfig) return;

    if (guildConfig.autoRoleIds?.length) {
      for (const roleId of guildConfig.autoRoleIds) {
        const role = member.guild.roles.cache.get(roleId);
        if (role) await member.roles.add(role).catch(() => {});
      }
    }

    if (guildConfig.welcomeChannel) {
      const channel = member.guild.channels.cache.get(guildConfig.welcomeChannel);
      if (channel) {
        const embed = new EmbedBuilder()
          .setTitle("Welcome!")
          .setDescription(guildConfig.welcomeMessage || `Welcome ${member.user.username} to the server!`)
          .setThumbnail(member.user.displayAvatarURL())
          .setColor("#4f46e5");

        await channel.send({ embeds: [embed] });
      }
    }
  }
};
