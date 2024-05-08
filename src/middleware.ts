import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    async function createSession() {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

            // Your fetch request
            const res = await fetch(`${baseUrl}/create-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });
            // Ensure proper error handling
            if (!res.ok) {
                // Handle errors, e.g., return an error response
                throw new Error(`HTTP error, status = ${res.status}`);
            }
            // Extract sessionId and send it
            const sessionId = res.headers.getSetCookie()[0].split(';')[0].split('=')[1];
            return sessionId
        }
        catch (error) {
            // Handle other errors
            console.error("Error creating session", error);
            throw error;
        }
    }

    // Check if there's an existing sessionId
    let sessionId = request.cookies.get('sessionId')?.value as string
    // If no session cookie exists, generate a new session session and store its id as a cookie
    if (!sessionId) {
        sessionId = await createSession()
        console.log('sessionId', sessionId)
        // SessionId is sent via http cookies
        const response = NextResponse.next()
        response?.cookies.set({
            name: 'sessionId',
            value: sessionId, // Generate a random session IDx
            path: '/',
            domain: 'localhost',
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: 'none', // Recommended for most use cases
            maxAge: 630720000
        })
        return response
    }
    // If a session cookie already exists, simply return the original request
    return NextResponse.next()
}
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images (images used in the application)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|images).*)'
    ],
}
