
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { auth } from '@clerk/nextjs/server';
import { LimitReached } from '../../limit/limitsFunctions';

function normalizeWhitespace(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
}

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const limitReached = await LimitReached(userId);

  if (limitReached) {
    return NextResponse.json({ error: "limit_exceeded" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query") || "";
  const index = searchParams.get("index") || 0;
  const filter = searchParams.get("filter") || "";
  if (    Number(index) < 0) {
    return NextResponse.json({ error: "Invalid query or index" }, { status: 400 });
  }

  const { data, error } = await supabase.rpc("get_contacts", {
    p_query: query || "",
    p_from: Number(index) * (Number(process.env.PAGE_SIZE) || 10),
    p_to: Number(index) * (Number(process.env.PAGE_SIZE) || 10) + (Number(process.env.PAGE_SIZE) || 10) - 1,
    p_filter: filter == "agency"
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data: data.map(((e: any) => e.data)), length: data[0]?.length || 0 }, {
    headers: process.env.NODE_ENV !== "development" ? { "Cache-Control": "public, max-age=600" } : {}
  });
}
