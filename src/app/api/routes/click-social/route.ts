import { NextResponse } from "next/server";
import { socialClick } from "@/server/socialClick";

export async function POST(request: Request) {
    try {
        const click = await request.json();

        if (!click) {
            return NextResponse.json({ error: 'Click parameter is required' }, { status: 400 });
        }

        await socialClick( click );

        return NextResponse.json({ message: 'Click registered successfully' }, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to register click' }, { status: 500 });
    }
}
