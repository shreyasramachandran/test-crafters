import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { cookieName } = await request.json();
        const domain = process.env.NEXT_PUBLIC_DOMAIN;

        if (!cookieName) {
            return new NextResponse(JSON.stringify({ error: 'Missing cookie name' }), { status: 400 });
        }

        // Create a new cookie instance
        const cookie = cookies();
        // Delete the cookie by setting its expiration to a past date
        cookie.set(cookieName, '', {
            maxAge: -1,
            path: '/',
            domain: domain,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        return new NextResponse(JSON.stringify({ message: `cookie ${cookieName} deleted successfully` }), { status: 200 });
    } catch (error) {
        console.error("Error deleting cookie", error);
        return new NextResponse(JSON.stringify({ error: "Error deleting cookie" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
