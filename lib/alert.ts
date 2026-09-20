// Sends a Telegram message on pipeline failure. Fails silently if the
// alert itself can't send — never let alerting break the actual job.
export async function sendAlert(message: string) {
  try {
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
      }),
    });
  } catch {
    // intentionally swallowed — alerting failure shouldn't cascade
  }
}