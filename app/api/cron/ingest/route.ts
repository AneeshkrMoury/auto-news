import { supabase } from "@/lib/supabase";
import { SOURCE_REGISTRY } from "@/lib/sources/registry";
import { syncSourceRegistry } from "@/lib/sources/syncRegistry";
import { ingestSource } from "@/lib/ingestion/ingest";
import { sendAlert } from "@/lib/alert";

export const maxDuration = 60;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await syncSourceRegistry();

    const { data: sources } = await supabase.from("sources").select("*").eq("active", true);
    if (!sources) return Response.json({ error: "No sources found" });

    const results = [];
    for (const dbSource of sources) {
      const registrySource = SOURCE_REGISTRY.find((s) => s.name === dbSource.name);
      if (!registrySource) continue;
      results.push(await ingestSource(registrySource, dbSource.id));
    }

    return Response.json(results);
  } catch (err) {
    await sendAlert(`🚨 Daymark: ingestion failed: ${String(err)}`);
    return Response.json({ error: String(err) }, { status: 500 });
  }
}