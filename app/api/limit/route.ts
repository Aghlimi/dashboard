import { LimitReached } from "./limitsFunctions";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET() {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const allowed = await LimitReached(userId);

    if (!allowed) {
        return NextResponse.json({ message: "Allowed" });
    } else {
        return NextResponse.json({ message: "Limit Exceeded" });
    }
}