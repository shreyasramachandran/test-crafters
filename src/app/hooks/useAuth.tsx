'use client'
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function useAuth() {
    const router = useRouter();
    let returnUrl = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    async function checkTokenValidity() {
        let accessToken = localStorage.getItem('access_token');
        console.log(accessToken)
        if (!accessToken) return false;

        // Check the current access token's validity
        let isValid = await validateToken(accessToken);
        if (isValid) return true;  // If the token is valid, return true immediately

        // If the token is not valid, attempt to refresh it
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) return false;  // No refresh token available, can't refresh

        // Try to refresh the access token using the refresh token
        accessToken = await refreshAccessToken(refreshToken);
        if (!accessToken) return false;  // Refresh failed, return false

        // Verify the new access token's validity
        isValid = await validateToken(accessToken);
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
                localStorage.setItem('access_token', data.accessToken);
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
                if (returnUrl === '/sign-in' || returnUrl === '/sign-up') {
                    returnUrl = '/test-picker'; // Redirect to home if the current page is sign-in
                }
                router.push(returnUrl)
            }

            if (!isValid) {
                // Redirect to the sign-in page and save the current path for redirect after login
                if (returnUrl === '/sign-in' || returnUrl === '/sign-up') {
                    returnUrl = '/'; // Redirect to home if the current page is sign-in
                }

                router.push(`/sign-in?returnUrl=${encodeURIComponent(returnUrl)}`);
            }
        };

        initAuthCheck();
    }, [router]);

    return isAuthenticated;
}
