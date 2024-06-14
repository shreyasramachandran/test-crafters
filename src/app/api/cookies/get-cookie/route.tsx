import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { cookieName } = await request.json();

        if (cookieName) {
            const cookie = cookies().get(cookieName);
            return new NextResponse(JSON.stringify({ cookie: cookie }), { status: 200 });
        } else {
            return new NextResponse(JSON.stringify({ error: 'No cookie name provided' }), { status: 400 });
        }
    } catch (error) {
        console.error("Error retrieving cookie", error);
        return new NextResponse(JSON.stringify({ error: "Error retrieving cookie" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
