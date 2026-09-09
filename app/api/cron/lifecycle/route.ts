import { updateLifecycle } from "@/lib/updateLifecycle";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const result = await updateLifecycle();
  return Response.json(result);
}