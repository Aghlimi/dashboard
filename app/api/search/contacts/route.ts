
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

function normalizeWhitespace(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query") || "";

  const { data, error } = await supabase
    .from("contacts")
    .select("first_name, last_name, id");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if(query || query.trim() !== "") {
    const normalizedQuery = normalizeWhitespace(query).toLowerCase();
    const filteredData = data?.filter(contact => {
      const fullName = `${contact.first_name} ${contact.last_name}`;
      const normalizedFullName = normalizeWhitespace(fullName).toLowerCase();
      return normalizedFullName.includes(normalizedQuery);
    });
    return NextResponse.json(filteredData);
  }

  return NextResponse.json(data);
}
