import { Flex, Box, Text, Button } from "@radix-ui/themes";

export default function Page() {
    return (
        <Flex className="bg-[#F6F7FB] flex-col items-center justify-center h-screen w-screen gap-4 p-8">
            <Box className="px-4" style={{ 'height': '20%', 'width': '35%', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'start', 'borderRadius': '5px', 'boxShadow': '4px 4px 25px 5px rgba(0, 0, 0, 0.25)' }}>
                <Text size='5' weight='bold' wrap='pretty' >Category 1</Text>
                <Text size='4' weight='light' wrap='pretty' >You scored this 20 in topic category 1. You can improve by doing so and so.</Text>
            </Box>
            <Box className="px-4" style={{ 'height': '20%', 'width': '35%', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'start', 'borderRadius': '5px', 'boxShadow': '4px 4px 25px 5px rgba(0, 0, 0, 0.25)' }}>
                <Text size='5' weight='bold' wrap='pretty' >Category 2</Text>
                <Text size='4' weight='light' wrap='pretty' >You scored this 20 in topic category 2. You can improve by doing so and so.</Text>
            </Box>
            <Box className="px-4" style={{ 'height': '20%', 'width': '35%', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'start', 'borderRadius': '5px', 'boxShadow': '4px 4px 25px 5px rgba(0, 0, 0, 0.25)' }}>
                <Text size='5' weight='bold' wrap='pretty' >Category 3</Text>
                <Text size='4' weight='light' wrap='pretty' >You scored this 20 in topic category 3. You can improve by doing so and so.</Text>
            </Box>
            <Box className="px-4" style={{ 'height': '20%', 'width': '35%', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'start', 'borderRadius': '5px', 'boxShadow': '4px 4px 25px 5px rgba(0, 0, 0, 0.25)' }}>
                <Text size='5' weight='bold' wrap='pretty' >Category 4</Text>
                <Text size='4' weight='light' wrap='pretty' >You scored this 20 in topic category 4. You can improve by doing so and so.</Text>
            </Box>
            <Box className="px-4 gap-10" style={{ 'height': '15%', 'width': '40%', 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}>
                <Button style={{ borderRadius: '5px' }} size="3" variant='solid'>Give another mock test</Button>
                <Button style={{ borderRadius: '5px' }} size="3" variant='solid'>Na I am good</Button>
            </Box>
        </Flex >
    )
}