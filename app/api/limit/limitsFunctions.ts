import { supabase } from "@/lib/supabaseClient";

export function getCurrentDay(): number {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const numberDate = Number(`${year}${month}${day}`);
    return numberDate;
}

export async function LimitReached(userId: string) {
    try {
        const { data, error } = await supabase
            .from('limit_controler')
            .select('*')
            .eq('user_id', userId)
            .eq('day', getCurrentDay());
        if (error) {
            console.log("Error checking limit:", error);
        }
        if (!error && data && data.length >= Number(process.env.LIMIT || 50)) {
            return true;
        }
    } catch (err) { }
    return false;
}

export async function stillHaveAccess(userId: string, contactId: string) {

    if (await LimitReached(userId)) {
        return false;
    }

    const { error } = await supabase.rpc("insert_if", {
        p_user_id: userId,
        p_day: getCurrentDay(),
        p_limit: Number(process.env.LIMIT || 50),
        p_contact_id: contactId,
    });
    if (error) {
        console.log("Error inserting limit record:", error);
    }
    return true;
}
