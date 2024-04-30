export async function POST(request: Request, context: any) {
    try {
        // Parsing JSON body from request
        const body = await request.json();
        const { accessToken } = body;
        console.log('Validating Token')

        // Make the token request to Google's OAuth 2.0 server
        const googleResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'no-store'
        });

        // Handle the response from Google
        if (!googleResponse.ok) {
            const errorResponse = await googleResponse.json();
            console.error('Google validation token error response:', errorResponse);
            throw new Error('Failed to validate token from Google');
        }

        const tokenInfoResponse = await googleResponse.json();
        return new Response(JSON.stringify(tokenInfoResponse), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });


    } catch (error) {
        console.error("Error in API route:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}