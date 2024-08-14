'use client'
import { Flex, Box, ScrollArea, Grid, Text, Button, Card } from "@radix-ui/themes";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuth from "@/app/hooks/useAuth";
import { Suspense } from 'react';
import dynamic from "next/dynamic";
import OrigamiAnimation from "@/app/components/splash-screen/OrigamiAnimation";
import { useMediaQuery } from 'react-responsive';

const MainComponent = () => {
    console.log('landing page mounted')
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    const isMobileSmall = useMediaQuery({ query: '(max-width: 499px) and (max-height: 999px)' });
    const isTabletMedium = useMediaQuery({ query: '(min-width: 500px) and (max-width: 900px) and (max-height: 1500px)' });

    if (loading) {
        return <OrigamiAnimation />;
    }

    return isMobileSmall ? (
        <ScrollArea className="w-screen" type="always" scrollbars="vertical" size="2" style={{ height: '100vh' }}>
            <Flex direction='column'>
                <Box className="bg-[#EAF6FA]" height='48px' flexGrow='1' style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                    <Flex className="h-full" justify='between' align='center' px='4' gapX='5'>
                        <Flex className="h-full" gap='3' justify='center' align='center'>
                            <Link href="#maximize-prep" scroll>
                                <Text color='gray' size='2' weight='medium' wrap='pretty'>Features</Text>
                            </Link>
                            <Link href="#get-started-now" scroll>
                                <Text color='gray' size='2' weight='medium' wrap='nowrap'>How It Works</Text>
                            </Link>
                        </Flex>
                        <Flex className="h-full" gap='3' justify='center' align='center'>
                            <div style={{ cursor: 'pointer' }} onClick={() => router.push('/sign-in')}>
                                <Text color='gray' size='2' weight='medium' wrap='nowrap'>Log In</Text>
                            </div>
                            <Button className="mobile-very-small:w-[70%] h-[60%] w-[60%]" size='2' radius="small" style={{ backgroundColor: '#120052', color: '#FFFFFF' }} variant='solid' onClick={() => router.push('/sign-up')}>Sign Up</Button>
                        </Flex>
                    </Flex>
                </Box>
                <Box className="bg-[#38B6FF]" height='600px' flexGrow='1' position='relative'>
                    <img src="images/landing_page_cover_mobile.png" alt="Background Image" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
                    <Flex className="h-full pt-80" style={{ position: 'relative', zIndex: 2 }} direction='row' justify='center' align='center'>
                        <Button className="text-xs" style={{ backgroundColor: '#120052', color: '#FFFFFF', height: '40px', cursor: 'pointer', padding: '0 10px' }} variant='solid' onClick={() => router.push('/sign-up')}>
                            Sign Up Now
                        </Button>
                    </Flex>
                </Box>
                <Box className="bg-[#38B6FF]" height='auto' flexGrow='1' id="maximize-prep" py='4'>
                    <Flex className="h-full" direction='column' gap='4' justify='center' align='center'>
                        <Box style={{ height: 'auto', width: '90%', textAlign: 'center', marginTop: '20px' }} >
                            <Text className="text-stone-800" size='4' weight='bold' wrap='wrap'>
                                Maximize prep with our mock tests and analysis
                            </Text>
                        </Box>
                        <Box className="bg-[#EAF6FA]" style={{ width: '80%', boxShadow: '4px 4px 25px 5px rgba(0, 0, 0, 0.25)', padding: '16px 0', marginBottom: '20px' }} >
                            <Flex className="h-full" direction='column' gap='3' justify='center' align='center'>
                                <Box style={{ height: 'auto', width: '60%', marginBottom: '20px' }}>
                                    <Flex className="h-full" direction='column' gap='2' justify='center' align='center'>
                                        <Box style={{ width: '100%', marginBottom: '10px' }}>
                                            <Card style={{ height: '200px', width: '100%', padding: 0 }}>
                                                <img src="images/comprehensive_mock_tests.webp" alt="Comprehensive Mock Tests" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </Card>
                                        </Box>
                                        <Box style={{ textAlign: 'center' }}>
                                            <Text className="text-black" size='5' weight='medium' wrap='wrap'>
                                                Comprehensive Mock Tests
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Box style={{ height: 'auto', width: '60%', marginBottom: '20px' }}>
                                    <Flex className="h-full" direction='column' gap='2' justify='center' align='center'>
                                        <Box style={{ width: '100%', marginBottom: '10px' }}>
                                            <Card style={{ height: '200px', width: '100%', padding: 0 }}>
                                                <img src="images/instant_test_analysis.webp" alt="Instant Test Analysis" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </Card>
                                        </Box>
                                        <Box style={{ textAlign: 'center' }}>
                                            <Text className="text-black" size='5' weight='medium' wrap='wrap'>
                                                Instant Test Analysis
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Box>
                                <Box style={{ height: 'auto', width: '60%', marginBottom: '20px' }}>
                                    <Flex className="h-full" direction='column' gap='2' justify='center' align='center'>
                                        <Box style={{ width: '100%', marginBottom: '10px' }}>
                                            <Card style={{ height: '200px', width: '100%', padding: 0 }}>
                                                <img src="images/absolutely_free_access.jpg" alt="Absolutely Free Access" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </Card>
                                        </Box>
                                        <Box style={{ textAlign: 'center' }}>
                                            <Text className="text-black" size='5' weight='medium' wrap='wrap'>
                                                Absolutely Free Access
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Box className="bg-[#38B6FF]" height='200px' flexGrow='1' pt='3'>
                    <Flex className="h-full" direction='column' gap='3' justify='center' align='center' pt='3'>
                        <Box style={{ height: '25%', width: '10%', display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                            <Button radius="small" style={{ backgroundColor: '#120052', color: '#FFFFFF', height: '45px', width: '180px', fontSize: 'medium', cursor: 'pointer' }} variant='solid' onClick={() => router.push('/sign-up')} id="get-started-now">Get Started Now</Button>
                        </Box>
                    </Flex>
                </Box>
                <Box className="bg-[#38B6FF]" height='auto' flexGrow='1' py='4'>
                    <Flex className="h-full" direction='column' gap='9' justify='center' align='center' mb='8'>
                        <Box style={{ height: 'auto', width: '100%' }}>
                            <Flex className="h-full flex-col" gap='4' justify='center' align='center'>
                                <Text className="text-black" size='6' weight='bold' wrap='pretty'>Sign up for free</Text>
                                <Box style={{ height: '250px', width: '80%' }}>
                                    <img src="images/free_sign_up.svg" alt="Free Sign Up" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                                <Box style={{ height: 'auto', width: '80%', textAlign: 'center' }}>
                                    <Text className="text-black" size='5' weight='light' wrap='pretty'>
                                        Embark on a hassle-free journey by starting your account in moments with our streamlined sign-up process.
                                    </Text>
                                </Box>
                                <Button radius="small" style={{ backgroundColor: '#120052', color: '#FFFFFF', height: '45px', width: '140px', fontSize: 'medium', cursor: 'pointer' }} variant='solid' onClick={() => router.push('/sign-up')}>Try out now</Button>
                            </Flex>
                        </Box>
                        <Box style={{ height: 'auto', width: '100%' }}>
                            <Flex className="h-full flex-col" gap='4' justify='center' align='center'>
                                <Text className="text-black" size='6' weight='bold' wrap='pretty'>Choose your test</Text>
                                <Box style={{ height: '250px', width: '80%' }}>
                                    <img src="images/choose_your_test.svg" alt="Choose Your Test" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                                <Box style={{ height: 'auto', width: '80%', textAlign: 'center' }}>
                                    <Text className="text-black" size='5' weight='light' wrap='pretty'>
                                        Select your preferred test from a variety of subjects including English, Maths, or Science, tailored to your interests and needs.
                                    </Text>
                                </Box>
                                <Button radius="small" style={{ backgroundColor: '#120052', color: '#FFFFFF', height: '45px', width: '140px', fontSize: 'medium', cursor: 'pointer' }} variant='solid' onClick={() => router.push('/sign-up')}>Pick your test</Button>
                            </Flex>
                        </Box>
                        <Box style={{ height: 'auto', width: '100%' }}>
                            <Flex className="h-full flex-col" gap='4' justify='center' align='center'>
                                <Text className="text-black" size='6' weight='bold' wrap='pretty'>Practice & Improve</Text>
                                <Box style={{ height: '250px', width: '80%' }}>
                                    <img src="images/practice_and_improve.svg" alt="Practice And Improve" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                                <Box style={{ height: 'auto', width: '80%', textAlign: 'center' }}>
                                    <Text className="text-black" size='5' weight='light' wrap='pretty'>
                                        Practice and enhance your skills by completing the test and receiving instant feedback to help you improve.
                                    </Text>
                                </Box>
                                <Button radius="small" style={{ backgroundColor: '#120052', color: '#FFFFFF', height: '45px', width: '140px', fontSize: 'medium', cursor: 'pointer' }} variant='solid' onClick={() => router.push('/sign-up')}>Start Practicing</Button>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Box className="bg-[#38B6FF]" height='auto' flexGrow='1' py='4'>
                    <Flex className="h-full" direction='column' gap='4' justify='center' align='center' mb='6'>
                        <Box style={{ height: 'auto', width: '100%' }}>
                            <Flex className="h-full flex-col" gap='4' justify='center' align='center' style={{ textAlign: 'center' }}>
                                <Text className="text-black" size='6' weight='bold' wrap='pretty' style={{ textAlign: 'center' }}>Begin Your Journey to Success Now</Text>
                                <Box style={{ height: '350px', width: '80%' }}>
                                    <img src="images/begin_your_journey.svg" alt="Begin your Journey" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                                <Box style={{ height: 'auto', width: '80%', textAlign: 'center' }}>
                                    <Text className="text-black" size='5' weight='light' wrap='pretty'>
                                        Start your journey today, your future is not just a destination, but a rewarding adventure.
                                    </Text>
                                </Box>
                                <Button radius="small" style={{ backgroundColor: '#120052', color: '#FFFFFF', height: '45px', width: '180px', fontSize: 'medium', cursor: 'pointer' }} variant='solid' onClick={() => router.push('/sign-up')}>Begin your prep today</Button>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Box className="bg-[#1F8FFF]" height='auto' py='4'>
                    <Grid
                        style={{
                            height: '100%',
                            width: '100%',
                            textAlign: 'center',
                            justifyItems: 'center'
                        }}
                        columns="2"
                        rows="3"
                        gap='3'
                        align='center'
                    >
                        <Box style={{ height: 'auto', width: '80%' }}>
                            <Text
                                style={{ cursor: 'pointer' }}
                                className="text-black"
                                size='2'
                                weight='medium'
                                wrap='pretty'
                                onClick={() => router.push('/terms-and-conditions')}
                            >
                                Terms and Conditions
                            </Text>
                        </Box>
                        <Box style={{ height: 'auto', width: '80%' }}>
                            <Text
                                style={{ cursor: 'pointer' }}
                                className="text-black"
                                size='2'
                                weight='medium'
                                wrap='pretty'
                                onClick={() => router.push('/contact-us')}
                            >
                                About Us
                            </Text>
                        </Box>
                        <Box style={{ height: 'auto', width: '80%' }}>
                            <Text
                                style={{ cursor: 'pointer' }}
                                className="text-black"
                                size='2'
                                weight='medium'
                                wrap='pretty'
                                onClick={() => router.push('/refunds-and-cancellations')}
                            >
                                Refunds & Cancellations
                            </Text>
                        </Box>
                        <Box style={{ height: 'auto', width: '80%' }}>
                            <Text
                                style={{ cursor: 'pointer' }}
                                className="text-black"
                                size='2'
                                weight='medium'
                                wrap='pretty'
                                onClick={() => router.push('/privacy')}
                            >
                                Privacy
                            </Text>
                        </Box>
                        <Box style={{ height: 'auto', width: '80%' }}>
                            <Text
                                style={{ cursor: 'pointer' }}
                                className="text-black"
                                size='2'
                                weight='medium'
                                wrap='pretty'
                                onClick={() => router.push('/contact-us')}
                            >
                                Contact Us
                            </Text>
                        </Box>
                        <Box style={{ height: 'auto', width: '80%' }}>
                            <Text
                                style={{ cursor: 'pointer' }}
                                className="text-black"
                                size='2'
                                weight='medium'
                                wrap='pretty'
                                onClick={() => router.push('/pricing')}
                            >
                                Pricing
                            </Text>
                        </Box>
                    </Grid>
                </Box>

            </Flex>
        </ScrollArea>
    ) : (
        <ScrollArea className="w-screen" type="always" scrollbars="vertical" size="2" style={{ height: '100vh' }}>
            <Flex direction='column'>
                <Box className="bg-[#EAF6FA] sticky top-0 z-10" height='64px' flexGrow='1'>
                    <Flex className="h-full" justify='between' align='center' px='6'>
                        <Text size={isTabletMedium ? '6' : '8'} weight='bold' wrap='pretty'></Text>
                        <Flex className={`h-full ${isTabletMedium ? 'pl-36' : 'pl-60'} gap-4 justify-center items-center`}>
                            <Link href="#maximize-prep" scroll>
                                <Text color='gray' size={isTabletMedium ? '5' : '6'} weight='medium' wrap='pretty'>
                                    Features
                                </Text>
                            </Link>
                            <Link href="#get-started-now" scroll>
                                <Text color='gray' size={isTabletMedium ? '5' : '6'} weight='medium' wrap='pretty'>
                                    How It Works
                                </Text>
                            </Link>
                        </Flex>
                        <Flex className="h-full gap-4 justify-center items-center">
                            <div style={{ cursor: 'pointer' }} onClick={() => router.push('/sign-in')}>
                                <Text color='gray' size={isTabletMedium ? '5' : '6'} weight='medium' wrap='nowrap'>
                                    Log In
                                </Text>
                            </div>
                            <Button
                                size={isTabletMedium ? '3' : '4'}
                                radius="small"
                                style={{ height: '70%', width: '70%', backgroundColor: '#120052', color: '#FFFFFF' }}
                                variant='solid'
                                onClick={() => router.push('/sign-up')}
                            >
                                Sign Up
                            </Button>
                        </Flex>
                    </Flex>
                </Box>
                <Box className="bg-[#38B6FF]" height={isTabletMedium ? '450px' : '800px'} flexGrow='1' position='relative'>
                    <img src="images/landing_page_cover.png" alt="Background Image" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
                    <Flex className="h-full" style={{ position: 'relative', zIndex: 2 }} direction='row' gap='9' justify='center' align='end' pl={isTabletMedium ? '80px' : '240px'} py={isTabletMedium ? '90px' : '155px'}>
                        <Button style={{ position: 'relative', zIndex: 2, backgroundColor: '#120052', color: '#FFFFFF', height: isTabletMedium ? '50px' : '60px', width: isTabletMedium ? '140px' : '160px', fontSize: 'large', cursor: 'pointer' }} variant='solid' onClick={() => router.push('/sign-up')}>Sign Up Now</Button>
                    </Flex>
                </Box>
                <Box className="bg-[#38B6FF]" height='712px' flexGrow='1' id="maximize-prep">
                    <Flex className="h-full" direction='column' gap='6' justify='center' align='center'>
                        <Box style={{ height: '20%', display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }} width={isTabletMedium ? '90%' : '60vw'}>
                            <Text className="text-stone-800" size={isTabletMedium ? '8' : '9'} weight='bold' wrap='wrap'>
                                Maximize prep with our mock tests and analysis
                            </Text>
                        </Box>
                        <Box className="bg-[#EAF6FA]" style={{ height: '55%', width: isTabletMedium ? '90%' : '70%', boxShadow: '4px 4px 25px 5px rgba(0, 0, 0, 0.25)', padding: 0 }}  >
                            <Flex className="h-full" gap='3' justify='center' align='center' px='6'>
                                <Box style={{ height: '70%' }} width={{ md: '25vw' }}>
                                    <Flex className="h-full" direction='column' gap='3' justify='center' align='center' py='3'>
                                        <Box style={{ height: '75%', width: '75%' }}>
                                            <Card style={{ height: '100%', width: '100%', padding: 0 }}>
                                                <img src="images/comprehensive_mock_tests.webp" alt="Comprehensive Mock Tests" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                                                <img src="images/instant_test_analysis.webp" alt="Instant Test Analysis" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                                                <img src="images/absolutely_free_access.jpg" alt="Absolutely Free Access" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <Box className="bg-[#38B6FF]" height='240px' flexGrow='1' pt='5' pb='5'>
                    <Flex className="h-full" direction='column' gap='3' justify='center' align='center'>
                        <Box style={{ height: '45%', width: '10%', display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                            <Button radius="small" style={{ backgroundColor: '#120052', color: '#FFFFFF', height: '70px', width: '180px', fontSize: 'large', cursor: 'pointer' }} variant='solid' onClick={() => router.push('/sign-up')} id="get-started-now">Get Started Now</Button>
                        </Box>
                    </Flex>
                </Box>
                <Box className="bg-[#38B6FF]" height='2048px' flexGrow='1'>
                    <Flex className="h-full" direction='column' gap='9' justify='center' align='center'>
                        <Box style={{ height: '27%', width: '100%' }} >
                            <Flex className="h-full" gap='8' justify='center' align='center'>
                                <Box style={{ height: '100%', width: isTabletMedium ? '40%' : '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }} >
                                    <Text className="text-black" size='8' weight='bold' wrap='pretty'>Sign up for free</Text>
                                    <Text className="text-black" size='7' weight='light' wrap='pretty'>Embark on a hassle-free journey by starting
                                        your account in moments with our streamlined sign-up process.</Text>
                                    <Button radius="small" style={{ backgroundColor: '#120052', color: '#FFFFFF', height: '60px', width: '160px', fontSize: 'large', cursor: 'pointer' }} variant='solid' onClick={() => router.push('/sign-up')}>Try out now</Button>
                                </Box>
                                <Box style={{ height: '90%', width: isTabletMedium ? '40%' : '30%' }}>
                                    <img src="images/free_sign_up.svg" alt="Free Sign Up" style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                            </Flex>
                        </Box>
                        <Box style={{ height: '27%', width: '100%' }}>
                            <Flex className="h-full" gap='8' justify='center' align='center'>
                                <Box style={{ height: '90%', width: isTabletMedium ? '40%' : '30%' }}>
                                    <img src="images/choose_your_test.svg" alt="Choose Your Test" style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                                <Box style={{ height: '90%', width: isTabletMedium ? '40%' : '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }} >
                                    <Text className="text-black" size='8' weight='bold' wrap='pretty'>Choose your test</Text>
                                    <Text className="text-black" size='7' weight='light' wrap='pretty'>Select your preferred test from a variety of subjects including
                                        English, Maths, or Science, tailored to your interests and needs.</Text>
                                    <Button radius="small" style={{ backgroundColor: '#120052', color: '#FFFFFF', height: '60px', width: '160px', fontSize: 'large', cursor: 'pointer' }} variant='solid' onClick={() => router.push('/sign-up')}>Pick your test</Button>
                                </Box>
                            </Flex>
                        </Box>
                        <Box style={{ height: '27%', width: '100%' }}>
                            <Flex className="h-full" gap='8' justify='center' align='center'>
                                <Box style={{ height: '100%', width: isTabletMedium ? '40%' : '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                    <Text className="text-black" size='8' weight='bold' wrap='pretty'>Practice & Improve</Text>
                                    <Text className="text-black" size='7' weight='light' wrap='pretty'>Practice and enhance your skills by completing the test and receiving
                                        instant feedback to help you improve.</Text>
                                    <Button radius="small" style={{ backgroundColor: '#120052', color: '#FFFFFF', height: '60px', width: '160px', fontSize: 'large', cursor: 'pointer' }} variant='solid' onClick={() => router.push('/sign-up')}>Start Practicing</Button>
                                </Box>
                                <Box style={{ height: '90%', width: isTabletMedium ? '40%' : '30%' }}>
                                    <img src="images/practice_and_improve.svg" alt="Practice And Improve" style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Box className="bg-[#38B6FF]" height='1024px' flexGrow='1'>
                    <Flex className="h-full" gap='8' justify='center' align='center'>
                        <Box style={{ height: '70%', width: isTabletMedium ? '40%' : '30%' }} >
                            <img src="images/begin_your_journey.svg" alt="Begin your Journey" style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                        <Box style={{ height: '75%', width: isTabletMedium ? '40%' : '30%' }} >
                            <Flex className="h-full" direction='column' gap='4' justify='center' align='center'>
                                <Box style={{ height: '100%', width: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                    <Text className="text-black" size='8' weight='bold' wrap='pretty'>Begin Your Journey to Success Now</Text>
                                    <Text className="text-black" size='7' weight='light' wrap='pretty'>Start your journey today, your future is not just a destination, but a rewarding adventure.</Text>
                                    <Button radius="small" style={{ backgroundColor: '#120052', color: '#FFFFFF', height: '70px', width: '220px', fontSize: 'large', cursor: 'pointer' }} variant='solid' onClick={() => router.push('/sign-up')}>Begin your prep today</Button>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Box className="bg-[#1F8FFF]" height='128px'>
                    <Grid style={{ height: '100%', width: '100%', 'textAlign': 'center', justifyItems: 'center' }} columns="3" rows="2" gap='3' align='center'>
                        <Box style={{ height: '40%', width: isTabletMedium ? '40%' : '30%' }} >
                            <Text style={{ cursor: 'pointer' }} className="text-black" size='2' weight='medium' wrap='pretty' onClick={() => router.push('/terms-and-conditions')}>Terms and Conditions</Text>
                        </Box>
                        <Box style={{ height: '40%', width: '30%' }} >
                            <Text style={{ cursor: 'pointer' }} className="text-black" size='2' weight='medium' wrap='pretty' onClick={() => router.push('/contact-us')}>About Us</Text>
                        </Box>
                        <Box style={{ height: '40%', width: isTabletMedium ? '40%' : '30%' }} >
                            <Text style={{ cursor: 'pointer' }} className="text-black" size='2' weight='medium' wrap='pretty' onClick={() => router.push('/refunds-and-cancellations')}>Refunds & Cancellations</Text>
                        </Box>
                        <Box style={{ height: '40%', width: '30%' }} >
                            <Text style={{ cursor: 'pointer' }} className="text-black" size='2' weight='medium' wrap='pretty' onClick={() => router.push('/privacy')}>Privacy</Text>
                        </Box>
                        <Box style={{ height: '40%', width: isTabletMedium ? '35%' : '30%' }} >
                            <Text style={{ cursor: 'pointer' }} className="text-black" size='2' weight='medium' wrap='pretty' onClick={() => router.push('/contact-us')}>Contact Us</Text>
                        </Box>
                        <Box style={{ height: '40%', width: '30%' }} >
                            <Text style={{ cursor: 'pointer' }} className="text-black" size='2' weight='medium' wrap='pretty' onClick={() => router.push('/pricing')}>Pricing</Text>
                        </Box>
                    </Grid>
                </Box>
            </Flex >
        </ScrollArea >
    )
}

// Dynamically import MainComponent with ssr: false
const DynamicMainComponent = dynamic(() => Promise.resolve(MainComponent));

const Page = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <DynamicMainComponent />
    </Suspense>
);

export default Page;