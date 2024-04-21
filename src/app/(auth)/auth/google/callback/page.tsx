'use client'

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation'; // Ensure this is the correct import

export default function Page() {
    const router = useRouter();
    const hasFetchedTokens = useRef(false); // ref to track if tokens have been fetched
    const [fetchError, setFetchError] = useState<string | null>(null); // state to track fetch errors

    async function fetchOAuthTokens(oAuthCode: string) {
        if (hasFetchedTokens.current) return; // guard against multiple invocations

        hasFetchedTokens.current = true; // mark that token fetch is in progress

        try {
            const response = await fetch(`/api/auth/google/callback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code: oAuthCode }),
                cache: 'no-store'
            });

            const responseData = await response.json();

            if (!response.ok) {
                hasFetchedTokens.current = false
                console.error('Error fetching OAuth tokens:', responseData);
                setFetchError(responseData.error); // set the error state
                router.replace('/login-failure'); // redirect to login failure
                return;
            }

            console.log('Received OAuth Tokens:', responseData);
            sessionStorage.setItem('access_token', responseData.access_token);
            sessionStorage.setItem('refresh_token', responseData.refresh_token);
            sessionStorage.setItem('expires_in', responseData.expires_in);
            router.replace('/test-picker'); // redirect to test picker on success
        } catch (error: any) {
            console.error('Error in OAuth token fetching:', error);
            setFetchError(error.toString());
        }
    }

    useEffect(() => {
        // Only run the effect if we haven't already fetched tokens and there's no error
        if (hasFetchedTokens.current || fetchError) return;

        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');

        if (code) {
            fetchOAuthTokens(code);
        } else {
            console.error('No code found in URL query parameters');
            router.replace('/login-failure');
        }
    }, [router, fetchError]); // add fetchError to the dependencies array

    // useEffect to handle changes in fetchError state
    useEffect(() => {
        if (fetchError) {
            console.error('Fetch error:', fetchError);
            router.replace('/login-failure');
        }
    }, [fetchError, router]);

    return null; // This component does not render anything visible
};
