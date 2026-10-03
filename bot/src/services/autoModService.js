async function run(message, config) {
  const content = (message.content || "").toLowerCase();

  if (config.inviteFilter && /(discord\.gg|discordapp\.com\/invite|discord\.com\/invite)/i.test(content)) {
    await punish(message, "Invite links are not allowed.");
    return { punished: true };
  }

  if (config.blacklistedWords?.some((word) => content.includes(word.toLowerCase()))) {
    await punish(message, "Blacklisted word detected.");
    return { punished: true };
  }

  const mentionCount = (content.match(/@everyone|@here/g) || []).length;
  if (config.mentionFilter && mentionCount >= 3) {
    await punish(message, "Mass mentions are not allowed.");
    return { punished: true };
  }

  return { punished: false };
}

async function punish(message, reason) {
  try {
    await message.delete();
  } catch (err) {}

  if (message.member) {
    try {
      await message.member.timeout(60_000, reason);
    } catch (err) {}
  }
}

module.exports = { run, punish };
