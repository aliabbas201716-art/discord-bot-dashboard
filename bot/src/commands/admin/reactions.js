const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reactionroles")
    .setDescription("Manage reaction roles."),
  async execute(interaction) {
    await interaction.reply({ content: "Reaction roles are managed from the dashboard.", ephemeral: true });
  }
};
