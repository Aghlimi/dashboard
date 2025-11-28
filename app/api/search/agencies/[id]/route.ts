import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const { data, error } = await supabase
        .from('agencies')
        .select('*')
        .eq('id', id);
    if(data && data.length == 0) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (error) {
        console.log("Supabase error:", error.message);
        return NextResponse.json({ error: "internal server error" }, { status: 500 });
    }

    return NextResponse.json(data[0]);
}
