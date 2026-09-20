import { generateEdition } from "@/lib/editions/generateEdition";
import { sendAlert } from "@/lib/alert";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const editionType = searchParams.get("type") as "morning" | "evening" | null;
  if (editionType !== "morning" && editionType !== "evening") {
    return Response.json({ error: "type param must be 'morning' or 'evening'" }, { status: 400 });
  }

  try {
    const result = await generateEdition(editionType);
    return Response.json(result);
  } catch (err) {
    await sendAlert(`🚨 Daymark: edition generation (${editionType}) failed: ${String(err)}`);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}