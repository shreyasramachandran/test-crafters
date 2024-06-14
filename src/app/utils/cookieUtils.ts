export async function getCookie(cookieName: string) {
    try {
        const res = await fetch('/api/cookies/get-cookie', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: JSON.stringify({ cookieName }),
        });

        if (!res.ok) {
            return new Response(JSON.stringify({ error: "Error fetching cookie" }), {
                status: res.status,
                headers: { "Content-Type": "application/json" },
            });
        }

        const data = await res.json();
        const cookie = data.cookie;
        return cookie;
    } catch (error) {
        console.error('Error fetching cookie', error);
        return false;
    }
}


export async function setCookie(cookieName: string, cookieValue: string) {
    const res = await fetch(`/api/cookies/set-cookie`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ cookieName, cookieValue }),
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

export async function deleteCookie(cookieName: string) {
    const res = await fetch(`/api/cookies/delete-cookie`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ cookieName }),
    });

    // Ensure proper error handling
    if (!res.ok) {
        // Handle errors, e.g., return an error response
        return new Response(JSON.stringify({ error: "Error deleting cookie" }), {
            status: res.status,
            headers: { "Content-Type": "application/json" },
        });
    }
}
