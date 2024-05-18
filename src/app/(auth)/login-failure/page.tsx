'use client'

import { Flex, Box, Text, Button } from "@radix-ui/themes";
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();


    const handleRetry = () => {
        router.replace('/sign-in');
    };

    return (
        <Flex className="bg-[#38B6FF]" height={{ md: '100vh' }} width={{ md: '100vw' }} justify='center' align='center'>
            <Box className="bg-[#EAF6FA]" style={{ 'height': '55%', 'width': '30%', 'borderRadius': '5px', 'boxShadow': '4px 4px 50px 5px rgba(0, 0, 0, 0.25)' }}>
                <Flex className="h-full" direction='column' justify='start' gap='8' pt='8'>
                    <Box style={{ 'height': '15%', 'width': '53.5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text size='6' weight='bold' wrap='pretty'>Log In Failed</Text>
                    </Box>
                    <Box style={{ 'height': '25%', 'width': '77%', 'display': 'flex', textAlign: 'left', alignSelf: 'center' }}>
                        <Text size='4' weight='light' wrap='pretty'>We were unable to log you in with the provided credentials. Please try again or contact support if the problem persists.</Text>
                    </Box>
                    <Box style={{ 'height': '15%', 'width': '77%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Button style={{ 'height': '75%', 'width': '100%', 'borderRadius': '5px', 'backgroundColor': '#120052' }} size="3" variant='solid' onClick={handleRetry}>Retry</Button>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    )
}
