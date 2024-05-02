'use client'
import { Flex, Box, ScrollArea, Grid, Text, Button, Card } from "@radix-ui/themes";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Page() {
    const router = useRouter();

    return (
        <ScrollArea type="always" scrollbars="vertical" size="2" style={{ height: '100vh' }}>
            <Flex direction='column'>
                <Box className="bg-white" height='64px' flexGrow='1' style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                    <Flex className="h-full" justify='between' align='center' px='6'>
                        <Text color='indigo' size='7' weight='bold' wrap='pretty'>Cuet Test Crafters</Text>
                        <Flex className="h-full" gap='4' justify='center' align='center'>
                            <Link href="#maximize-prep" scroll>
                                <Text color='gray' size='5' weight='medium' wrap='pretty'>Features</Text>
                            </Link>
                            <Link href="#get-started-now" scroll>
                                <Text color='gray' size='5' weight='medium' wrap='pretty'>How It Works</Text>
                            </Link>
                        </Flex>
                        <Flex className="h-full" gap='4' justify='center' align='center'>
                            <div style={{ cursor: 'pointer' }} onClick={() => router.push('/sign-in')}>
                                <Text color='gray' size='5' weight='medium' wrap='nowrap'>Log In</Text>
                            </div>
                            <Button style={{ height: '60%', width: '60%' }} variant='solid' onClick={() => router.push('/sign-up')}>Sign Up</Button>
                        </Flex>
                    </Flex>
                </Box>
                <Box className="bg-[#F6F7FB]" height='730px' flexGrow='1' position='relative'>
                    <img src="landing_page_cover.webp" alt="Background Image" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
                    <Flex className="h-full" style={{ position: 'relative', zIndex: 2 }} direction='column' gap='9' justify='center' align='start' pl='6'>
                        <Box style={{ height: '20%' }} width={{ md: '40vw' }} >
                            <Text className="text-stone-800" size='9' weight='bold' wrap='pretty'>Conquer CUET exam with confidence</Text>
                        </Box>
                        <Box style={{ height: '40%' }} width={{ md: '40vw' }}>
                            <Text className="text-stone-800" size='8' weight='light' wrap='pretty'>Ace your CUET with ease! Explore, practice,
                                and perfect your skills with our free, detailed practice tests. Then harness the power of detailed post-test analysis
                                to sharpen your skills. Where excellence meets preparation, your journey to top scores begins.</Text>
                        </Box>
                        <Box style={{ height: '8%' }} width={{ md: '12vw' }}>
                            <Button size="4" variant='solid' onClick={() => router.push('/sign-up')}>Sign Up Now</Button>
                        </Box>
                    </Flex>
                </Box>
                <Box className="bg-[#F6F7FB]" height='712px' flexGrow='1' id="maximize-prep">
                    <Flex className="h-full" direction='column' gap='6' justify='center' align='center'>
                        <Box style={{ height: '30%', display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }} width={{ md: '60vw' }}>
                            <Text className="text-stone-800" size='9' weight='bold' wrap='wrap'>
                                Maximize prep with our mock tests and analysis
                            </Text>
                        </Box>
                        <Box style={{ height: '55%', width: '70%', boxShadow: '4px 4px 25px 5px rgba(0, 0, 0, 0.25)', padding: 0 }}  >
                            <Flex className="h-full" gap='3' justify='center' align='center' px='6'>
                                <Box style={{ height: '70%' }} width={{ md: '25vw' }}>
                                    <Flex className="h-full" direction='column' gap='3' justify='center' align='center' py='3'>
                                        <Box style={{ height: '75%', width: '75%' }}>
                                            <Card style={{ height: '100%', width: '100%', padding: 0 }}>
                                                <img src="/comprehensive_mock_tests.svg" alt="Comprehensive Mock Tests" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </Card>
                                        </Box>
                                        <Box style={{ height: '20%', width: '95%', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                            <Text className="text-black" size='6' weight='medium' wrap='wrap'>
                                                Comprehensive Mock Tests
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Box style={{ height: '70%' }} width={{ md: '25vw' }}>
                                    <Flex className="h-full" direction='column' gap='3' justify='center' align='center' py='3'>
                                        <Box style={{ height: '70%', width: '75%' }} >
                                            <Card style={{ height: '100%', width: '100%', padding: 0 }}>
                                                <img src="/instant_test_analysis.svg" alt="Instant Test Analysis" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </Card>
                                        </Box>
                                        <Box style={{ height: '20%', width: '85%', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }} >
                                            <Text className="text-black" size='6' weight='medium' wrap='wrap'>
                                                Instant Test Analysis
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Box style={{ height: '70%' }} width={{ md: '25vw' }}>
                                    <Flex className="h-full" direction='column' gap='3' justify='center' align='center' py='3'>
                                        <Box style={{ height: '70%', width: '75%' }} >
                                            <Card style={{ height: '100%', width: '100%', padding: 0 }}>
                                                <img src="/absolutely_free_access.svg" alt="Absolutely Free Access" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </Card>
                                        </Box>
                                        <Box style={{ height: '20%', width: '85%', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }} >
                                            <Text className="text-black" size='6' weight='medium' wrap='wrap'>
                                                Absolutely Free Access
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Box className="bg-[#F6F7FB]" height='256px' flexGrow='1' pt='9'>
                    <Flex className="h-full" direction='column' gap='3' justify='center' align='center' pt='9'>
                        <Box style={{ height: '45%', width: '10%', display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                            <Button size="4" variant='solid' onClick={() => router.push('/sign-up')} id="get-started-now">Get Started Now</Button>
                        </Box>
                    </Flex>
                </Box>
                <Box className="bg-[#F6F7FB]" height='2048px' flexGrow='1'>
                    <Flex className="h-full" direction='column' gap='9' justify='center' align='center'>
                        <Box style={{ height: '27%', width: '100%' }} >
                            <Flex className="h-full" gap='8' justify='center' align='center'>
                                <Box style={{ height: '100%', width: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }} >
                                    <Text className="text-black" size='8' weight='bold' wrap='pretty'>Sign up for free</Text>
                                    <Text className="text-black" size='7' weight='light' wrap='pretty'>Embark on a hassle-free journey by starting
                                        your account in moments with our streamlined sign-up process.</Text>
                                    <Button style={{ height: '10%', width: '30%' }} size="3" variant='solid' onClick={() => router.push('/sign-up')}>Try out now</Button>
                                </Box>
                                <Box style={{ height: '90%', width: '30%' }}>
                                    <img src="/free_sign_up.svg" alt="Free Sign Up" style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                            </Flex>
                        </Box>
                        <Box style={{ height: '27%', width: '100%' }}>
                            <Flex className="h-full" gap='8' justify='center' align='center'>
                                <Box style={{ height: '90%', width: '30%' }}>
                                    <img src="/choose_your_test.svg" alt="Choose Your Test" style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                                <Box style={{ height: '90%', width: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }} >
                                    <Text className="text-black" size='8' weight='bold' wrap='pretty'>Choose your test</Text>
                                    <Text className="text-black" size='7' weight='light' wrap='pretty'>Select your preferred test from a variety of subjects including
                                        English, Maths, or Science, tailored to your interests and needs.</Text>
                                    <Button style={{ height: '10%', width: '30%' }} size="3" variant='solid' onClick={() => router.push('/sign-up')}>Pick your test</Button>
                                </Box>
                            </Flex>
                        </Box>
                        <Box style={{ height: '27%', width: '100%' }}>
                            <Flex className="h-full" gap='8' justify='center' align='center'>
                                <Box style={{ height: '100%', width: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                    <Text className="text-black" size='8' weight='bold' wrap='pretty'>Practice & Improve</Text>
                                    <Text className="text-black" size='7' weight='light' wrap='pretty'>Practice and enhance your skills by completing the test and receiving
                                        instant feedback to help you improve.</Text>
                                    <Button style={{ height: '10%', width: '35%' }} size="3" variant='solid' onClick={() => router.push('/sign-up')}>Start Practicing</Button>
                                </Box>
                                <Box style={{ height: '90%', width: '30%' }}>
                                    <img src="/practice_and_improve.svg" alt="Practice And Improve" style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Box className="bg-[#F6F7FB]" height='1024px' flexGrow='1'>
                    <Flex className="h-full" gap='8' justify='center' align='center'>
                        <Box style={{ height: '70%', width: '30%' }} >
                            <img src="/begin_your_journey.svg" alt="Begin your Journey" style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                        <Box style={{ height: '75%', width: '30%' }} >
                            <Flex className="h-full" direction='column' gap='4' justify='center' align='center'>
                                <Box style={{ height: '100%', width: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                    <Text className="text-black" size='8' weight='bold' wrap='pretty'>Begin Your Journey to CUET Success Now</Text>
                                    <Text className="text-black" size='7' weight='light' wrap='pretty'>Embark on the path to your dreams with the CUET, each step you take is a
                                        stride towards your aspirations. The peak of achievement awaits you, and your determination to succeed is the most powerful guide. Start your
                                        journey today, your future is not just a destination, but a rewarding adventure.</Text>
                                    <Button style={{ height: '7%', width: '45%' }} size="2" variant='solid' onClick={() => router.push('/sign-up')}>Begin your prep today</Button>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Box className="bg-[#ECF0FF]" height='128px'>
                    <Grid style={{ height: '100%', width: '100%', 'textAlign': 'center', justifyItems: 'center' }} columns="3" rows="2" gap='3' align='center'>
                        <Box style={{ height: '40%', width: '30%' }} >
                            <Text style={{ cursor: 'pointer' }} className="text-black" size='2' weight='medium' wrap='pretty' onClick={() => router.push('/terms-and-conditions')}>Terms and Conditions</Text>
                        </Box>
                        <Box style={{ height: '40%', width: '30%' }} >
                            <Text style={{ cursor: 'pointer' }} className="text-black" size='2' weight='medium' wrap='pretty' onClick={() => router.push('/contact-us')}>About Us</Text>
                        </Box>
                        <Box style={{ height: '40%', width: '30%' }} >
                            <Text style={{ cursor: 'pointer' }} className="text-black" size='2' weight='medium' wrap='pretty' onClick={() => router.push('/refunds-and-cancellations')}>Refunds & Cancellations</Text>
                        </Box>
                        <Box style={{ height: '40%', width: '30%' }} >
                            <Text style={{ cursor: 'pointer' }} className="text-black" size='2' weight='medium' wrap='pretty' onClick={() => router.push('/privacy')}>Privacy</Text>
                        </Box>
                        <Box style={{ height: '40%', width: '30%' }} >
                            <Text style={{ cursor: 'pointer' }} className="text-black" size='2' weight='medium' wrap='pretty' onClick={() => router.push('/contact-us')}>Contact Us</Text>
                        </Box>
                        <Box style={{ height: '40%', width: '30%' }} >
                            <Text style={{ cursor: 'pointer' }} className="text-black" size='2' weight='medium' wrap='pretty' onClick={() => router.push('/pricing')}>Pricing</Text>
                        </Box>
                    </Grid>
                </Box>
            </Flex>
        </ScrollArea >
    )
}