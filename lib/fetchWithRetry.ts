export async function fetchWithRetry(url: string, options?: RequestInit, retries = 1): Promise<Response> {
  try {
    return await fetch(url, options);
  } catch (err) {
    if (retries <= 0) throw err;
    await new Promise((r) => setTimeout(r, 1000));
    return fetchWithRetry(url, options, retries - 1);
  }
}