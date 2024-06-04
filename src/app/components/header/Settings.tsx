'use client'

import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes"
import { useRouter } from 'next/navigation';
import { deleteCookie } from "../../utils/cookieUtils";
import { UseRowStateCellProps } from "react-table";

interface SettingsProps {
    name: string;
    email: string;
    dialogState: any;
    onClose: () => void;
}

export default function Settings({ name, email, dialogState, onClose }: SettingsProps) {
    console.log('Settings component called')

    const clearCookies = async () => {
        deleteCookie('userId')
        deleteCookie('sessionId')
        deleteCookie('access_token')
        deleteCookie('refresh_token')
    }

    const clearLocalStorage = async () => {
        localStorage.removeItem('userId')
        localStorage.removeItem('sessionId')
        localStorage.removeItem('google_user_email')
        localStorage.removeItem('google_user_name')
        localStorage.removeItem('google_user_picture')
        localStorage.removeItem('other_email')
        localStorage.removeItem('other_name')
        localStorage.removeItem('other_password')
        localStorage.removeItem('expires_in')
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }

    const clearSessionStorage = async () => {
        sessionStorage.removeItem('sessionId')
        sessionStorage.removeItem('verification_code')
        sessionStorage.removeItem('other_password')
        sessionStorage.removeItem('other_name')
        sessionStorage.removeItem('other_email')
    }

    const router = useRouter();
    const signOut = async () => {
        console.log('Signing Out')
        // Redirect to sign in
        router.push('/sign-in');
        // Cleanup
        clearCookies()
        clearLocalStorage()
        clearSessionStorage()
        onClose();
    }

    const refer = async () => {
        dialogState(true)
    }

    const redirectEWallet = async () => {
        // Redirect to e-wallet
        router.push('/e-wallet');
    }

    const fallback = name.charAt(0).toUpperCase()

    return (
        <Box className="py-6 pl-6">
            <Box width="400px" className="bg-[#EAF6FA]" style={{ 'borderRadius': '5px', 'boxShadow': '2px 2px 25px 2px rgba(0, 0, 0, 0.25)' }}>
                <Card size="1" variant="ghost">
                    <Flex direction="column" gap="4" className="py-4">
                        <Flex gap="4" align="center" className="ml-3">
                            <Avatar size="4" radius="medium" fallback={fallback} highContrast />
                            <Box>
                                <Text as="div" size="4" weight="bold">
                                    {name}
                                </Text>
                                <Text as="div" size="4" color="gray">
                                    {email}
                                </Text>
                            </Box>
                        </Flex>
                        <div className="flex items-center justify-center w-full p-2">
                            <div className="flex-grow border-t border-[#01012E] opacity-25"></div>
                        </div>
                        <Flex gap="4" align="center" className="ml-3" onClick={redirectEWallet} style={{ cursor: 'pointer' }}>
                            <img src="images/wallet.svg" alt="Wallet" className="w-5 h-5 ml-4" />
                            <Text as="div" size="4" color="gray" className="ml-3">Wallet</Text>
                        </Flex>
                        <Flex gap="4" align="center" className="ml-3" onClick={refer} style={{ cursor: 'pointer' }}>
                            <img src="images/refer.svg" alt="Refer" className="w-5 h-5 ml-4" />
                            <Text as="div" size="4" color="gray" className="ml-3">Refer</Text>
                        </Flex>
                        <Flex gap="4" align="center" className="ml-3" onClick={signOut} style={{ cursor: 'pointer' }}>
                            <img src="images/log_out.svg" alt="Sign Out" className="w-5 h-5 ml-4" />
                            <Text as="div" size="4" color="gray" className="ml-3">Sign Out</Text>
                        </Flex>
                    </Flex>
                </Card>
            </Box>
        </Box>
    )
}