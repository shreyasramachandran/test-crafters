import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const cookieName = searchParams.get('cookieName') as string
        let cookieValue = searchParams.get('cookieValue') as string
        // Call a backend api to create a new session, it will also give you cookie value
        cookies().set({
            name: cookieName,
            value: cookieValue,
            path: '/',
            httpOnly: true,
            // domain: 'localhost',
            // secure: true, // Set to true if using HTTPS
            // sameSite: 'none', // Recommended for most use cases
            maxAge: 630720000
        })
        return new Response(JSON.stringify({ message: `Cookie ${cookieName} has been set` }), { status: 200 });
    }
    catch (error) {
        console.error("Error initiating session", error);
        return new Response(JSON.stringify({ error: "Error initiating session" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}