import { Flex, Box, Text, Button } from "@radix-ui/themes"

export default function Page() {

    return (
        <Flex height={{ md: '100vh' }} width={{ md: '100vw' }} justify='center' align='center'>
            <Box className="bg-blue-500" style={{ 'height': '55%', 'width': '30%' }}>
                <Flex className="h-full" direction='column' justify='start' gap='8' py='8'>
                    <Box className="bg-green-500" style={{ 'height': '10%', 'width': '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text color='gray' size='6' weight='bold' wrap='pretty'>Verification</Text>
                    </Box>
                    <Box className="bg-green-500" style={{ 'height': '10%', 'width': '20%', display: 'flex', textAlign: 'left', justifyContent: 'center', alignItems: 'center' }}>
                        <Text color='gray' size='5' weight='light' wrap='pretty'>Please enter the verification code sent at email address</Text>
                    </Box>
                    <Box className="bg-green-500" style={{ 'height': '10%', 'width': '60%', display: 'flex', justifyContent: 'end', alignItems: 'center', alignSelf: 'center' }}>
                        <input
                            type="text"
                            className="border-2 border-gray-300 bg-white h-10 px-5  text-sm focus:outline-none"
                            placeholder="Email"
                            style={{ 'height': '100%', 'width': '100%' }}
                        />
                    </Box>
                    <Box className="bg-green-500" style={{ 'height': '10%', 'width': '60%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Button style={{ 'height': '100%', 'width': '100%', borderRadius: 0 }} size="3" variant='classic'>Verify Account</Button>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    )
}