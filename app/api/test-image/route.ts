import { searchEditorialImage } from "@/lib/images/getEditorialImage";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "technology";
  const category = searchParams.get("category") || "technology";

  const result = await searchEditorialImage(query, category);
  return Response.json(result);
}