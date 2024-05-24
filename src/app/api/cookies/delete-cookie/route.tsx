import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'


export async function GET(request: NextRequest) {
    try {
        const domain = process.env.NEXT_PUBLIC_DOMAIN
        const searchParams = request.nextUrl.searchParams
        const cookieName = searchParams.get('cookieName') as string
        if (cookieName) {
            // Create a new cookie instance
            const cookie = cookies()
            // Delete the cookie by setting its expiration to a past date
            cookie.set(cookieName, '', {
                maxAge: -1,
                path: '/',
                domain: domain,
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            })
            return new Response(JSON.stringify({ message: `cookie ${cookieName} delete successfully` }), { status: 200 });
        }
        else {
            return new Response(JSON.stringify({ 'Error': 'No params found' }), { status: 500 });
        }
    } catch (error) {
        console.error("Error deleting cookie", error);
        return new Response(JSON.stringify({ 'error': "Error deleting cookie" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}