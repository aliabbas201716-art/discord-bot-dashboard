export async function fetchFromBot(path: string, options?: RequestInit) {
  const botApiUrl = process.env.BOT_API_URL || "http://localhost:3001";
  const url = `${botApiUrl}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-API-Secret": process.env.BOT_API_SECRET || "",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Bot API error: ${response.statusText}`);
  }

  return response.json();
}
