import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'


export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const cookieName = searchParams.get('cookieName') as string
        if (cookieName) {
            const cookie = cookies().get(cookieName)
            return new Response(JSON.stringify({ 'cookie': cookie }), { status: 200 });
        }
        else {
            return new Response(JSON.stringify({ 'Error': 'No params found' }), { status: 500 });
        }

    } catch (error) {
        console.error("Error retrieving access token", error);
        return new Response(JSON.stringify({ 'error': "Error retrieving access token" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}