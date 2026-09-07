export async function generateImage(prompt: string): Promise<Buffer> {
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&nologo=true`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Pollinations request failed: ${res.status}`);

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}