import { Flex, Box, Text, Button } from "@radix-ui/themes";

export default function Page() {
    return (
        <Flex height={{ md: '100vh' }} width={{ md: '100vw' }} justify='center' align='center'>
            <Box className="bg-blue-500" style={{ 'height': '65%', 'width': '50%' }}>
                <Flex className="h-full" direction='column' justify='center' align='center' gap='2' py='8'>
                    <Box className="bg-green-500" style={{ 'height': '25%', 'width': '70%', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'start', 'alignItems': 'start' }}>
                        <Text size='6' weight='bold' wrap='pretty' >Category 1</Text>
                        <Text size='4' weight='light' wrap='pretty' >You scored this 20 in topic category 1. You can improve by doing so and so.</Text>
                    </Box>
                    <Box className="bg-stone-500" style={{ 'height': '25%', 'width': '70%', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'start', 'alignItems': 'start' }}>
                        <Text size='6' weight='bold' wrap='pretty' >Category 2</Text>
                        <Text size='4' weight='light' wrap='pretty' >You scored this 20 in topic category 2. You can improve by doing so and so.</Text>
                    </Box>
                    <Box className="bg-indigo-500" style={{ 'height': '25%', 'width': '70%', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'start', 'alignItems': 'start' }}>
                        <Text size='6' weight='bold' wrap='pretty' >Category 3</Text>
                        <Text size='4' weight='light' wrap='pretty' >You scored this 20 in topic category 3. You can improve by doing so and so.</Text>
                    </Box>
                    <Box className="bg-purple-500" style={{ 'height': '25%', 'width': '70%', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'start', 'alignItems': 'start' }}>
                        <Text size='6' weight='bold' wrap='pretty' >Category 4</Text>
                        <Text size='4' weight='light' wrap='pretty' >You scored this 20 in topic category 4. You can improve by doing so and so.</Text>
                    </Box>
                    <Box className="bg-yellow-500 gap-10" style={{ 'height': '15%', 'width': '40%', 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}>
                        <Button style={{ borderRadius: '5px' }} size="3" variant='classic'>Give another mock test</Button>
                        <Button style={{ borderRadius: '5px' }} size="3" variant='classic'>Na I am good</Button>
                    </Box>
                </Flex >
            </Box >
        </Flex >
    )
}