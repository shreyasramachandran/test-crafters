import { Text, Box, Flex, TextField, IconButton, Button } from "@radix-ui/themes";

interface ReferProps {
    code: string;
}

export default function Refer({ code }: ReferProps) {
    return (
        <Flex direction='column' gap='5' style={{ width: '100%' }}>
            <Box p='6' className="bg-[#EAF6FA]" style={{ 'justifyContent': 'space-between', 'display': 'flex', 'flexDirection': 'column', 'height': '100%', 'width': '100%', 'borderRadius': '5px', 'boxShadow': '4px 4px 50px 5px rgba(0, 0, 0, 0.25)', gap: '30px' }}>
                <Box style={{ 'display': 'flex', 'flexDirection': 'row', 'height': '10%', 'width': '100%', alignItems: 'center' }}>
                    <img src="images/refer.svg" alt="Refer" className="w-6 h-6" />
                    <Text as="div" size="6" className="ml-3">Refer</Text>
                </Box>
                <Box>
                    <TextField.Root readOnly size="3" variant="soft" placeholder={code} className="bg-[#EAF6FA]">
                        <TextField.Slot pr="3">
                            <IconButton size="2" variant="ghost">
                                <img src="images/copy.svg" alt="Refer" className="w-5 h-5" />
                            </IconButton>
                        </TextField.Slot>
                    </TextField.Root>
                </Box>
                <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052', cursor: 'pointer' }} size="3" variant='solid'>Share</Button>
            </Box>
        </Flex>
    )
}