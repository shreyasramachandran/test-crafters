'use client'

import OrigamiAnimation from "@/app/components/splash-screen/OrigamiAnimation";
import useAuth from "@/app/hooks/useAuth";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { Box, Flex, ScrollArea, Text } from "@radix-ui/themes";
import Header from "@/app/components/header/Header";
import Image from 'next/image';


const MainComponent = () => {
    console.log('Tolystoy mounted');
    const { isAuthenticated, loading } = useAuth();

    const [currentMessage, setCurrentMessage] = useState('');

    const conversations = [
        { id: 1, title: 'Interaction for Pronoun Test' },
        { id: 2, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' },
        { id: 3, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' },
        { id: 4, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' },
        { id: 5, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' },
        { id: 6, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' },
        { id: 7, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' },
        { id: 8, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' },
        { id: 9, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' },
        { id: 10, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' },
        { id: 11, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' },
        { id: 12, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' },
        { id: 13, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' },
        { id: 14, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' },
        { id: 15, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' },
        { id: 16, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' },
        { id: 17, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' },
        { id: 18, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' },
        { id: 19, title: 'Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children.. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. Mindstroms: Lego Kit for children. ' }


    ]

    if (loading) {
        return <OrigamiAnimation />;
    }

    if (!isAuthenticated) {
        return <OrigamiAnimation />;
    }

    return (
        <Flex direction='column' className="bg-[#38B6FF] p-8" height={{ md: '100vh' }} width={{ md: '100vw' }} style={{ position: 'absolute' }}>
            <Flex direction='column' style={{ 'height': '100%', 'width': '100%' }}>
                <Header />
                <Flex direction='row' style={{ height: '90%', width: '85%', justifySelf: 'center', alignSelf: 'center' }}>
                    <Box m='4' p='4' className="bg-[#EAF6FA]" style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', height: '100%', width: '25%', borderRadius: '5px', boxShadow: '4px 4px 20px 4px rgba(0, 0, 0, 0.25)' }}>
                        <Box pb='3' style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <Box style={{ display: 'flex', flexDirection: 'row', width: '100%', alignSelf: 'center' }}>
                                <Image
                                    src="/images/history.svg"
                                    alt="History"
                                    width={18}
                                    height={18}
                                />
                                <Text as="div" weight='medium' size="5" className="ml-3">History</Text>
                            </Box>
                            <Image
                                src="/images/add_conversation.svg"
                                alt="Add Conversation"
                                width={18}
                                height={18}
                                style={{ cursor: 'pointer' }}
                            />
                        </Box>
                        <ScrollArea type="hover" scrollbars="vertical" size="2" style={{ height: '100%', width: '100%' }}>
                            <Flex pt='1' direction='column' gap='1' style={{ width: '100%' }}>
                                {conversations.map((conversation) => (
                                    <Box key={conversation.id} mr='4' p='1' style={{ display: 'flex', flexDirection: 'row', width: '262px', borderRadius: '4px', backgroundColor: 'rgba(194, 205, 208, 0.75)', boxShadow: '2px 2px 10px 1px rgba(0, 0, 0, 0.02)', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                                        <Text as="div" weight='medium' size="3" className="ml-3" style={{
                                            overflow: 'hidden', // Hides overflow
                                            whiteSpace: 'nowrap', // Keeps the text on a single line
                                            textOverflow: 'ellipsis', // Adds ellipsis when text overflows
                                            width: '100%'
                                        }}>{conversation.title}</Text>
                                        <Image
                                            className="mr-2"
                                            src="/images/delete_conversation.svg"
                                            alt="Delete Conversation"
                                            width={16}
                                            height={16}
                                            style={{ cursor: 'pointer', marginLeft: 'auto' }}
                                        />
                                    </Box>
                                ))}
                            </Flex>
                        </ScrollArea>
                    </Box>
                    <Box style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', height: '100%', width: '75%', borderRadius: '5px', justifyItems: 'center', alignItems: 'center' }}>
                        <ScrollArea type="hover" scrollbars="vertical" size="2" style={{ height: '100%', width: '80%', paddingTop: '5px' }}>
                            {conversations.map((conversation) => (
                                <Box key={conversation.id} ml='5' mr='5' mt='4' mb='10px' p='3' style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    borderRadius: '5px',
                                    backgroundColor: 'rgba(45, 156, 219, 0.5)',
                                    boxShadow: '2px 2px 20px 2px rgba(0, 0, 0, 0.25)',
                                    mixBlendMode: 'hard-light',
                                    justifyContent: 'left',
                                    alignItems: 'center',
                                    zIndex: 0,
                                    pointerEvents: 'none'
                                }}>
                                    <Text as="div" weight='medium' size="3" className="ml-3" style={{
                                        overflow: 'visible', // Hides overflow
                                        whiteSpace: 'normal', // Keeps the text on a single line
                                        zIndex: 1,
                                        color: 'black'
                                    }}>{conversation.title}</Text>
                                </Box>
                            ))}
                        </ScrollArea>
                        <Box m='4' mb='-4' px='4' mt='0' className="bg-[#EAF6FA]" style={{ display: 'flex', flexDirection: 'row', height: '7%', width: '80%', borderRadius: '5px', boxShadow: '4px 4px 20px 4px rgba(0, 0, 0, 0.25)', justifyContent: 'space-between', alignItems: 'center' }}>
                            <input
                                type="text"
                                placeholder="Message Tolystoy"
                                className="bg-[#EAF6FA]"
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setCurrentMessage('');  // Clear the input field
                                        e.preventDefault();     // Optional: Prevent the default action of the enter key
                                    }
                                }}
                                style={{ width: '96%', height: '100%', outline: 'none' }}
                            />
                            <Image
                                src="/images/send_message.svg"
                                alt="Send Message"
                                width={20}
                                height={20}
                                style={{ cursor: 'pointer' }}
                            />
                        </Box>
                    </Box>
                </Flex>
            </Flex >
        </Flex >
    );
}

// Dynamically import MainComponent with ssr: false
const DynamicMainComponent = dynamic(() => Promise.resolve(MainComponent), { ssr: false });

const Page = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <DynamicMainComponent />
    </Suspense>
);

export default Page;
