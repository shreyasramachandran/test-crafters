'use client'
import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getCookie, setCookie } from '../utils/cookieUtils';

export default function useAuth() {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams()
    let returnUrl = pathName + '?' + searchParams

    const [isAuthenticated, setIsAuthenticated] = useState(false);


    async function checkTokenValidity() {
        let accessToken = await getCookie('access_token')
        if (!accessToken) return false;

        // Check the current access token's validity
        let isValid = await validateToken(accessToken);
        if (isValid) return true;  // If the token is valid, return true immediately

        // If the token is not valid, attempt to refresh it
        const refreshToken = await getCookie('refresh_token');
        if (!refreshToken) return false;  // No refresh token available, can't refresh

        // Try to refresh the access token using the refresh token
        accessToken = await refreshAccessToken(refreshToken);
        if (!accessToken) return false;  // Refresh failed, return false

        // Set the validity to true
        isValid = true
        return isValid;  // Return true if the new token is valid, otherwise false
    }

    async function validateToken(accessToken: string) {
        try {
            const response = await fetch('/api/auth/google/validate-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ accessToken }),
                cache: 'no-store'
            });
            return response.ok;  // True if token is valid, false otherwise
        } catch (error) {
            console.error('Error validating token:', error);
            return false;
        }
    }

    async function refreshAccessToken(refreshToken: string) {
        try {
            const response = await fetch('/api/auth/google/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refreshToken }),
                cache: 'no-store'
            });
            const data = await response.json();
            if (response.ok) {
                setCookie('access_token', data.access_token)
                // Update the access token in storage
                return data.accessToken;  // Return the new access token
            }
            return null;  // Refresh failed, return null
        } catch (error) {
            console.error('Error refreshing access token:', error);
            return null;
        }
    }


    useEffect(() => {
        const initAuthCheck = async () => {
            const isValid = await checkTokenValidity();
            setIsAuthenticated(isValid);
            if (isValid) {
                // Write rules of validity of urls based on previous url
                if (returnUrl === '/sign-in?' || returnUrl === '/sign-up?' || returnUrl === '/landing-page?') {
                    returnUrl = '/test-picker'; // Redirect to home if the current page is sign-in
                }
                router.push(returnUrl)
            }

            if (!isValid) {

                // Redirect to the sign-in page and save the current path for redirect after login
                if (returnUrl === '/sign-in?' || returnUrl === '/sign-up?') {
                    router.push(returnUrl);
                }
                else {
                    router.push('/sign-in');
                }
            }
        };

        initAuthCheck();
    }, []);

    return isAuthenticated;
}
