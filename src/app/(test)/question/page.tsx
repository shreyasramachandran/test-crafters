"use client"
import useAuth from "@/app/hooks/useAuth";
import { Flex, Box, Text, Button, RadioGroup, Dialog, ScrollArea } from "@radix-ui/themes";
import { useState, useEffect } from 'react';
import db, { IQuestion } from '@/app/utils/index-db/operations';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react'

const MainComponent = () => {
    // Get isAuthenticated in case you need to use it for future operations
    const isAuthenticated = useAuth();
    const searchParams = useSearchParams()
    const maxQuestions = searchParams.get('maxQuestions')
    const minimumRequiredQuestions = searchParams.get('minimumRequiredQuestions')
    const router = useRouter();

    // Define currentQuestionNumber
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
    // Define selectedOption
    const [selectedOption, setSelectedOption] = useState(-1);
    // Define legendCounts
    const [legendCounts, setLegendCounts] = useState({
        notVisited: 50, // Assuming 50 questions initially
        notAnswered: 0,
        answered: 0,
        markedForReview: 0,
        answeredAndMarkedForReview: 0
    });

    type LegendAction = keyof typeof legendCounts;

    // Define questionPalette
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
        selectedAnswer: number;
        uniqueIdentification: string;
    };

    const [questionPalette, setQuestionPalette] = useState<QuestionPaletteItem[]>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const questions = await db.questions.toArray(); // Assuming 'questions' table is correctly referenced

                const initialPalette: QuestionPaletteItem[] = questions.map((question, index) => ({
                    index: index,
                    uniqueIdentification: question.uniqueIdentification || 'N/A', // Fallback to 0 if undefined
                    state: QuestionState.NotVisited,
                    selectedAnswer: -1
                }));
                setQuestionPalette(initialPalette);
            } catch (error) {
                console.error("Failed to load questions from database:", error);
                // Handle errors appropriately
            }
        };

        fetchQuestions();
    }, []);

    // Mapping of QuestionState to the corresponding keys in legendCounts
    const stateToLegendAction = {
        [QuestionState.NotVisited]: 'notVisited',
        [QuestionState.Answered]: 'answered',
        [QuestionState.NotAnswered]: 'notAnswered',
        [QuestionState.MarkedForReview]: 'markedForReview',
        [QuestionState.AnsweredAndMarkedForReview]: 'answeredAndMarkedForReview'
    };

    // Define question and options
    const [questionPreText, setQuestionPreText] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState<string[]>([]);

    // This useEffect is so that whenever selected option gets updated the selectedAnswer in questionPalette should also get updated
    useEffect(() => {
        if (questionPalette.length > 0 && selectedOption !== undefined) {
            updateSelectedAnswerInQuestionItems(selectedOption);
        }
    }, [selectedOption]);


    function updateSelectedAnswerInQuestionItems(selectedOption: number) {
        setQuestionPalette(prevPalette => {
            // Create a new array with updated data
            return prevPalette.map((item, index) => {
                if (index === currentQuestionNumber - 1) {
                    return { ...item, selectedAnswer: selectedOption };
                }
                return item;
            });
        });
    }


    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                // Assuming the table name is 'subjects' and the questions are indexed by `id`
                const questionData = await db.getRecordById<IQuestion>('questions', currentQuestionNumber);
                if (questionData) {
                    setQuestionPreText(questionData.questionPreText || 'No question pre text available')
                    setQuestion(questionData.questionText || 'No question text available.');
                    setOptions(questionData.optionsText || []);
                } else {
                    console.log('No data found for question number:', currentQuestionNumber);
                }
            } catch (error) {
                console.error('Failed to fetch question:', error);
            }
        };

        fetchQuestion();
    }, [currentQuestionNumber]);

    useEffect(() => {
        if (questionPalette.length > 0) {
            // Ensure the index is valid to avoid accessing undefined
            const currentSelection = questionPalette[currentQuestionNumber - 1]?.selectedAnswer;
            setSelectedOption(currentSelection);
        }
    }, [currentQuestionNumber, questionPalette]);



    // Function to get the Tailwind component for a given question state
    const getComponentForState = (paletteItem: QuestionPaletteItem) => {
        const { state, index } = paletteItem;

        switch (state) {
            case QuestionState.NotAnswered:
                return (
                    <div className="w-8 h-8 relative inline-block">
                        <img src="images/not_answered.svg" alt="Not Answered" className="block w-full h-auto" />
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{index + 1}</span>
                    </div>
                );
            case QuestionState.Answered:
                return (
                    <div className="w-8 h-8 relative inline-block">
                        <img src="images/answered.svg" alt="Answered" className="block w-full h-auto" />
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{index + 1}</span>
                    </div>
                );
            case QuestionState.MarkedForReview:
                return (
                    <div className="w-8 h-8 relative inline-block">
                        <img src="images/marked_for_review.svg" alt="Marked for Review" className="block w-full h-auto" />
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{index + 1}</span>
                    </div>
                );
            case QuestionState.AnsweredAndMarkedForReview:
                return (
                    <div className="relative inline-block">
                        <img src="images/marked_for_review_other.svg" alt="Answered & Marked for Review" className="block w-8 h-8" />
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{index + 1}</span>
                    </div>
                );
            default:
                // For other states, render a default button
                return (
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg text-white bg-gradient-to-tr from-stone-500 to-stone-400 text-sm">
                        {index + 1}
                    </div>
                );
        }
    };


    const onCickQuestionPalette = (index: number) => {
        // Update questionPalette immutably
        setQuestionPalette(prevPalette => {
            const newPalette = [...prevPalette];
            // Update the state of the current question if it's 'NotVisited'
            if (newPalette[currentQuestionNumber - 1].state === QuestionState.NotVisited) {
                newPalette[currentQuestionNumber - 1].state = QuestionState.NotAnswered;
                // Update legend counts immutably for NotVisited to NotAnswered transition
                setLegendCounts(prevCounts => ({
                    ...prevCounts,
                    notVisited: prevCounts.notVisited - 1,
                    notAnswered: prevCounts.notAnswered + 1
                }));
            }
            return newPalette;
        });

        // Update the current question number
        setCurrentQuestionNumber(index + 1);
        // Ensure selectedOption is updated for the new current question
        setSelectedOption(prev => questionPalette[index].selectedAnswer);
    };



    const onClickNavigationButtons = (state: QuestionState) => {
        if (selectedOption !== -1) {
            const currentIndex = currentQuestionNumber - 1;
            const oldState = questionPalette[currentIndex].state;
            // Update legend counts accordingly using the mapping
            setLegendCounts(prevCounts => ({
                ...prevCounts,
                [stateToLegendAction[oldState]]: prevCounts[stateToLegendAction[oldState] as LegendAction] - 1,  // Decrement the count of the old state
                [stateToLegendAction[state]]: prevCounts[stateToLegendAction[state] as LegendAction] + 1  // Increment the count of the new state
            }));

            // Correctly update questionPalette with immutability
            setQuestionPalette(prevPalette => {
                const newPalette = [...prevPalette];

                // Ensure you are modifying the correct item by checking within bounds
                if (currentQuestionNumber - 1 < newPalette.length) {
                    newPalette[currentQuestionNumber - 1].state = state;
                }

                return newPalette;
            });

            // Increment the current question number correctly and handle selectedOption. 
            // Make sure you are not incrementing out of bounds.
            if (currentQuestionNumber !== Number(maxQuestions)) {
                setCurrentQuestionNumber(prevCurrent => {
                    const newCurrent = prevCurrent + 1;
                    // Make sure you're not accessing out of bounds
                    if (newCurrent - 1 < questionPalette.length) {
                        setSelectedOption(questionPalette[newCurrent - 1].selectedAnswer);
                    } else {
                        // Handle case where there is no next question
                        setSelectedOption(-1);
                    }
                    return newCurrent;
                });
            }
        }
        // Check if its the last question and minimum number of questions have been answered.
        const minimumAnsweredQuestions = legendCounts.answered + legendCounts.answeredAndMarkedForReview + 1
        if (currentQuestionNumber === Number(maxQuestions) && minimumAnsweredQuestions >= Number(minimumRequiredQuestions)) {
            setDialogOpen(true);
            setIsCompleted(true);
        }
        else {
            if (currentQuestionNumber === Number(maxQuestions) && minimumAnsweredQuestions < Number(minimumRequiredQuestions)) {
                setDialogOpen(true);
                setIsCompleted(false);
            }
        }
    }


    const clearResponse = () => {
        setSelectedOption(-1); // Clear the selected option when "Clear Response" button is clicked
    };

    // Function to populate question palette state
    async function populateQuestionPalette(items: QuestionPaletteItem[]) {
        // Clear any existing records in the questionPalette object store
        await db.questionPalette.clear();
        // Add the initial state to the questionPalette object store
        await db.questionPalette.bulkPut(items);
    }

    useEffect(() => {
        // Define the interval for running your function periodically
        populateQuestionPalette(questionPalette);
    }, [questionPalette]);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleTestCompletion = async () => {
        router.push('/analysis')
    }

    return (
        <Flex className="bg-[#38B6FF]" direction='column' height={{ md: '100vh' }} width={{ md: '100vw' }}>
            <Box className="bg-[#EAF6FA] bg-opacity-[0.5]" flexGrow='1' style={{ height: '5%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                            <ScrollArea type="always" scrollbars="vertical" size="2" style={{ height: '50%' }}>
                                <Flex direction='column' gap='3'>
                                    {/* Question Pre Text*/}
                                    <Box style={{ 'height': '10%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                        <Text className="pl-8 pr-8" size='3' weight='regular' wrap='pretty' >{questionPreText}</Text>
                                    </Box>
                                    {/* Question */}
                                    <Box style={{ 'height': '10%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                        <Text className="pl-8 pr-8" size='3' weight='medium' wrap='pretty' >{question}</Text>
                                    </Box>
                                    {/* Options */}
                                    <Box style={{ 'height': '20%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                        <RadioGroup.Root size='3' name="Options" className="pl-8 pr-8" highContrast style={{ fontSize: '1.1rem', width: '100%' }}>
                                            {options.map((option, index) => (
                                                <RadioGroup.Item
                                                    style={{
                                                        cursor: 'pointer'
                                                    }}
                                                    key={index}
                                                    value={option}
                                                    className="flex items-center h-8 w-8 pr-8"
                                                    checked={selectedOption === index}
                                                    onClickCapture={(isChecked) => {
                                                        if (isChecked) setSelectedOption(index); // Update the selected option state
                                                    }}
                                                >
                                                    {option}
                                                </RadioGroup.Item>
                                            ))}
                                        </RadioGroup.Root>
                                    </Box>
                                </Flex>
                            </ScrollArea>
                            {/* Saperator */}
                            <Box style={{ 'height': '5%', 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <div className="flex items-center justify-center w-full p-8">
                                    <div className="flex-grow border-t border-black"></div>
                                </div>
                            </Box>
                            {/* Dialog Box */}
                            <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                                <Dialog.Content style={{ background: 'white', borderRadius: '5px', padding: '20px', boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.1)' }}>
                                    <div>
                                        {!isCompleted ?
                                            <Text trim="both" size="4">
                                                Solve at least {minimumRequiredQuestions} questions to complete the test.
                                            </Text> :
                                            <Flex gap='5' style={{ 'height': '100%', 'width': '100%', 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'flex-start', 'justifyContent': 'flex-start' }}>
                                                <Text className="pl-4" size='6' weight='medium' align='left'>Proceed to submit</Text>
                                                <Text className="pl-4" size='4' weight='regular' align='left'>You have reached the end of the test.
                                                    Do you wish to proceed to submit?</Text>
                                                <Flex gap='4' className="pl-4" style={{ 'height': '100%', 'width': '100%', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'flex-start' }} >
                                                    <Dialog.Close>
                                                        <Button style={{ borderRadius: '5px' }} size="3" variant='soft' onClick={() => {
                                                        }}>Cancel</Button>
                                                    </Dialog.Close>
                                                    <Button style={{ borderRadius: '5px' }} size="3" variant='solid' onClick={handleTestCompletion}>Proceed</Button>
                                                </Flex>
                                            </Flex>
                                        }
                                    </div>
                                </Dialog.Content>
                            </Dialog.Root>

                            {/* Navigation Buttons */}

                            <Box className="gap-8" style={{ 'height': '10%', 'width': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center' }}>
                                <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052' }} size="3" variant='solid' onClick={() => {
                                    onClickNavigationButtons(QuestionState.Answered)
                                }}>Save and Next</Button>
                                <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052' }} size="3" variant='solid' onClick={() => {
                                    clearResponse()
                                }}>Clear Response</Button>
                                <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052' }} size="3" variant='solid' onClick={() => {
                                    onClickNavigationButtons(QuestionState.AnsweredAndMarkedForReview)
                                }}>Save and Mark for Review</Button>
                                <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052' }} size="3" variant='solid' onClick={() => {
                                    onClickNavigationButtons(QuestionState.MarkedForReview)
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
                                            onCickQuestionPalette(index)
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
                                    <div className="w-8 h-8 flex items-center justify-center rounded-lg text-white bg-gradient-to-tr from-stone-500 to-stone-400 text-sm">
                                        {legendCounts.notVisited}
                                    </div>
                                    <div className="pl-1">Not Visited</div>
                                </div>
                                <div className="flex flex-row items-center justify-center">
                                    <div className="w-8 h-8 relative inline-block">
                                        <img src="images/not_answered.svg" alt="Custom Vector" className="block w-full h-auto" />
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{legendCounts.notAnswered}</span>
                                    </div>
                                    <div className="pl-1 whitespace-nowrap">Not Answered</div>
                                </div>
                                <div className="pl-8 flex flex-row items-center justify-center">
                                    <div className="w-8 h-8 relative inline-block">
                                        <img src="images/answered.svg" alt="Custom Vector" className="block w-full h-auto" />
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{legendCounts.answered}</span>
                                    </div>
                                    <div className="pl-1">Answered</div>
                                </div>
                                <div className="pl-8 flex flex-row items-center justify-center">
                                    <div className="w-8 h-8 relative inline-block">
                                        <img src="images/marked_for_review.svg" alt="Custom Vector" className="block w-full h-auto" />
                                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{legendCounts.markedForReview}</span>
                                    </div>
                                    <div className="pl-1">Marked for Review</div>
                                </div>
                                <div className="pl-11 flex flex-row items-center justify-center" style={{ 'gridColumn': '1 / span 2', 'gridRow': '3 / 4' }}>
                                    <div className="relative inline-block">
                                        <img src="images/marked_for_review_other.svg" alt="Custom Vector" className="block w-12 h-12" />
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

const Page = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <MainComponent />
    </Suspense>
);

export default Page;