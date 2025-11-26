import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { auth } from '@clerk/nextjs/server';
import { stillHaveAccess } from '@/app/api/limit/limitsFunctions';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const access = await stillHaveAccess(userId, id);
    if (!access) {
        return NextResponse.json({ error: "limit_exceeded" }, { status: 403 });
    }

    const { data: contact, error: err1 } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', id)
        .single();
    if (err1) {
        console.log("Error fetching contact:", err1);
        return NextResponse.json({ error: err1.message }, { status: 500 });
    }
    if (!contact ) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    let agency = null;
    if (contact?.agency_id) {
        const { data: agencyData, error: err2 } = await supabase
            .from('agencies')
            .select('name')
            .eq('id', contact.agency_id)
            .maybeSingle();
        if (err2) {
            console.log("Error fetching agency:", err2);
            return NextResponse.json({ error: err2.message }, { status: 500 });
        }
        agency = agencyData;
    }

    const result = { ...contact, agency_name: agency?.name ?? null };
    return NextResponse.json(result);
}
