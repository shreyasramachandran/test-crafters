import { Flex, Box, Text, Button } from "@radix-ui/themes"

export default function Page() {

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
                            placeholder="Email"
                            style={{ 'height': '75%', 'width': '100%', 'borderRadius': '5px' }}
                        />
                    </Box>
                    <Box style={{ 'height': '15%', 'width': '77%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Button style={{ 'height': '75%', 'width': '100%', 'borderRadius': '5px' }} size="3" variant='solid'>Verify Account</Button>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    )
}