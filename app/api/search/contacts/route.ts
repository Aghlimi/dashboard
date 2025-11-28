
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
  const filter = searchParams.get("filter") || "";

  const { data, error } = await supabase.rpc("contacts_with_agency", {
    filter_with_agency: filter === "agency"
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (query || query.trim() !== "") {
    const normalizedQuery = normalizeWhitespace(query).toLowerCase();
    const filteredData = data?.filter((contact: any) => {
      const fullName = `${contact.first_name} ${contact.last_name}`;
      const normalizedFullName = normalizeWhitespace(fullName).toLowerCase();
      return normalizedFullName.includes(normalizedQuery);
    });
    const pageData = filteredData.slice(Number(index) * (Number(process.env.PAGE_SIZE) || 10), Number(index) * (Number(process.env.PAGE_SIZE) || 10) + (Number(process.env.PAGE_SIZE) || 10));
    return NextResponse.json(
      {
        data: pageData,
        length: filteredData?.length || 0
      });
  }
  const pageData = data.slice(Number(index) * (Number(process.env.PAGE_SIZE) || 10), Number(index) * (Number(process.env.PAGE_SIZE) || 10) + (Number(process.env.PAGE_SIZE) || 10));
  return NextResponse.json({ data: pageData, length: data?.length || 0 }, {
    headers: { "Cache-Control": "public, max-age=600" }
  });
}
