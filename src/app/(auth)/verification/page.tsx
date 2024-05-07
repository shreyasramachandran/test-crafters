'use client'
import { Flex, Box, Text, Button } from "@radix-ui/themes"
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const [verificationCode, setVerificationCode] = useState('');
    const typedVerificationCode = useRef<HTMLInputElement>(null)

    function getSessionStorage() {
        if (typeof window !== 'undefined') {
            const verificationCode = sessionStorage.getItem('verification_code');
            return verificationCode;
        }
        return ''; // Return null or a default value if not on client-side
    }

    useEffect(() => {
        const code = getSessionStorage();
        if (code) {
            setVerificationCode(code);
        }
    }, []);

    async function createUser(email: string, password: string) {

        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
            const body = {
                otherEmail: email,
                otherPassword: password
            }
            const res = await fetch(`${baseUrl}/create-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache"
                },
                credentials: 'include',
                body: JSON.stringify(body)
            });
            // Ensure proper error handling
            if (!res.ok) {
                // Handle errors, e.g., return an error response
                return new Response(JSON.stringify({ error: "Error creating user" }), {
                    status: res.status,
                    headers: { "Content-Type": "application/json" },
                });
            }
            const responseData = await res.json();
            return responseData
        }
        catch (error) {
            // Handle other errors
            console.error("Error creating user", error);
        }
    }

    const handleVarification = async () => {
        if (typedVerificationCode.current?.value === verificationCode) {
            const otherEmail = sessionStorage.getItem('other_email') as string
            const otherPassword = sessionStorage.getItem('other_password') as string
            createUser(otherEmail, otherPassword)
            // Create a new user and store his otherEmail and otherPassword
            router.push('/test-picker');
        }
    };

    return (
        <Flex className="bg-[#F6F7FB]" height={{ md: '100vh' }} width={{ md: '100vw' }} justify='center' align='center'>
            <Box className="bg-white" style={{ 'height': '55%', 'width': '30%', 'borderRadius': '5px', 'boxShadow': '4px 4px 50px 5px rgba(0, 0, 0, 0.25)' }}>
                <Flex className="h-full" direction='column' justify='start' gap='5' pt='7'>
                    <Box style={{ 'height': '15%', 'width': '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text size='6' weight='bold' wrap='pretty'>Verification</Text>
                    </Box>
                    <Box style={{ 'height': '15%', 'width': '77%', 'display': 'flex', textAlign: 'left', alignSelf: 'center' }}>
                        <Text size='4' weight='light' wrap='pretty'>Please enter the verification code sent at email address</Text>
                    </Box>
                    <Box style={{ 'height': '15%', 'width': '77%', display: 'flex', justifyContent: 'end', alignItems: 'center', alignSelf: 'center' }}>
                        <input
                            type="text"
                            className="border border-solid border-[#79747E] bg-white h-10 px-5  text-sm focus:outline-none"
                            placeholder="VerificationCode"
                            style={{ 'height': '75%', 'width': '100%', 'borderRadius': '5px' }}
                            ref={typedVerificationCode}
                        />
                    </Box>
                    <Box style={{ 'height': '15%', 'width': '77%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Button style={{ 'height': '75%', 'width': '100%', 'borderRadius': '5px' }} size="3" variant='solid' onClick={handleVarification}>Verify Account</Button>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    )
}