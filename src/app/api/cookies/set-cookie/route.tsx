import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { cookieName, cookieValue } = await request.json();
        const domain = process.env.NEXT_PUBLIC_DOMAIN;

        if (!cookieName || !cookieValue) {
            return new NextResponse(JSON.stringify({ error: 'Missing cookie name or value' }), { status: 400 });
        }

        cookies().set({
            name: cookieName,
            value: cookieValue,
            path: '/',
            // httpOnly: true,
            domain: domain,
            // secure: true, // Set to true if using HTTPS
            // sameSite: 'none', // Recommended for most use cases
            maxAge: 630720000,
        });

        return new NextResponse(JSON.stringify({ message: `Cookie ${cookieName} has been set` }), { status: 200 });
    } catch (error) {
        console.error("Error setting cookie", error);
        return new NextResponse(JSON.stringify({ error: "Error setting cookie" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
