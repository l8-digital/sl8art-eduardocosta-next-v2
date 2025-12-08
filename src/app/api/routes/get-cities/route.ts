import { NextResponse } from "next/server";
import { getCities } from "@/server/cities";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const stateId = searchParams.get('stateId');

    if (!stateId) {
        return NextResponse.json({ error: 'stateId query parameter is required' }, { status: 400 });
    }

    try {
        const cities = await getCities(stateId);
        return NextResponse.json(cities, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 });
    }
}
