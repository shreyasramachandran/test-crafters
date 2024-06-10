'use client'

import { Avatar, Box, Dialog, Flex, IconButton } from "@radix-ui/themes"
import { useEffect, useRef, useState } from "react";
import Settings from "./Settings";
import Refer from "../Refer";
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();
    const avatarRef = useRef<HTMLDivElement>(null);

    const [showSettings, setSettings] = useState(false);
    const signOutRef = useRef<HTMLDivElement>(null);
    const [userInfo, setUserInfo] = useState({ userName: 'User Name', userEmail: 'User Email' });

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClickOutside = (event: MouseEvent) => {
        if (avatarRef.current && !avatarRef.current.contains(event.target as Node)
            && signOutRef.current && !signOutRef.current.contains(event.target as Node)) {
            setSettings(false);
        }
    };

    useEffect(() => {
        if (showSettings) {
            document.addEventListener('click', handleClickOutside, true);
        } else {
            document.removeEventListener('click', handleClickOutside, true);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [showSettings]);

    useEffect(() => {
        const userName = localStorage.getItem('google_user_name') || localStorage.getItem('other_name') || 'User Name';
        const userEmail = localStorage.getItem('google_user_email') || localStorage.getItem('other_email') || 'User Email';
        setUserInfo({ userName, userEmail });
    }, []);

    const toggleSettings = () => {
        setSettings(!showSettings);
    };

    const handleBackClick = () => {
        if (window.history.length > 1) {
            router.back();
        }
    };


    return (
        <Box className="bg-[#38B6FF]" style={{
            height: '5%', width: '100%', position: 'relative'
        }}>
            <Flex className="h-full px-10" justify='between' align='center'>
                <IconButton size='3' style={{
                    backgroundColor: '#1DACFF', boxShadow: '2px 2px 10px 3px rgba(0, 0, 0, 0.15)', cursor: 'pointer'
                }} onClick={handleBackClick}>
                    <img src="images/back_button.svg" alt="Back Button" className="w-4 h-4" />
                </IconButton>
                <Flex justify="center" align="center">
                    <Box ref={avatarRef} onClick={toggleSettings} style={{ cursor: 'pointer' }}>
                        <Avatar
                            size="3"
                            radius="medium"
                            fallback={userInfo.userName.charAt(0).toUpperCase()}
                            highContrast
                        />
                    </Box>
                    {showSettings && (
                        <Box ref={signOutRef} style={{
                            position: 'absolute',
                            top: '100%', // Position it just below the avatar
                            right: '0',
                            zIndex: 10,
                            marginTop: '8px',
                            marginRight: '42px',
                            pointerEvents: 'auto'
                        }}>
                            <Settings name={userInfo.userName} email={userInfo.userEmail} dialogState={setDialogOpen} onClose={() => { setSettings(false) }} />
                        </Box>
                    )}
                    {/* Dialog Box */}
                    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                        <Dialog.Content style={{ padding: '0px' }}>
                            <Refer code="shreyas" />
                        </Dialog.Content>
                    </Dialog.Root>
                </Flex>
            </Flex>
        </Box>
    )
}