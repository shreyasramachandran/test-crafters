export async function getCookie(cookieName: string) {
    try {
        const res = await fetch(`/api/cookies/get-cookie?cookieName=${cookieName}`, {
            method: "GET",
            headers: {
                "Cache-Control": "no-cache",
            }
        });
        // Ensure proper error handling
        if (!res.ok) {
            // Handle errors, e.g., return an error response
            return new Response(JSON.stringify({ error: "Error fetching cookie" }), {
                status: res.status,
                headers: { "Content-Type": "application/json" },
            });
        }
        const data = await res.json();
        const cookie = await data.cookie
        return cookie;

    } catch (error) {
        console.error('Error fetching cookie', error);
        return false;
    }
}

export async function setCookie(cookieName: string, cookieValue: string) {
    const res = await fetch(`/api/cookies/set-cookie?cookieName=${cookieName}&cookieValue=${cookieValue}`, {
        method: "GET",
        headers: {
            "Cache-Control": "no-cache",
        }
    });
    // Ensure proper error handling
    if (!res.ok) {
        // Handle errors, e.g., return an error response
        return new Response(JSON.stringify({ error: "Error setting cookie" }), {
            status: res.status,
            headers: { "Content-Type": "application/json" },
        });
    }
}