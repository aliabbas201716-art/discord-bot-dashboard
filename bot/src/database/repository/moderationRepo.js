const { prisma } = require("../database/connect");

async function addWarning(guildId, userId, moderatorId, reason, type = "warn") {
  return prisma.warning.create({
    data: {
      guildId,
      userId,
      moderatorId,
      reason,
      type
    }
  });
}

module.exports = {
  addWarning
};
