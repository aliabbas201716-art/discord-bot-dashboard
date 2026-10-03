const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("automod")
    .setDescription("Manage auto moderation settings."),
  async execute(interaction) {
    await interaction.reply({ content: "Auto moderation is configured from the dashboard.", ephemeral: true });
  }
};
