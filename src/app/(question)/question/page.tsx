import { Flex, Box, Text, Button, RadioGroup } from "@radix-ui/themes";

export default function Page() {
    const options = ['Unprecedented', 'Unpronounceable', 'Unprotected', 'Unquiet']
    return (
        <Flex direction='column' height={{ md: '100vh' }} width={{ md: '100vw' }}>
            <Box className="bg-[#0144FF] bg-opacity-[0.059]" flexGrow='1' style={{ height: '5%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text color='indigo' size='6' weight='bold' wrap='pretty' >CUET Mock Test</Text>
            </Box>
            <Box className="bg-indigo-500" style={{ 'height': '85%', 'width': '100%' }}>
                <Flex style={{ height: '100%', width: '100%' }} gap='4'>
                    <Box className="bg-stone-500" style={{ 'height': '100%', 'width': '70%' }}>
                        <Flex direction='column' style={{ height: '100%', width: '100%' }} gap='4'>
                            <Box className="bg-red-500" style={{ 'height': '20%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <Text className="pl-8" size='6' weight='bold' wrap='pretty' >Question 1</Text>
                            </Box>
                            <Box className="bg-red-500" style={{ 'height': '5%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <div className="flex items-center justify-center w-full p-8">
                                    <div className="flex-grow border-t border-black"></div>
                                </div>
                            </Box>
                            <Box className="bg-red-500" style={{ 'height': '20%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <Text className="pl-8" size='6' weight='light' wrap='pretty' >Find out one substitution for the following phrase from the options given below
                                    &ldquo;Never done or known before&rdquo;.</Text>
                            </Box>
                            <Box className="bg-red-500" style={{ 'height': '20%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <RadioGroup.Root size='3' name="Options" className="pl-8">
                                    {options.map((option, index) => (
                                        <RadioGroup.Item key={index} value={option}>
                                            {option}
                                        </RadioGroup.Item>
                                    ))}
                                </RadioGroup.Root>
                            </Box>
                            <Box className="bg-red-500" style={{ 'height': '5%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <div className="flex items-center justify-center w-full p-8">
                                    <div className="flex-grow border-t border-black"></div>
                                </div>
                            </Box>
                            <Box className="bg-red-500 gap-8" style={{ 'height': '10%', 'width': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center' }}>
                                <Button style={{ borderRadius: '5px' }} size="3" variant='classic'>Save and Next</Button>
                                <Button style={{ borderRadius: '5px' }} size="3" variant='classic'>Clear Response</Button>
                                <Button style={{ borderRadius: '5px' }} size="3" variant='classic'>Save and Mark for Review</Button>
                                <Button style={{ borderRadius: '5px' }} size="3" variant='classic'>Mark for Review and Next</Button>
                            </Box>
                        </Flex>
                    </Box>
                    <Box className="bg-stone-500" style={{ 'height': '100%', 'width': '30%' }}>
                        <Flex direction='column' style={{ height: '100%', width: '100%' }}>
                            <Box className="bg-red-500" style={{ 'height': '20%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <Text className="pl-8" size='4' weight='bold' wrap='pretty' >Question Palette</Text>
                            </Box>
                            <Box className="bg-red-500 pl-8" style={{ 'height': '65%', 'width': '100%', 'display': 'grid', 'gridTemplateColumns': 'repeat(8, 1fr)', 'gap': '1rem', 'alignItems': 'center', 'justifyItems': 'center' }}>

                                {Array.from({ length: 50 }).map((_, index) => (
                                    <div key={index} className="flex flex-col items-center justify-center"> {/* Add key prop here */}
                                        <div className="w-8 h-8 flex items-center justify-center rounded-lg text-white bg-gradient-to-tr from-stone-500 to-stone-100">
                                            {index + 1}
                                        </div>
                                    </div>
                                ))}

                            </Box>

                            <Box className="bg-red-500" style={{ 'height': '5%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <Text className="pl-8" size='4' weight='bold' wrap='pretty' >Legend</Text>
                            </Box>
                            <Box className="bg-red-500" style={{ 'height': '26%', 'width': '100%', 'display': 'grid', 'gridTemplateRows': '1fr 1fr 2fr', 'gridTemplateColumns': '1fr 2fr', 'alignItems': 'center' }}>
                                <div className="pl-8 flex flex-row items-center justify-center">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-lg text-white bg-gradient-to-tr from-stone-500 to-stone-100">
                                        1
                                    </div>
                                    <div className="pl-1">Not Visited</div>
                                </div>
                                <div className="flex flex-row items-center justify-center">
                                    <div className="relative inline-block">
                                        <img src="/not_answered.svg" alt="Custom Vector" className="block w-full h-auto" />
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-l">1</span>
                                    </div>
                                    <div className="pl-1">Not Answered</div>
                                </div>
                                <div className="pl-6 flex flex-row items-center justify-center">
                                    <div className="relative inline-block">
                                        <img src="/answered.svg" alt="Custom Vector" className="block w-full h-auto" />
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-l">1</span>
                                    </div>
                                    <div className="pl-1">Answered</div>
                                </div>
                                <div className="pl-8 flex flex-row items-center justify-center">
                                    <div className="relative inline-block">
                                        <img src="/marked_for_review.svg" alt="Custom Vector" className="block w-full h-auto" />
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-l">1</span>
                                    </div>
                                    <div className="pl-1">Marked for Review</div>
                                </div>
                                <div className="pl-8 flex flex-row items-center justify-center" style={{ 'gridColumn': '1 / span 2', 'gridRow': '3 / 4' }}>
                                    <div className="relative inline-block">
                                        <img src="/marked_for_review_other.svg" alt="Custom Vector" className="block w-12 h-12" />
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-l">1</span>
                                    </div>
                                    <div className="pl-1">Answered & Marked for Review (will be considered for evaluation)</div>
                                </div>
                            </Box>
                        </Flex>
                    </Box>
                </Flex >
            </Box >
        </Flex >
    )
}