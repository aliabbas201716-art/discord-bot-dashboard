const { EmbedBuilder } = require("discord.js");

function successEmbed(title, description) {
  return new EmbedBuilder().setTitle(title).setDescription(description).setColor("#22c55e");
}

function errorEmbed(title, description) {
  return new EmbedBuilder().setTitle(title).setDescription(description).setColor("#ef4444");
}

module.exports = {
  successEmbed,
  errorEmbed
};
