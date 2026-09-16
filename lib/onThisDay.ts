// Fetches one "On This Day" historical event from Wikimedia's official,
// free, no-key REST API — used as masthead flavor content, clearly
// presented as trivia, not live data.
export async function getOnThisDay(): Promise<string | null> {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`,
      { next: { revalidate: 86400 } } // cache for a day, no point refetching more often
    );
    if (!res.ok) return null;

    const data = await res.json();
    const events = data.events;
    if (!events || events.length === 0) return null;

    // Pick a random one so it's not the same entry all day for every visitor
    const pick = events[Math.floor(Math.random() * events.length)];
    return `${pick.year} — ${pick.text}`;
  } catch {
    return null; // fail quietly; this is decoration, not critical content
  }
}