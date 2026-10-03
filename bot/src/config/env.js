require("dotenv").config();

module.exports = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  DATABASE_URL: process.env.DATABASE_URL,
  DASHBOARD_WS_URL: process.env.DASHBOARD_WS_URL || "http://localhost:4000",
  NODE_ENV: process.env.NODE_ENV || "development"
};
