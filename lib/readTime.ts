// Real read-time estimate from actual word count (~200 wpm), not a
// fabricated number.
export function getReadTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}