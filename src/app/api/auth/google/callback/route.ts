export async function POST(request: Request, context: any) {
    try {
        // Parsing JSON body from request
        const body = await request.json();
        const { code } = body;

        // Define your client credentials and redirect URI
        const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;
        const client_secret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string;
        const redirect_uri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI as string;

        // Prepare the data for the token request
        const params = new URLSearchParams();
        console.log('This is the code', code)
        params.append('code', code);
        params.append('client_id', client_id);
        params.append('client_secret', client_secret);
        params.append('redirect_uri', redirect_uri);
        params.append('grant_type', 'authorization_code');

        // Make the token request to Google's OAuth 2.0 server
        const googleResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            cache: 'no-store',
            body: params
        });



        // Handle the response from Google
        if (!googleResponse.ok) {
            const errorResponse = await googleResponse.json();
            console.error('Google token error response:', errorResponse);
            throw new Error('Failed to fetch token from Google');
        }

        const tokenData = await googleResponse.json();
        console.log('Token fetched successfully')

        // Return the token data to the client or handle accordingly
        return new Response(JSON.stringify(tokenData), {
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