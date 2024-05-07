'use client'
import { Flex, Box, Text, Button } from "@radix-ui/themes"
import ContinueWithGoogle from "@/app/components/ContinueWithGoogle"
import useAuth from "@/app/hooks/useAuth"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react'


const MainComponent = () => {
    // Get isAuthenticated in case you need to use it for future operations
    const isAuthenticated = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function validateEmail(email: string, password: string) {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
            const res = await fetch(`${baseUrl}/validate-email?other_email=${email}&other_password=${password}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                },

            });
            // Ensure proper error handling
            if (!res.ok) {
                // Handle errors, e.g., return an error response
                return new Response(JSON.stringify({ error: "Error fetching metadata" }), {
                    status: res.status,
                    headers: { "Content-Type": "application/json" },
                });
            }
            const responseData = await res.json();
            return responseData.isValid
        }
        catch (error) {
            // Handle other errors
            console.error("Error validating email", error);
        }
    }

    // Function to validate email using a regular expression
    function validateEmailString(email: string) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    // Function to validate password based on your criteria
    function validatePasswordString(password: string) {
        // Example: Check for a minimum length of 8 characters
        return password.length >= 8;
    }

    const handleSignIn = async () => {
        if (!validateEmailString(email) || !validatePasswordString(password)) {
            console.error("Invalid email or password format.");
            // Show a toast message
        }
        else {
            const isValid = await validateEmail(email, password);
            if (isValid) {
                router.push('/test-picker');
            }
            else {
                console.log('Email address not found, please sign in to continue')
            }
        }
    };

    return (
        <Flex className="bg-[#F6F7FB]" height={{ md: '100vh' }} width={{ md: '100vw' }} justify='center' align='center'>
            <Box className="bg-white" style={{ 'height': '80%', 'width': '30%', 'borderRadius': '10px', 'boxShadow': '4px 4px 50px 5px rgba(0, 0, 0, 0.25)' }}>
                <Flex className="h-full" direction='column' justify='start' gap='2' pt='6'>
                    <Box style={{ 'height': '10%', 'width': '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text size='6' weight='bold' wrap='pretty'>Sign In</Text>
                    </Box>
                    <Box style={{ 'height': '12%', 'width': '77%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <ContinueWithGoogle />
                    </Box>
                    <Box style={{ 'height': '10%', 'width': '77%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <div className="flex items-center justify-center w-full">
                            <div className="flex-grow border-t border-black"></div>
                            <span className="flex-shrink mx-4 text-black">or</span>
                            <div className="flex-grow border-t border-black"></div>
                        </div>
                    </Box>
                    <Box style={{ 'height': '10%', 'width': '77%', display: 'flex', justifyContent: 'end', alignItems: 'center', alignSelf: 'center' }}>
                        <input
                            type="text"
                            className="border border-solid border-[#79747E] bg-white h-10 px-5  text-sm focus:outline-none"
                            placeholder="Email"
                            style={{ 'height': '75%', 'width': '100%', 'borderRadius': '5px' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                    <Box style={{ 'height': '10%', 'width': '77%', display: 'flex', justifyContent: 'end', alignItems: 'center', alignSelf: 'center' }}>
                        <input
                            type="text"
                            className="border border-solid border-[#79747E] bg-white h-10 px-5  text-sm focus:outline-none"
                            placeholder="Password"
                            style={{ 'height': '75%', 'width': '100%', 'borderRadius': '5px' }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="absolute mr-4">
                            <svg width="15" height="15" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.1 10.5L13.65 9.05C13.8 8.26667 13.575 7.53333 12.975 6.85C12.375 6.16667 11.6 5.9 10.65 6.05L9.2 4.6C9.48333 4.46667 9.77083 4.36667 10.0625 4.3C10.3542 4.23333 10.6667 4.2 11 4.2C12.25 4.2 13.3125 4.6375 14.1875 5.5125C15.0625 6.3875 15.5 7.45 15.5 8.7C15.5 9.03333 15.4667 9.34583 15.4 9.6375C15.3333 9.92917 15.2333 10.2167 15.1 10.5ZM18.3 13.65L16.85 12.25C17.4833 11.7667 18.0458 11.2375 18.5375 10.6625C19.0292 10.0875 19.45 9.43333 19.8 8.7C18.9667 7.01667 17.7708 5.67917 16.2125 4.6875C14.6542 3.69583 12.9167 3.2 11 3.2C10.5167 3.2 10.0417 3.23333 9.575 3.3C9.10833 3.36667 8.65 3.46667 8.2 3.6L6.65 2.05C7.33333 1.76667 8.03333 1.55417 8.75 1.4125C9.46667 1.27083 10.2167 1.2 11 1.2C13.5167 1.2 15.7583 1.89583 17.725 3.2875C19.6917 4.67917 21.1167 6.48333 22 8.7C21.6167 9.68333 21.1125 10.5958 20.4875 11.4375C19.8625 12.2792 19.1333 13.0167 18.3 13.65ZM18.8 19.8L14.6 15.65C14.0167 15.8333 13.4292 15.9708 12.8375 16.0625C12.2458 16.1542 11.6333 16.2 11 16.2C8.48333 16.2 6.24167 15.5042 4.275 14.1125C2.30833 12.7208 0.883333 10.9167 0 8.7C0.35 7.81667 0.791667 6.99583 1.325 6.2375C1.85833 5.47917 2.46667 4.8 3.15 4.2L0.4 1.4L1.8 0L20.2 18.4L18.8 19.8ZM4.55 5.6C4.06667 6.03333 3.625 6.50833 3.225 7.025C2.825 7.54167 2.48333 8.1 2.2 8.7C3.03333 10.3833 4.22917 11.7208 5.7875 12.7125C7.34583 13.7042 9.08333 14.2 11 14.2C11.3333 14.2 11.6583 14.1792 11.975 14.1375C12.2917 14.0958 12.6167 14.05 12.95 14L12.05 13.05C11.8667 13.1 11.6917 13.1375 11.525 13.1625C11.3583 13.1875 11.1833 13.2 11 13.2C9.75 13.2 8.6875 12.7625 7.8125 11.8875C6.9375 11.0125 6.5 9.95 6.5 8.7C6.5 8.51667 6.5125 8.34167 6.5375 8.175C6.5625 8.00833 6.6 7.83333 6.65 7.65L4.55 5.6Z" fill="#7A757F" />
                            </svg>
                        </button>
                    </Box>
                    <Box style={{ 'height': '10%', 'width': '77%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Button style={{ 'height': '75%', 'width': '100%', 'borderRadius': '5px' }} size="3" variant='solid' onClick={handleSignIn}
                        >Sign In</Button>
                    </Box>
                    {/* <Box className="pt-4" style={{ 'height': '3%', 'width': '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Text color='gray' size='2' weight='regular' wrap='pretty'>Forgot password?</Text>
                    </Box> */}
                    <Box className="pt-4 gap-3" style={{ 'height': '5%', 'width': '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Text color='gray' size='2' weight='regular' wrap='pretty'>Don&apos;t have an account?</Text>
                        <Link href="/sign-up">
                            <Text color='gray' size='2' weight='regular' wrap='pretty'>Sign Up</Text>
                        </Link>
                    </Box>
                </Flex>
            </Box >
        </Flex >
    )
}

const Page = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <MainComponent />
    </Suspense>
);

export default Page;