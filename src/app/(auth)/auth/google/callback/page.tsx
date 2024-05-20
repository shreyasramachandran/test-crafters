'use client'

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Ensure this is the correct import
import { getCookie, setCookie } from '@/app/utils/cookieUtils';

export default function Page() {
    console.log('auth google callback component mounted')
    const router = useRouter();
    const hasFetchedTokens = useRef(false); // ref to track if tokens have been fetched


    async function createUser(userData: any) {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
            console.log(userData)

            const res = await fetch(`${baseUrl}/create-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(userData),
                credentials: 'include'
            });
            // Ensure proper error handling
            if (!res.ok) {
                // Handle errors, e.g., return an error response
                throw new Error(`HTTP error, status = ${res.status}`);
            }
        }
        catch (error) {
            // Handle other errors
            console.error("Error creating user", error);
            throw error
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

    async function fetchOAuthTokens(oAuthCode: string) {
        if (hasFetchedTokens.current) return; // guard against multiple invocations

        hasFetchedTokens.current = true; // mark that token fetch is in progress

        // Check if userId is already present in which case direct to test-prep.
        let userId = await getCookie('userId')
        if (userId) {
            router.replace('/test-picker');
        }

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

            // Get user info
            const userInfo = await getUserInfo(responseData.access_token);
            if (userInfo) {
                // Check if user is present in the database, in which case retrieve
                const userData = {
                    'googleEmail': userInfo.email,
                    'googleName': userInfo.name,
                    'googleId': userInfo.id,
                    'googleLocale': userInfo.locale,
                    'googlePicture': userInfo.picture,
                    'accessToken': responseData.access_token,
                    'refreshToken': responseData.refresh_token,
                    'expiresIn': String(responseData.expires_in)
                }
                setCookie('access_token', responseData.access_token)
                setCookie('refresh_token', responseData.access_token)
                createUser(userData)
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
