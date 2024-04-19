"use client"
import { Flex, Box, Text, Button, RadioGroup } from "@radix-ui/themes";
import { useState } from 'react';

export default function Page() {
    const [questionNumber, setquestionNumber] = useState(1);
    const question = 'Find out one substitution for the following phrase from the options given below "Never done or known before".'
    const options = ['Unprecedented', 'Unpronounceable', 'Unprotected', 'Unquiet']

    const incrementQuestionNumber = (incrementCount: number) => {
        setquestionNumber(questionNumber + incrementCount);
    };

    return (
        <Flex className="bg-[#F6F7FB]" direction='column' height={{ md: '100vh' }} width={{ md: '100vw' }}>
            <Box className="bg-[#0144FF] bg-opacity-[0.059]" flexGrow='1' style={{ height: '5%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text color='indigo' size='6' weight='bold' wrap='pretty' >CUET Mock Test</Text>
            </Box>
            <Box style={{ 'height': '85%', 'width': '100%' }}>
                <Flex style={{ height: '100%', width: '100%' }} gap='4'>
                    <Box style={{ 'height': '100%', 'width': '70%' }}>
                        <Flex direction='column' style={{ height: '100%', width: '100%' }} gap='4'>
                            <Box style={{ 'height': '15%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <Text className="pl-8" size='6' weight='bold' wrap='pretty' >Question {questionNumber}</Text>
                            </Box>
                            <Box style={{ 'height': '5%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <div className="flex items-center justify-center w-full p-8">
                                    <div className="flex-grow border-t border-black"></div>
                                </div>
                            </Box>
                            <Box style={{ 'height': '10%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <Text className="pl-8" size='4' weight='light' wrap='pretty' >{question}</Text>
                            </Box>
                            <Box style={{ 'height': '20%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <RadioGroup.Root size='3' name="Options" className="pl-8" style={{ fontSize: '1.1rem', width: '100%' }}>
                                    {options.map((option, index) => (
                                        <RadioGroup.Item key={index} value={option} className="flex items-center h-8 w-8">
                                            {option}
                                        </RadioGroup.Item>
                                    ))}
                                </RadioGroup.Root>
                            </Box>
                            <Box style={{ 'height': '5%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <div className="flex items-center justify-center w-full p-8">
                                    <div className="flex-grow border-t border-black"></div>
                                </div>
                            </Box>
                            <Box className="gap-8" style={{ 'height': '10%', 'width': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center' }}>
                                <Button style={{ borderRadius: '5px' }} size="3" variant='solid' onClick={() => incrementQuestionNumber(1)}>Save and Next</Button>
                                <Button style={{ borderRadius: '5px' }} size="3" variant='solid' onClick={() => incrementQuestionNumber(1)}>Clear Response</Button>
                                <Button style={{ borderRadius: '5px' }} size="3" variant='solid' onClick={() => incrementQuestionNumber(1)}>Save and Mark for Review</Button>
                                <Button style={{ borderRadius: '5px' }} size="3" variant='solid' onClick={() => incrementQuestionNumber(1)}>Mark for Review and Next</Button>
                            </Box>
                        </Flex>
                    </Box>
                    <Box style={{ 'height': '100%', 'width': '30%' }}>
                        <Flex direction='column' style={{ height: '100%', width: '90%' }}>
                            <Box style={{ 'height': '11%', 'width': '90%', 'display': 'flex', 'alignItems': 'center' }}>
                                <Text className="pl-8 pt-5" size='4' weight='bold' wrap='pretty' >Question Palette</Text>
                            </Box>
                            <Box className="pl-8" style={{ 'height': '50%', 'width': '100%', 'display': 'grid', 'gridTemplateColumns': 'repeat(8, 1fr)', 'alignItems': 'center', 'justifyItems': 'center' }}>
                                {Array.from({ length: 50 }).map((_, index) => (
                                    <div key={index} className="flex flex-col items-center justify-center"> {/* Add key prop here */}
                                        <button
                                            className="w-8 h-8 flex items-center justify-center rounded-lg text-white bg-gradient-to-tr from-stone-500 to-stone-100 text-sm">
                                            {index + 1}
                                        </button>
                                    </div>
                                ))}
                            </Box>
                            <Box style={{ 'height': '7%', 'width': '90%', 'display': 'flex', 'alignItems': 'center' }}>
                                <Text className="pl-8" size='4' weight='bold' wrap='pretty' >Legend</Text>
                            </Box>
                            <Box style={{
                                'height': '25%', 'width': '100%', 'display': 'grid', gridTemplateRows: 'repeat(3, 2fr)',
                                gridTemplateColumns: 'min-content auto', // This will allow for natural width of the icons and the rest for text
                                alignItems: 'center'
                            }}>
                                <div className="pl-10 flex flex-row items-center justify-center w-40">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-lg text-white bg-gradient-to-tr from-stone-500 to-stone-100 text-sm">
                                        1
                                    </div>
                                    <div className="pl-1">Not Visited</div>
                                </div>
                                <div className="flex flex-row items-center justify-center">
                                    <div className="w-8 h-8 relative inline-block">
                                        <img src="/not_answered.svg" alt="Custom Vector" className="block w-full h-auto" />
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">1</span>
                                    </div>
                                    <div className="pl-1 whitespace-nowrap">Not Answered</div>
                                </div>
                                <div className="pl-8 flex flex-row items-center justify-center">
                                    <div className="w-8 h-8 relative inline-block">
                                        <img src="/answered.svg" alt="Custom Vector" className="block w-full h-auto" />
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">1</span>
                                    </div>
                                    <div className="pl-1">Answered</div>
                                </div>
                                <div className="pl-8 flex flex-row items-center justify-center">
                                    <div className="w-8 h-8 relative inline-block">
                                        <img src="/marked_for_review.svg" alt="Custom Vector" className="block w-full h-auto" />
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">1</span>
                                    </div>
                                    <div className="pl-1">Marked for Review</div>
                                </div>
                                <div className="pl-11 flex flex-row items-center justify-center" style={{ 'gridColumn': '1 / span 2', 'gridRow': '3 / 4' }}>
                                    <div className="relative inline-block">
                                        <img src="/marked_for_review_other.svg" alt="Custom Vector" className="block w-12 h-12" />
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">1</span>
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