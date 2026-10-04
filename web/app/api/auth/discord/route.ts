const { NextResponse } = require("next/server");

export async function GET() {
  const clientId = process.env.DISCORD_AUTH_CLIENT_ID;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;
  const scope = "identify guilds";

  const url = new URL("https://discord.com/api/oauth2/authorize");
  url.searchParams.set("client_id", clientId || "");
  url.searchParams.set("redirect_uri", redirectUri || "");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", scope);

  return NextResponse.redirect(url.toString());
}
