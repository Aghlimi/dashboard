
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query") || "";
  const index = searchParams.get("index") || 0;
  const filter = searchParams.get("filter") || "";
  const page = Math.max(0, Number(index));
  const from = page * (Number(process.env.PAGE_SIZE) || 10);
  const to = -1 + from + (Number(process.env.PAGE_SIZE) || 10);
  let queryBuilder = supabase
    .from("agencies")
    .select("name, id, state, type", { count: "exact" })
    .ilike("name", `%${query}%`)
    .range(from, to);

  if (filter.trim().length > 0 && (filter.trim() =='City' || filter.trim() =='County')) {
    queryBuilder = queryBuilder.eq("type", filter.trim());
  }
  const { data, error, count } = await queryBuilder;

  if (error) {
    console.log("Supabase error:", error.message);
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
  console.log("first id", data?.[0]?.id);
  return NextResponse.json({
    data: data || [],
    length: count ?? 0
  }, {
    headers: { "Cache-Control": "public, max-age=600" }
  });
}
