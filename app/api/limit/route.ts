import { supabase } from "@/lib/supabaseClient";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default async function limitExceed() {

    function getCurrentDay(): number {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const numberDate = Number(`${year}${month}${day}`);
        return numberDate;
    }

    const { userId } = await auth();
    if (!userId) {
        return false;
    }
    const { data: s, error: c } = await supabase
        .from('limit_controler')
        .select('*');
    if (c) {
        return false;
    }
    if (s.length >= Number(process.env.LIMIT || 50)) {
        return false;
    }

    let { data, error } = await supabase.rpc("insert_limit_if_under", {
        p_user_id: userId,
        p_day: getCurrentDay(),
        p_limit: Number(process.env.LIMIT || 50)
    });
    return true;
}

export async function GET() {
    const allowed = await limitExceed();
    if (allowed) {
        return NextResponse.json({ message: "Allowed" });
    } else {
        return NextResponse.json({ message: "Limit Exceeded" });
    }
}