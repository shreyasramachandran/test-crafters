"use client"
import useAuth from "@/app/hooks/useAuth";
import { Flex, Box, Text, Button, RadioGroup } from "@radix-ui/themes";
import { useState } from 'react';

export default function Page() {
    // Get isAuthenticated in case you need to use it for future operations
    const isAuthenticated = useAuth();
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
    const [selectedOption, setSelectedOption] = useState("");
    const [legendCounts, setLegendCounts] = useState({
        notVisited: 50, // Assuming 50 questions initially
        notAnswered: 0,
        answered: 0,
        markedForReview: 0,
        answeredAndMarkedForReview: 0
    });

    // Define an enum for the possible states of a question
    enum QuestionState {
        NotVisited = 'notVisited',
        Answered = 'answered',
        NotAnswered = 'notAnswered',
        MarkedForReview = 'markedForReview',
        AnsweredAndMarkedForReview = 'answeredAndMarkedForReview'
    }

    // Define the type for a question in the question palette
    type QuestionPaletteItem = {
        index: number;
        state: QuestionState;
    };

    // Define the initial state for the question palette
    const initialQuestionPaletteState: QuestionPaletteItem[] = Array.from({ length: 50 }).map((_, mapIndex) => ({
        index: mapIndex,
        state: QuestionState.NotVisited // Initially set all questions to 'NotVisited'
    }));

    const [questionPalette, setQuestionPalette] = useState<QuestionPaletteItem[]>(initialQuestionPaletteState);
    const question = 'Find out one substitution for the following phrase from the options given below "Never done or known before".'
    const options = ['Unprecedented', 'Unpronounceable', 'Unprotected', 'Unquiet']

    type LegendAction = keyof typeof legendCounts;

    const incrementCurrentQuestionNumber = (incrementCount: number, action: LegendAction) => {
        if (selectedOption != "") {
            setCurrentQuestionNumber(prevQuestionNumber => prevQuestionNumber + incrementCount);
        }
    };

    // Function to get the Tailwind component for a given question state
    const getComponentForState = (paletteItem: QuestionPaletteItem) => {
        const { state, index } = paletteItem;

        switch (state) {
            case QuestionState.NotAnswered:
                return (
                    <div className="w-8 h-8 relative inline-block">
                        <img src="/not_answered.svg" alt="Not Answered" className="block w-full h-auto" />
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{index + 1}</span>
                    </div>
                );
            case QuestionState.Answered:
                return (
                    <div className="w-8 h-8 relative inline-block">
                        <img src="/answered.svg" alt="Answered" className="block w-full h-auto" />
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{index + 1}</span>
                    </div>
                );
            case QuestionState.MarkedForReview:
                return (
                    <div className="w-8 h-8 relative inline-block">
                        <img src="/marked_for_review.svg" alt="Marked for Review" className="block w-full h-auto" />
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{index + 1}</span>
                    </div>
                );
            case QuestionState.AnsweredAndMarkedForReview:
                return (
                    <div className="relative inline-block">
                        <img src="/marked_for_review_other.svg" alt="Answered & Marked for Review" className="block w-8 h-8" />
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{index + 1}</span>
                    </div>
                );
            default:
                // For other states, render a default button
                return (
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg text-white bg-gradient-to-tr from-stone-500 to-stone-100 text-sm">
                        {index + 1}
                    </div>
                );
        }
    };

    const updateQuestionPaletteAndLegendCounts = (index: number, action: LegendAction) => {
        if (selectedOption != "") {
            // Update legend counts based on action
            setLegendCounts(prevCounts => ({
                ...prevCounts,
                [action]: prevCounts[action as LegendAction] + 1
            }));

            // Update question palette based on action
            setQuestionPalette(prevPalette => {
                const updatedPalette = prevPalette.map((item, i) => {
                    // Update state for the palette item at the specified index based on the action
                    if (i === index) {
                        switch (action) {
                            case 'notVisited':
                                return { ...item, state: QuestionState.NotVisited };
                            case 'answered':
                                return { ...item, state: QuestionState.Answered };
                            case 'markedForReview':
                                return { ...item, state: QuestionState.MarkedForReview };
                            case 'answeredAndMarkedForReview':
                                return { ...item, state: QuestionState.AnsweredAndMarkedForReview };
                            default:
                                return item;
                        }
                    }
                    return item; // Return unchanged item for other indices
                });
                return updatedPalette;
            });
        }
        else {
            if (action == 'notAnswered') {
                const nextQuestionIndex = index
                // Update legend counts based on action
                setLegendCounts(prevCounts => ({
                    ...prevCounts,
                    [action]: prevCounts[action as LegendAction] + 1
                }));
                // Update the question palette
                const updatedQuestionPalette = [...questionPalette];
                updatedQuestionPalette[nextQuestionIndex].state = QuestionState.NotAnswered
                setQuestionPalette(updatedQuestionPalette)
                // Change the currentQuestionNumber
                setCurrentQuestionNumber(nextQuestionIndex + 1)

            }
        }
    };


    const clearResponse = () => {
        setSelectedOption(""); // Clear the selected option when "Clear Response" button is clicked
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
                                <Text className="pl-8" size='6' weight='bold' wrap='pretty' >Question {currentQuestionNumber}</Text>
                            </Box>
                            {/* Saperator */}
                            <Box style={{ 'height': '5%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <div className="flex items-center justify-center w-full p-8">
                                    <div className="flex-grow border-t border-black"></div>
                                </div>
                            </Box>
                            {/* Question */}
                            <Box style={{ 'height': '10%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <Text className="pl-8" size='4' weight='light' wrap='pretty' >{question}</Text>
                            </Box>
                            {/* Options */}
                            <Box style={{ 'height': '20%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <RadioGroup.Root size='3' name="Options" className="pl-8" style={{ fontSize: '1.1rem', width: '100%' }}>
                                    {options.map((option, index) => (
                                        <RadioGroup.Item
                                            key={index}
                                            value={option}
                                            className="flex items-center h-8 w-8"
                                            checked={selectedOption === option}
                                            onClickCapture={(isChecked) => {
                                                if (isChecked) setSelectedOption(option); // Update the selected option state
                                            }}
                                        >
                                            {option}
                                        </RadioGroup.Item>
                                    ))}
                                </RadioGroup.Root>
                            </Box>
                            {/* Saperator */}
                            <Box style={{ 'height': '5%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <div className="flex items-center justify-center w-full p-8">
                                    <div className="flex-grow border-t border-black"></div>
                                </div>
                            </Box>
                            {/* Navigation Buttons */}
                            <Box className="gap-8" style={{ 'height': '10%', 'width': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center' }}>
                                <Button style={{ borderRadius: '5px' }} size="3" variant='solid' onClick={() => {
                                    incrementCurrentQuestionNumber(1, 'answered');
                                    updateQuestionPaletteAndLegendCounts(currentQuestionNumber - 1, 'answered');
                                }}>Save and Next</Button>
                                <Button style={{ borderRadius: '5px' }} size="3" variant='solid' onClick={() => {
                                    clearResponse()
                                }}>Clear Response</Button>
                                <Button style={{ borderRadius: '5px' }} size="3" variant='solid' onClick={() => {
                                    incrementCurrentQuestionNumber(1, 'markedForReview');
                                    updateQuestionPaletteAndLegendCounts(currentQuestionNumber - 1, 'markedForReview');
                                }}>Save and Mark for Review</Button>
                                <Button style={{ borderRadius: '5px' }} size="3" variant='solid' onClick={() => {
                                    incrementCurrentQuestionNumber(1, 'answeredAndMarkedForReview');
                                    updateQuestionPaletteAndLegendCounts(currentQuestionNumber - 1, 'answeredAndMarkedForReview');
                                }}>Mark for Review and Next</Button>
                            </Box>
                        </Flex>
                    </Box>
                    <Box style={{ 'height': '100%', 'width': '30%' }}>
                        <Flex direction='column' style={{ height: '100%', width: '90%' }}>
                            <Box style={{ 'height': '11%', 'width': '90%', 'display': 'flex', 'alignItems': 'center' }}>
                                <Text className="pl-8 pt-5" size='4' weight='bold' wrap='pretty' >Question Palette</Text>
                            </Box>
                            {/* Questions List */}
                            <Box className="pl-8" style={{ 'height': '50%', 'width': '100%', 'display': 'grid', 'gridTemplateColumns': 'repeat(8, 1fr)', 'alignItems': 'center', 'justifyItems': 'center' }}>
                                {questionPalette.map((state, index) => (
                                    <div key={index} className="flex flex-col items-center justify-center">
                                        <button onClick={() => {
                                            // Here index is the index of the question that is clicked
                                            updateQuestionPaletteAndLegendCounts(index, 'notAnswered');
                                        }}>{getComponentForState(state)}</button>
                                    </div>
                                ))}
                            </Box>
                            <Box style={{ 'height': '7%', 'width': '90%', 'display': 'flex', 'alignItems': 'center' }}>
                                <Text className="pl-8" size='4' weight='bold' wrap='pretty' >Legend</Text>
                            </Box>
                            {/* Legend */}
                            <Box style={{
                                'height': '25%', 'width': '100%', 'display': 'grid', gridTemplateRows: 'repeat(3, 2fr)',
                                gridTemplateColumns: 'min-content auto', // This will allow for natural width of the icons and the rest for text
                                alignItems: 'center'
                            }}>
                                <div className="pl-10 flex flex-row items-center justify-center w-40">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-lg text-white bg-gradient-to-tr from-stone-500 to-stone-100 text-sm">
                                        {legendCounts.notVisited}
                                    </div>
                                    <div className="pl-1">Not Visited</div>
                                </div>
                                <div className="flex flex-row items-center justify-center">
                                    <div className="w-8 h-8 relative inline-block">
                                        <img src="/not_answered.svg" alt="Custom Vector" className="block w-full h-auto" />
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{legendCounts.notAnswered}</span>
                                    </div>
                                    <div className="pl-1 whitespace-nowrap">Not Answered</div>
                                </div>
                                <div className="pl-8 flex flex-row items-center justify-center">
                                    <div className="w-8 h-8 relative inline-block">
                                        <img src="/answered.svg" alt="Custom Vector" className="block w-full h-auto" />
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{legendCounts.answered}</span>
                                    </div>
                                    <div className="pl-1">Answered</div>
                                </div>
                                <div className="pl-8 flex flex-row items-center justify-center">
                                    <div className="w-8 h-8 relative inline-block">
                                        <img src="/marked_for_review.svg" alt="Custom Vector" className="block w-full h-auto" />
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{legendCounts.markedForReview}</span>
                                    </div>
                                    <div className="pl-1">Marked for Review</div>
                                </div>
                                <div className="pl-11 flex flex-row items-center justify-center" style={{ 'gridColumn': '1 / span 2', 'gridRow': '3 / 4' }}>
                                    <div className="relative inline-block">
                                        <img src="/marked_for_review_other.svg" alt="Custom Vector" className="block w-12 h-12" />
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{legendCounts.answeredAndMarkedForReview}</span>
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