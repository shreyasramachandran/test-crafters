import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'


export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const cookieName = searchParams.get('cookieName') as string
        if (cookieName) {
            cookies().delete(cookieName)
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