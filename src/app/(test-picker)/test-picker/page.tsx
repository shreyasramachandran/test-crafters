'use client'
import useAuth from "@/app/hooks/useAuth";
import { useRouter, useSearchParams } from 'next/navigation';
import { Flex, Box, Text, DropdownMenu, Button, Dialog } from "@radix-ui/themes"
import { useState, useCallback, useEffect } from 'react';
import db from '@/app/utils/indexedDbUtils';
import { Suspense } from 'react'
import dynamic from "next/dynamic";
import OrigamiAnimation from "@/app/components/splash-screen/OrigamiAnimation";
import Header from "@/app/components/header/Header";
import { encryptParams } from "@/app/utils/paramUtils";

type UserWallet = {
    balance: number;
}

interface CreateTransactionParams {
    amount: number;
    currency: string;
    description: string;
    status: boolean;
}

const MainComponent = () => {
    // Get isAuthenticated in case you need to use it for future operations
    console.log('test picker component mounted')
    const router = useRouter();
    const searchParams = useSearchParams()
    const { isAuthenticated, loading } = useAuth();
    const [userWallet, setUserWallet] = useState<UserWallet | null>(null);
    const [alertOpen, setAlertOpen] = useState(false);


    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (searchParams: URLSearchParams, queryParams: Record<string, string>) => {
            const params = new URLSearchParams(searchParams.toString())
            // Add each query parameter to the URLSearchParams object
            Object.entries(queryParams).forEach(([name, value]) => {
                params.set(name, value);
            });
            const encodedParams = encryptParams(Object.fromEntries(params));
            return `params=${encodedParams}`;
        },
        []
    );

    // These need to be populated from metadata
    const subjects = ['Political Science', 'English', 'French', 'Agriculture', 'Chemistry',
        'General Test', 'Physics', 'Sociology', 'Computer Science', 'Home Science', 'Economics', 'Legal Studies', 'Fine Arts',
        'Anthropolgy', 'Olympiad English']
    const languages = ['English']

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

    async function fetchEWalletBalance() {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
            const res = await fetch(`${baseUrl}/get-wallet-balance`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                },
                credentials: 'include'
            });
            if (!res.ok) {
                throw new Error(`Error in ewalletdata response`);
            }
            const data = await res.json();
            setUserWallet(data.data.userWallet);
        } catch (error) {
            console.error(`Error fetching ewalletdata:`, error);
        }
    }

    useEffect(() => {
        fetchEWalletBalance();
    }, []);

    async function createTransaction() {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
            const body: CreateTransactionParams = {
                amount: -5,
                currency: "INR",
                description: `Taking Test`,
                status: true
            };
            const res = await fetch(`${baseUrl}/create-transaction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(body),
                credentials: 'include'
            });
            if (!res.ok) {
                throw new Error(`Error creating transaction, status = ${res.status}`);
            }
        } catch (error) {
            console.error("Error creating transaction:", error);
            throw error;
        }
    }

    async function createTest() {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
            const res = await fetch(`${baseUrl}/create-test`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache"
                },
                credentials: 'include'
            });
            if (!res.ok) {
                throw new Error(`Error creating test, status = ${res.status}`);
            }
        } catch (error) {
            console.error("Error creating test:", error);
            throw error;
        }
    }

    const handleStartMockTest = async () => {
        if (selectedSubject !== 'Subject' && duration !== 'Duration') {
            if (userWallet && userWallet.balance >= 5) {
                setUserWallet({ ...userWallet, balance: userWallet.balance - 5 });
                await createTransaction();
                await createTest();
                const queryString = createQueryString(searchParams, { subject: selectedSubject, language: selectedLanguage, duration: duration, maxQuestions: maxQuestions, minimumRequiredQuestions: minimumRequiredQuestions });
                router.push('/instructions-page' + '?' + queryString);
            } else {
                setAlertOpen(true);
                setTimeout(() => {
                    setAlertOpen(false);
                }, 3000);
            }
        }
    }

    if (loading) {
        return <OrigamiAnimation />;
    }

    if (!isAuthenticated) {
        return <OrigamiAnimation />;
    }

    if (!userWallet) {
        return <OrigamiAnimation />;
    }

    return (
        <Flex direction='column' className="bg-[#38B6FF] p-8" height={{ md: '100vh' }} width={{ md: '100vw' }} justify='center' align='center' style={{ position: 'absolute' }}>
            <Flex direction='column' style={{ 'height': '100%', 'width': '100%' }}>
                <Header></Header>
                <Box className="bg-[#EAF6FA] m-24" style={{ 'height': '64%', 'width': '30%', 'borderRadius': '5px', 'boxShadow': '4px 4px 50px 5px rgba(0, 0, 0, 0.25)', alignSelf: 'center', justifySelf: 'center' }}>
                    <Flex className="h-full" direction='column' py='9' gap='6'>
                        <Box style={{ 'height': '10%', 'width': '47%', display: 'flex', 'flexDirection': 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <img src="images/filter.svg" alt="Filter" className="w-7 h-7 ml-8" />
                            <Text size='6' className="ml-3" weight='bold' wrap='pretty'>Pick a test</Text>
                        </Box>
                        <Flex className="h-full" direction='column' justify='center' gap='5'>
                            <Box style={{ height: '42%', width: '77%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
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
                                    <DropdownMenu.Content style={{ 'backgroundColor': '#EAF6FA' }} className="bg-white shadow-lg rounded-md py-1 mt-1">
                                        {subjects.map((subject) => (
                                            <DropdownMenu.Item key={subject} onSelect={() => handleSubjectChange(subject)} className="px-4 py-2 text-sm text-gray-700 hover:bg-[#120052]">
                                                {subject}
                                            </DropdownMenu.Item>
                                        ))}
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </Box>
                            <Box style={{ height: '42%', width: '77%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
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
                                    <DropdownMenu.Content style={{ 'backgroundColor': '#EAF6FA' }} className="bg-white shadow-lg rounded-md py-1 mt-1">
                                        {languages.map((language) => (
                                            <DropdownMenu.Item key={language} onSelect={() => handleLanguageChange(language)} className="px-4 py-2 text-sm text-gray-700 hover:bg-[#120052]">
                                                {language}
                                            </DropdownMenu.Item>
                                        ))}
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </Box>
                        </Flex>
                        <Flex className="h-full" direction='column' justify='center' gap='4'>
                            <Box style={{ 'height': '40%', 'width': '77%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                <Button style={{ 'height': '100%', 'width': '100%', 'borderRadius': '5px', 'boxShadow': '4px 4px 50px 5px rgba(0, 0, 0, 0.25)', 'backgroundColor': '#120052', cursor: 'pointer' }} size="3" variant='solid' onClick={handleStartMockTest}>Start Mock Test
                                </Button>
                            </Box>
                        </Flex>
                    </Flex>
                </Box >
            </Flex>
            {/* Alert Dialog */}
            <Dialog.Root open={alertOpen} onOpenChange={setAlertOpen}>
                <Dialog.Content className="bg-[#EAF6FA]" style={{ 'display': 'flex', 'flexDirection': 'column', 'padding': '20px', 'borderRadius': '5px', 'boxShadow': '4px 4px 50px 5px rgba(0, 0, 0, 0.25)', 'alignSelf': 'center', 'justifySelf': 'center', zIndex: 9999 }}>
                    <Dialog.Title size='5' >Insufficient Balance</Dialog.Title>
                    <Dialog.Description size="4">
                        Your balance is insufficient to start a mock test. Please add funds.
                    </Dialog.Description>
                </Dialog.Content>
            </Dialog.Root>
        </Flex >
    )
}

// Dynamically import MainComponent with ssr: false
const DynamicMainComponent = dynamic(() => Promise.resolve(MainComponent));

const Page = () => (
    <Suspense fallback={<OrigamiAnimation />}>
        <DynamicMainComponent />
    </Suspense>
);

export default Page;