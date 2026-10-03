const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("config")
    .setDescription("Configure your server settings"),
  async execute(interaction) {
    await interaction.reply({ content: "Server config is managed from the dashboard.", ephemeral: true });
  }
};
