import { publishCategory } from "@/lib/publish";

export async function GET() {
  const results = await publishCategory("sports");
  return Response.json(results);
}