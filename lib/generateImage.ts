import { fetchWithRetry } from "./fetchWithRetry";

export async function generateImage(prompt: string): Promise<Buffer> {
  if (process.env.MOCK_MODE === "true") {
    return Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", "base64");
  }

  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true`;

  const res = await fetchWithRetry(url);
  if (!res.ok) throw new Error(`Pollinations request failed: ${res.status}`);

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}