const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from the server")
    .addUserOption((option) => option.setName("user").setDescription("User to ban").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("Reason for the ban").setRequired(false)),
  async execute(interaction) {
    if (!interaction.memberPermissions.has(PermissionsBitField.Flags.BanMembers)) {
      return interaction.reply({ content: "You do not have permission to ban members.", ephemeral: true });
    }

    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") || "No reason provided";

    await interaction.guild.members.ban(user.id, { reason });
    await interaction.reply({ content: `Banned ${user.tag} for: ${reason}`, ephemeral: false });
  }
};
