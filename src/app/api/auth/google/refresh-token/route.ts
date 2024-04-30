export async function POST(request: Request, context: any) {
    try {
        // Parsing JSON body from request
        const body = await request.json();
        const { refreshToken } = body; // Get the refresh token from the request body
        console.log('Refreshing Access Token');

        // Preparing the request for Google's OAuth 2.0 server to refresh the access token
        const url = 'https://oauth2.googleapis.com/token';
        const formData = new URLSearchParams();
        // Define your client id and client secret
        const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;
        const client_secret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string;

        formData.append('client_id', client_id);
        formData.append('client_secret', client_secret);
        formData.append('refresh_token', refreshToken);
        formData.append('grant_type', 'refresh_token');

        const googleResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString(),
            cache: 'no-store'
        });

        // Handle the response from Google
        const responseData = await googleResponse.json();

        if (!googleResponse.ok) {
            console.error('Google refresh token error response:', responseData);
            return new Response(JSON.stringify(responseData), {
                status: googleResponse.status,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        console.log('Access token refreshed successfully');
        return new Response(JSON.stringify({
            accessToken: responseData.access_token, // Include additional data as needed
            expiresIn: responseData.expires_in
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error("Error in refresh token API route:", error);
        return new Response(JSON.stringify({ error: "Internal server error", details: error }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
