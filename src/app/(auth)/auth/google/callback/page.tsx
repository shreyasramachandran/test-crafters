'use client'

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Ensure this is the correct import

export default function Page() {
    const router = useRouter();
    const hasFetchedTokens = useRef(false); // ref to track if tokens have been fetched

    async function setCookie(cookieName: string, cookieValue: string) {
        const res = await fetch(`/api/cookies/set-cookie?${cookieName}?value=${cookieValue}`, {
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

    async function getCookie(cookieName: string) {
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

    async function getUserInfo(accessToken: string) {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('UserInfo request failed');
            }

            const data = await response.json();
            return data; // This contains the user's profile information
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    // async function createUserData(userData: any) {
    //     try {
    //         const response = await fetch(`/create-user-data`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: userData,
    //             cache: 'no-store'
    //         });
    //         if (!response.ok) {
    //             console.error('Error in storing user data')
    //         }
    //     } catch (error: any) {
    //         console.error('Error in storing user data:', error);
    //     }
    //     return;
    // }

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
                router.replace('/login-failure'); // redirect to login failure
                return;
            }


            // Later simplify it into one function
            setCookie('access_token', responseData.access_token)
            setCookie('refresh_token', responseData.access_token)
            setCookie('expires_token', responseData.access_token)


            // Get user info
            const userInfo = await getUserInfo(responseData.access_token);
            if (userInfo) {
                const googleUserEmail = userInfo.email; // User's email address
                const googleUserName = userInfo.name; // User's full name

                const userData = {
                    'google_user_email': googleUserEmail,
                    'google_user_name': googleUserName,
                    'access_token': responseData.access_token,
                    'refresh_token': responseData.refresh_token,
                    'expires_in': responseData.expires_in
                }
                // createUserData(userData)
            }

            // Call a backend api to create a new session and a new user. 
            router.replace('/test-picker'); // redirect to test picker on success
        } catch (error: any) {
            console.error('Error in OAuth token fetching:', error);
        }
    }

    useEffect(() => {
        // Only run the effect if we haven't already fetched tokens and there's no error
        if (hasFetchedTokens.current) return;

        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');

        if (code) {
            fetchOAuthTokens(code);
        } else {
            console.error('No code found in URL query parameters');
            router.replace('/login-failure');
        }
    }, [router]); // add fetchError to the dependencies array
    return null; // This component does not render anything visible
};
