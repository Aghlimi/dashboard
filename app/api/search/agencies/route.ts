
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query") || "";
  const index = searchParams.get("index") || 0;
  const { data, error } = await supabase
    .from("agencies")
    .select("name, id")
    .ilike("name", `%${query}%`);
  if (error) {
    console.log("Error fetching agencies:", error);
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }

  return NextResponse.json({
    data: data?.slice(Number(index) * 10, Number(index) * 10 + 9) || [],
    length: data?.length || 0
  }, {
    headers: { "Cache-Control": "public, max-age=10000" }
  });
}
