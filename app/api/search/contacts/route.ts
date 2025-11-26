
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
  const index = searchParams.get("index") || "";

  const { data, error } = await supabase
    .from("contacts")
    .select("first_name, last_name, id");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (query || query.trim() !== "") {
    const normalizedQuery = normalizeWhitespace(query).toLowerCase();
    const filteredData = data?.filter(contact => {
      const fullName = `${contact.first_name} ${contact.last_name}`;
      const normalizedFullName = normalizeWhitespace(fullName).toLowerCase();
      return normalizedFullName.includes(normalizedQuery);
    });
    return NextResponse.json({ data: filteredData.splice(Number(index) * 10, Number(index) * 10 + 9), length: filteredData?.length || 0 });
  }

  return NextResponse.json({ data:data.slice(Number(index) * 10, Number(index) * 10 + 9) ,length: data?.length || 0});
}
