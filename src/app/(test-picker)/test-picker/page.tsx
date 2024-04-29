'use client'
import useAuth from "@/app/hooks/useAuth";
import { useRouter, useSearchParams } from 'next/navigation';
import { Flex, Box, Text, DropdownMenu, Button } from "@radix-ui/themes"
import { useState, useCallback, useEffect, useRef } from 'react';
import db from '@/app/utils/index-db/operations';

export default function Page() {
    // Get isAuthenticated in case you need to use it for future operations
    const router = useRouter();
    const searchParams = useSearchParams()

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (searchParams: URLSearchParams, queryParams: Record<string, string>) => {
            const params = new URLSearchParams(searchParams.toString())


            // Add each query parameter to the URLSearchParams object
            Object.entries(queryParams).forEach(([name, value]) => {
                params.set(name, value);
            });

            return params.toString();
        },
        []
    );

    const isAuthenticated = useAuth();
    // These need to be populated from metadata
    const subjects = ['English', 'Hindi', 'Mathematics', 'Physics', 'Chemistry']
    const languages = ['English', 'Hindi']

    const [selectedSubject, setSelectedSubject] = useState("Subject");
    const [selectedLanguage, setSelectedLanguage] = useState("Language");
    const [duration, setDuration] = useState("Duration");
    const [maxQuestions, setMaxQuestions] = useState("MaxQuestions");
    const [minimumRequiredQuestions, setMinimumRequiredQuestions] = useState("MinimumRequiredQuestions");



    // Event handlers to update the respective state variables
    const handleSubjectChange = (subject: string) => {
        setSelectedSubject(subject);
    };

    const handleLanguageChange = (language: string) => {
        setSelectedLanguage(language);
    };

    async function filterMetadata(subject: string) {
        try {
            const [filteredMetadata] = await db.filterMetadataBySubject(subject);
            const { duration, maxQuestions, minimumRequiredQuestions } = filteredMetadata;
            setDuration(duration as string)
            setMaxQuestions(maxQuestions as string)
            setMinimumRequiredQuestions(minimumRequiredQuestions as string)
        } catch (error) {
            console.error("Failed to fetch metadata:", error);
        }
    }

    useEffect(() => {
        db.initializeDatabase().then(() => {
            console.log("Database initialized in Some Component.");
        }).catch(error => {
            console.error("Error initializing database in Some Component:", error);
        });
        // Store the user record for future use if any
        const record = {
            googleUserEmail: localStorage.getItem('google_user_email') || '',
            googleUserName: localStorage.getItem('google_user_name') || '',
            googleUserPicture: localStorage.getItem('google_user_picture') || '',
            otherEmail: localStorage.getItem('other_email') || '',
            otherPassword: localStorage.getItem('other_password') || ''
        }
        db.addRecord('user', record).then(() => {
            console.log("User record added.");
        }).catch(error => {
            console.error("Error adding user record:", error);
        });
    }, []);


    useEffect(() => {
        if (selectedSubject !== 'Subject') {
            filterMetadata(selectedSubject)
        }
    }, [selectedSubject])


    return (
        <Flex className="bg-[#F6F7FB]" height={{ md: '100vh' }} width={{ md: '100vw' }} justify='center' align='center'>
            <Box className="bg-white" style={{ 'height': '80%', 'width': '30%', 'borderRadius': '5px', 'boxShadow': '4px 4px 50px 5px rgba(0, 0, 0, 0.25)' }}>
                <Flex className="h-full" direction='column' justify='center' py='9'>
                    <Box style={{ 'height': '10%', 'width': '47%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text size='6' weight='bold' wrap='pretty'>Pick a test</Text>
                    </Box>
                    <Flex className="h-full" direction='column' justify='center' gap='5'>
                        <Box style={{ height: '20%', width: '77%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <button className="flex justify-between items-center px-4 py-2 bg-skyblue-200 border border-solid border-[#79747E] rounded-lg text-gray-700 shadow-sm w-full h-full">
                                        {selectedSubject}
                                        <span className="ml-2">
                                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content className="bg-white shadow-lg rounded-md py-1 mt-1">
                                    {subjects.map((subject) => (
                                        <DropdownMenu.Item key={subject} onSelect={() => handleSubjectChange(subject)} className="px-4 py-2 text-sm text-gray-700 hover:bg-skyblue-100">
                                            {subject}
                                        </DropdownMenu.Item>
                                    ))}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </Box>
                        <Box style={{ height: '20%', width: '77%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <button className="flex justify-between items-center px-4 py-2 bg-skyblue-200 border border-solid border-[#79747E] rounded-lg text-gray-700 shadow-sm w-full h-full">
                                        {selectedLanguage}
                                        <span className="ml-2">
                                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content className="bg-white shadow-lg rounded-md py-1 mt-1">
                                    {languages.map((language) => (
                                        <DropdownMenu.Item key={language} onSelect={() => handleLanguageChange(language)} className="px-4 py-2 text-sm text-gray-700 hover:bg-skyblue-100">
                                            {language}
                                        </DropdownMenu.Item>
                                    ))}
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </Box>
                    </Flex>
                    <Flex className="h-full" direction='column' justify='center' gap='4'>
                        <Box style={{ 'height': '20%', 'width': '77%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <Button style={{ 'height': '100%', 'width': '100%', borderRadius: '5px' }} size="3" variant='solid' onClick={() => {
                                if (selectedSubject !== 'Subject' && duration !== 'Duration') {
                                    const queryString = createQueryString(searchParams, { subject: 'english', language: 'english', duration: duration, maxQuestions: maxQuestions, minimumRequiredQuestions: minimumRequiredQuestions });
                                    router.push('/instructions-page' + '?' + queryString)
                                }
                            }}>Start Mock Test
                            </Button>
                        </Box>
                        <Box style={{ 'height': '10%', 'width': '77%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <div className="flex items-center justify-center w-full">
                                <div className="flex-grow border-t border-black"></div>
                                <span className="flex-shrink mx-4 text-black">or</span>
                                <div className="flex-grow border-t border-black"></div>
                            </div>
                        </Box>
                        <Box style={{ 'height': '20%', 'width': '77%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <Button style={{ 'height': '100%', 'width': '100%', borderRadius: '5px' }} size="3" variant='solid'>Download Paper</Button>
                        </Box>
                    </Flex>
                </Flex>
            </Box >
        </Flex >
    )
}