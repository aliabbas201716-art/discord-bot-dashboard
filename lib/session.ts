import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("discord_session")?.value;

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
