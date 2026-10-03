const fs = require("fs");
const path = require("path");

function loadCommands(client) {
  const commandsDir = path.join(__dirname, "../commands");
  const commandFiles = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".js")) commandFiles.push(full);
    }
  }

  walk(commandsDir);

  for (const file of commandFiles) {
    const command = require(file);
    client.commands.set(command.data.name, command);
  }
}

module.exports = loadCommands;
