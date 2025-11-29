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

    const { data, error } = await supabase.rpc("get_contact_by_id", {
        p_id: id
    });
    if (error) {
        console.log("Error fetching contact:", error);
        return NextResponse.json({ error: "internal server error" }, { status: 500 });
    }
    if (!data || data.length === 0) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json((data as any)[0]?.data ?? {}, {
        headers: process.env.NODE_ENV !== "development" ? { "Cache-Control": "public, max-age=600" } : {}
    });
}
