"use client"
import { useRouter } from 'next/navigation';
import useAuth from "@/app/hooks/useAuth";


export default function ContinueWithGoogle() {
    const router = useRouter();
    // Use useAuth to check if the token and cookies are valid.
    const isAuthenticated = useAuth();

    const initiateGoogleSignIn = () => {
        // Define your Google Client ID and the redirect URI
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        const redirectUri = `${window.location.origin}/auth/google/callback`;

        // Define the scope of the access request
        const scope = encodeURIComponent('email profile');

        // Construct the OAuth2 URL
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${clientId}` +
            `&redirect_uri=${redirectUri}` +
            `&response_type=code` +
            `&access_type=offline` +
            `&prompt=consent` +
            `&scope=${scope}`;
        // Redirect the user to Google's OAuth 2.0 server
        router.replace(authUrl)
    };

    return <button
        onClick={initiateGoogleSignIn}
        className="inline-flex items-center justify-center px-4 py-2 border border-solid border-[#79747E] shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 w-full">
        <img src="images/google_icon.svg" alt="Google Sign-In" className="w-5 h-6 mr-2" />
        Continue with Google
    </button>
}