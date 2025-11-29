
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

  const {data,error} = await supabase.rpc("get_agencies", {
    p_query: query || "",
    p_from: from,
    p_to: to,
    p_filter: filter || null
  });
  if (error) {
    console.log("Supabase error:", error.message);
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
  return NextResponse.json({
    data: data.map(((e: any) => e.data)) || [],
    length: data[0]?.length || 0
  }, {
    headers: process.env.NODE_ENV !== "development" ? { "Cache-Control": "public, max-age=600" } : {}
  });
}
