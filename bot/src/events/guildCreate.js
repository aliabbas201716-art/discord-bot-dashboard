const guildRepo = require("./guildRepo");

module.exports = {
  name: "guildCreate",
  async execute(guild) {
    await guildRepo.upsertGuildConfig(guild.id, {
      guildId: guild.id,
      name: guild.name
    });
  }
};
