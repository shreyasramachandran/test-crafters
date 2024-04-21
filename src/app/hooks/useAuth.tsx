'use client'
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function useAuth() {
    const router = useRouter();
    let returnUrl = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    async function checkTokenValidity() {
        const accessToken = sessionStorage.getItem('access_token');
        if (!accessToken) return false;

        try {
            const response = await fetch('/api/auth/google/validate-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ accessToken }),
                cache: 'no-store'
            });
            return response.ok; // True if token is valid, false otherwise
        } catch (error) {
            console.error('Error validating token:', error);
            return false;
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
