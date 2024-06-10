export async function fetchEWalletData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
        const res = await fetch(`${baseUrl}/get-wallet-data`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            credentials: 'include'
        });
        // Ensure proper error handling
        if (!res.ok) {
            // Handle errors, e.g., return an error response
            throw new Error(`Error in ewalletdata response`);
        }
        const data = await res.json();
        return data;

    } catch (error) {
        throw new Error(`Error fetching ewalletdata`);
    }
}