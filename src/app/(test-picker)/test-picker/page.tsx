import { Flex, Box, Text, DropdownMenu, Button } from "@radix-ui/themes"

export default function Page() {
    const subjects = ['English', 'Hindi', 'Mathematics', 'Physics', 'Chemistry']
    const languages = ['English', 'Hindi']

    return (
        <Flex height={{ md: '100vh' }} width={{ md: '100vw' }} justify='center' align='center'>
            <Box className="bg-blue-500" style={{ 'height': '65%', 'width': '30%' }}>
                <Flex className="h-full" direction='column' justify='center' gap='2' py='8'>
                    <Box className="bg-green-500" style={{ 'height': '15%', 'width': '30%' }}>
                        <Text color='gray' size='6' weight='bold' wrap='pretty'>Pick a test</Text>
                    </Box>
                    <Flex className="h-full" direction='column' justify='center' gap='4'>
                        <Box className="bg-green-500" style={{ height: '20%', width: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <button className="flex justify-between items-center px-4 py-2 bg-skyblue-200 border border-gray-300 rounded-lg text-gray-700 shadow-sm w-full h-full">
                                        Subject
                                        <span className="ml-2">
                                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content className="bg-white shadow-lg rounded-md py-1 mt-1">
                                    {subjects.map((subject) => (
                                        <DropdownMenu.Item key={subject} className="px-4 py-2 text-sm text-gray-700 hover:bg-skyblue-100">
                                            {subject}
                                        </DropdownMenu.Item>
                                    ))}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </Box>
                        <Box className="bg-green-500" style={{ height: '20%', width: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <button className="flex justify-between items-center px-4 py-2 bg-skyblue-200 border border-gray-300 rounded-lg text-gray-700 shadow-sm w-full h-full">
                                        Language
                                        <span className="ml-2">
                                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content className="bg-white shadow-lg rounded-md py-1 mt-1">
                                    {languages.map((language) => (
                                        <DropdownMenu.Item key={language} className="px-4 py-2 text-sm text-gray-700 hover:bg-skyblue-100">
                                            {language}
                                        </DropdownMenu.Item>
                                    ))}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </Box>
                    </Flex>
                    <Flex className="h-full" direction='column' justify='center' gap='4'>
                        <Box className="bg-green-500" style={{ 'height': '20%', 'width': '60%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <Button style={{ 'height': '100%', 'width': '100%', borderRadius: 0 }} size="3" variant='classic'>Start Mock Test</Button>
                        </Box>
                        <Box className="bg-green-500" style={{ 'height': '10%', 'width': '60%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <div className="flex items-center justify-center w-full">
                                <div className="flex-grow border-t border-black"></div>
                                <span className="flex-shrink mx-4 text-black">or</span>
                                <div className="flex-grow border-t border-black"></div>
                            </div>
                        </Box>
                        <Box className="bg-green-500" style={{ 'height': '20%', 'width': '60%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <Button style={{ 'height': '100%', 'width': '100%', borderRadius: 0 }} size="3" variant='classic'>Download Paper</Button>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    )
}