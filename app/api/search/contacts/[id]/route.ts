import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data: contact, error: err1 } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', id)
        .single();
    if (err1) {
        console.log("Error fetching contact:", err1);
        return NextResponse.json({ error: err1.message }, { status: 500 });
    }

    let agency = null;
    if (contact?.agency_id) {
        const { data: agencyData, error: err2 } = await supabase
            .from('agencies')
            .select('name')
            .eq('id', contact.agency_id)
            .maybeSingle();
        console.log("Error fetching agency:", err2);
        if (err2)
            return NextResponse.json({ error: err2.message }, { status: 500 });
        agency = agencyData;
    }

    const result = { ...contact, agency_name: agency?.name ?? null };
    return NextResponse.json(result);
}
