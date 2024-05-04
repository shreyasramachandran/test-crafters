import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check if there's an existing session cookie
    let sessionCookie = request.cookies.get('session')
    console.log(sessionCookie)

    // If no session cookie exists, generate a new session ID
    // Also put condition for if it has expired
    if (!sessionCookie) {
        const response = NextResponse.next()
        response.cookies.set({
            name: 'session',
            value: Math.random().toString(36).substring(7), // Generate a random session IDx
            path: '/',
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
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ],
}
