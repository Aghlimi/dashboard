
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query") || "";
  const { data, error } = await supabase
    .from("agencies")
    .select("*")
    .ilike("name", `%${query}%`);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
