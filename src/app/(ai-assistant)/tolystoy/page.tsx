'use client'

import OrigamiAnimation from "@/app/components/splash-screen/OrigamiAnimation";
import useAuth from "@/app/hooks/useAuth";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { Box, Flex, ScrollArea, Text } from "@radix-ui/themes";
import Header from "@/app/components/header/Header";
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';


const MainComponent = () => {
    console.log('Tolystoy mounted');
    const { isAuthenticated, loading } = useAuth();

    const [currentMessage, setCurrentMessage] = useState('');

    const conversations = [
        { id: 1, title: 'Interaction for Pronoun Test' },
        { id: 2, title: 'Can you give me another sentence to practice identifying pronouns?' },
        { id: 3, title: "Can you explain why 'her' and 'him' are the pronouns in the sentence?" },
        { id: 4, title: "Can you explain why 'her' and 'him' are the pronouns in the sentence?" }
    ]

    const suggestions = [
        "Can you explain why 'her' and 'him' are the pronouns in the sentence?",
        "Can you give me another sentence to practice identifying pronouns?"
    ]

    const isMobileSmall = useMediaQuery({ query: '(max-width: 499px) and (max-height: 999px)' });

    if (loading) {
        return <OrigamiAnimation />;
    }

    if (!isAuthenticated) {
        return <OrigamiAnimation />;
    }

    return isMobileSmall ? (
        <Flex direction='column' className="bg-[#38B6FF] px-3 pt-7 pb-4 h-screen w-screen" style={{ position: 'absolute' }}>
            <Flex direction='column' className="h-full w-full">
                <Header></Header>
                <Box className="mt-[16px] mobile-very-small:mt-[20px]" style={{
                    display: 'flex',
                    flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'stretch',
                    gap: '20px', // Reduced gap for mobile
                    marginLeft: '1px',
                    marginRight: '1px',
                    flex: 1,
                }}>
                    {/* History Box */}
                    <Box p="3" className="mix-blend-multiply" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '12px',
                        backgroundColor: '#EAF6FA',
                        cursor: 'pointer',
                        flex: 1,
                        height: '100%',
                        boxShadow: '0px 4px 25px 5px rgba(0, 0, 0, 0.2)'
                    }}>
                        <Image
                            src="/images/history.svg"
                            alt="History"
                            width={18}
                            height={18}
                        />
                        <Text size="3" weight="medium" wrap="pretty" style={{ marginLeft: '8px' }}>History</Text>
                    </Box>
                    {/* Menu Box */}
                    <Box p="3" className="mix-blend-multiply" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '12px',
                        backgroundColor: '#EAF6FA',
                        cursor: 'pointer',
                        height: '100%',
                        flex: 1,
                        boxShadow: '4px 4px 25px 5px rgba(0, 0, 0, 0.2)'
                    }}>
                        <Image
                            src="/images/menu.svg"
                            alt="Menu"
                            width={20}
                            height={20}
                        />
                        <Text size="3" weight="medium" wrap="pretty" style={{ marginLeft: '8px' }}>Menu</Text>
                    </Box>
                </Box>
                <Box className="bg-[#EAF6FA] h-[100%] w-[100%] mt-4" style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', borderRadius: '8px', justifyItems: 'center', alignItems: 'center' }}>
                    <ScrollArea className="h-[100%] w-[100%]" type="hover" scrollbars="vertical" size="2">
                        {conversations.map((conversation) => (
                            <Box key={conversation.id} m='2' p='2' style={{
                                display: 'flex',
                                flexDirection: 'row',
                                borderRadius: '5px',
                                backgroundColor: 'rgba(45, 156, 219, 0.5)',
                                mixBlendMode: 'hard-light',
                                justifyContent: 'left',
                                alignItems: 'center',
                                zIndex: 0,
                                pointerEvents: 'none'
                            }}>
                                <Text as="div" weight='medium' size="1" style={{
                                    overflow: 'visible', // Hides overflow
                                    whiteSpace: 'normal', // Keeps the text on a single line
                                    zIndex: 1,
                                    color: 'black'
                                }}>{conversation.title}</Text>
                            </Box>
                        ))}
                    </ScrollArea>

                    {/* Suggestion Boxes */}
                    <Box px="2" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        gap: '8px', // Reduced gap for mobile
                        marginBottom: '8px', // Reduced margin for mobile
                        width: '100%', // Full width for mobile
                    }}>
                        {suggestions.map((suggestion, index) => (
                            <Box key={index} style={{
                                position: 'relative', // Allows for layering of elements
                                borderRadius: '15px',
                                cursor: 'pointer',
                                flex: 1, // Ensures the box expands to fit available space
                                textAlign: 'center',
                                padding: '4px 4px', // Padding adjusted for mobile
                                overflow: 'hidden', // Ensure the background doesn't overflow
                                display: 'flex', // Flexbox to center text
                                alignItems: 'center', // Center text vertically
                                justifyContent: 'center', // Center text horizontally
                            }}>
                                {/* Background Layer */}
                                <Box style={{
                                    backgroundColor: '#F6C1A3',
                                    opacity: '0.5', // 50% opacity
                                    mixBlendMode: 'darken', // Darken blend mode
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    borderRadius: '15px',
                                    zIndex: 0, // Background is behind the text
                                }}></Box>

                                {/* Text Layer */}
                                <Text className="text-[10px] mobile-very-small:text-[8px]" weight="medium" style={{
                                    position: 'relative',
                                    zIndex: 1, // Text stays above the background
                                    color: 'black', // Keep text color unchanged
                                }}>{suggestion}</Text>
                            </Box>
                        ))}
                    </Box>


                    {/* Message Input Box */}
                    <Box className="mobile-very-small:h-[12%] h-[8%]" mb="2" mx='4' style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: '8px',
                        backgroundColor: '#E3E3E3', // Combined background color from inner Box
                        padding: '0 10px', // Padding for the input and icons
                        width: 'calc(100% - 16px)',
                        gap: '10px'
                    }}>
                        <Image
                            src="/images/attach_file.svg"
                            alt="Attach File"
                            width={12}
                            height={12}
                            style={{ cursor: 'pointer' }}
                        />
                        <input
                            type="text"
                            placeholder="Message Tolystoy"
                            className="bg-[#E3E3E3]"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setCurrentMessage('');  // Clear the input field
                                    e.preventDefault();     // Optional: Prevent the default action of the enter key
                                }
                            }}
                            style={{
                                flexGrow: 1, // Input takes up all remaining space inside the box
                                height: '100%',
                                outline: 'none'
                            }}
                        />
                        <Image
                            src="/images/send_message.svg"
                            alt="Send Message"
                            width={16}
                            height={16}
                            style={{ cursor: 'pointer' }}
                        />
                    </Box>
                </Box>
            </Flex>
        </Flex >
    ) : (
        <Flex direction='column' className="bg-[#38B6FF] h-screen w-screen p-8" style={{ position: 'absolute' }}>
            <Flex className="h-[100%] w-[100%]" direction='column'>
                <Header />
                <Flex className="h-[100%] w-[85%] tablet-medium:w-[100%] mt-3" gapX='4' direction='row' style={{ justifySelf: 'center', alignSelf: 'center' }}>
                    <Box p='4' className="bg-[#EAF6FA] h-[100%] w-[25%] tablet-medium:w-[30%]" style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', borderRadius: '5px', boxShadow: '4px 4px 20px 4px rgba(0, 0, 0, 0.25)' }}>
                        <Box className="h-auto w-[100%]" pb='3' style={{ display: 'flex', flexDirection: 'row' }}>
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
                            <Flex pt='1' direction='column' gap='1' style={{ height: '100%', width: '100%' }}>
                                {conversations.map((conversation) => (
                                    <Box key={conversation.id} mr='4' p='1' style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: '100%',
                                        borderRadius: '4px',
                                        backgroundColor: 'rgba(194, 205, 208, 0.75)',
                                        boxShadow: '2px 2px 10px 1px rgba(0, 0, 0, 0.02)',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        overflow: 'clip'
                                    }}>
                                        <Text as="div" weight='medium' size="3" className="ml-1" style={{
                                            overflow: 'hidden', // Hides overflow
                                            whiteSpace: 'nowrap', // Keeps the text on a single line
                                            textOverflow: 'ellipsis', // Adds ellipsis when text overflows
                                            flex: 1, //
                                            width: '0',// Allows flex to control the width based on available space
                                            minWidth: '0'
                                        }}>{conversation.title}</Text>
                                        <Image
                                            className="mr-2"
                                            src="/images/delete_conversation.svg"
                                            alt="Delete Conversation"
                                            width={16}
                                            height={16}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Box>
                                ))}
                            </Flex>
                        </ScrollArea>
                    </Box>
                    <Box className="bg-[#EAF6FA] h-[100%] w-[75%] tablet-medium:w-[70%]" style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', borderRadius: '5px', justifyItems: 'center', alignItems: 'center' }}>
                        <ScrollArea type="hover" scrollbars="vertical" size="2" style={{ height: '100%', width: '100%', paddingTop: '20px' }}>
                            {conversations.map((conversation) => (
                                <Box key={conversation.id} ml='4' mr='4' mb='1' p='2' style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    borderRadius: '5px',
                                    backgroundColor: 'rgba(45, 156, 219, 0.5)',
                                    mixBlendMode: 'hard-light',
                                    justifyContent: 'left',
                                    alignItems: 'center',
                                    zIndex: 0,
                                    pointerEvents: 'none'
                                }}>
                                    <Text as="div" weight='medium' size="2" style={{
                                        overflow: 'visible', // Hides overflow
                                        whiteSpace: 'normal', // Keeps the text on a single line
                                        zIndex: 1,
                                        color: 'black'
                                    }}>{conversation.title}</Text>
                                </Box>
                            ))}
                        </ScrollArea>

                        {/* Suggestion Boxes */}
                        <Box px="2" style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '10px', // Space between suggestion boxes and input area
                            width: '80%',
                        }}>
                            {suggestions.map((suggestion, index) => (
                                <Box key={index} style={{
                                    position: 'relative',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    flex: 1, // Allows the box to expand to fit the available space
                                    textAlign: 'center',
                                    padding: '10px',
                                    overflow: 'hidden', // Ensure the background doesn't overflow
                                }}>
                                    {/* Background layer */}
                                    <Box style={{
                                        backgroundColor: '#F6C1A3',
                                        opacity: '0.5', // 50% opacity
                                        mixBlendMode: 'darken', // Darken blend mode
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        borderRadius: '15px',
                                        zIndex: 0, // Background is behind the text
                                    }}></Box>

                                    {/* Text layer */}
                                    <Text size="2" weight="medium" style={{
                                        position: 'relative',
                                        zIndex: 1, // Text stays above the background
                                        color: 'black', // Ensure text color remains black
                                    }}>{suggestion}</Text>
                                </Box>
                            ))}
                        </Box>

                        {/* Message Input Box */}
                        <Box mb='3' px="4" style={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '7%',
                            width: '100%',
                            borderRadius: '5px',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            {/* Menu Box */}
                            <Box p="3" className="mix-blend-multiply" style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '8px',
                                backgroundColor: '#EAF6FA',
                                cursor: 'pointer',
                                height: '100%',
                                width: 'auto',
                            }}>
                                <Image
                                    src="/images/menu.svg"
                                    alt="Menu"
                                    width={20}
                                    height={20}
                                />
                                <Text size="3" weight="medium" wrap="pretty" style={{ marginLeft: '8px' }}>Menu</Text>
                            </Box>

                            {/* Input Field Box */}
                            <Box className="bg-[#E3E3E3]" style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderRadius: '8px',
                                flexGrow: 1,
                                paddingLeft: '10px',
                                paddingRight: '10px',
                                height: '100%',
                                width: 'auto'
                            }}>
                                <Image
                                    src="/images/attach_file.svg"
                                    alt="Attach File"
                                    width={18}
                                    height={18}
                                    style={{ cursor: 'pointer', marginRight: '10px' }}
                                />
                                <input
                                    type="text"
                                    placeholder="Message Tolystoy"
                                    className="bg-[#E3E3E3]"
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            setCurrentMessage('');  // Clear the input field
                                            e.preventDefault();     // Optional: Prevent the default action of the enter key
                                        }
                                    }}
                                    style={{
                                        flexGrow: 1, // Input takes up all remaining space inside the box
                                        height: '100%',
                                        outline: 'none',
                                        border: 'none', // Remove default border
                                        marginLeft: '10px',
                                        paddingRight: '10px', // Ensure space for the send button
                                    }}
                                />
                                <Image
                                    src="/images/send_message.svg"
                                    alt="Send Message"
                                    width={22}
                                    height={22}
                                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                                />
                            </Box>
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
