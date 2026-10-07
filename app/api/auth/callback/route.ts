import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/?error=missing_code", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
    );
  }

  const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID || "",
      client_secret: process.env.DISCORD_CLIENT_SECRET || "",
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI || "",
    }),
  });

  if (!tokenResponse.ok) {
    return NextResponse.redirect(
      new URL("/?error=oauth_failed", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
    );
  }

  const tokenData = await tokenResponse.json();

  const userResponse = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  if (!userResponse.ok) {
    return NextResponse.redirect(
      new URL("/?error=user_fetch_failed", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
    );
  }

  const user = await userResponse.json();

  const cookieStore = await cookies();
  cookieStore.set(
    "discord_session",
    JSON.stringify({
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_at: Date.now() + tokenData.expires_in * 1000,
    }),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    }
  );

  return NextResponse.redirect(
    new URL("/dashboard", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
  );
}
