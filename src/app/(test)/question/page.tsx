"use client"
import useAuth from "@/app/hooks/useAuth";
import { Flex, Box, Text, Button, RadioGroup, Dialog, ScrollArea, Grid } from "@radix-ui/themes";
import { useState, useEffect } from 'react';
import db, { IQuestion } from '@/app/utils/indexedDbUtils';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react'
import dynamic from "next/dynamic";
import OrigamiAnimation from "@/app/components/splash-screen/OrigamiAnimation";
import Header from "@/app/components/header/Header";
import { decryptParams, Params } from "@/app/utils/paramUtils";
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

const MainComponent = () => {
    // Get isAuthenticated in case you need to use it for future operations
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    // Define breakpoints for tablet and mobile screens
    const isMobileSmall = useMediaQuery({ query: '(max-width: 499px) and (max-height: 999px)' });
    const isTabletMedium = useMediaQuery({ query: '(min-width: 500px) and (max-width: 900px) and (max-height: 1500px)' });
    const searchParams = useSearchParams()
    // Decode the params
    const encodedParams = searchParams.get('params');
    let decodedParams: Params = {}; // Ensure decodedParams is always of type Params

    if (encodedParams) {
        const decoded = decryptParams(encodedParams);
        if (decoded !== null) {
            decodedParams = decoded;
        } else {
            // Handle the case when decoding fails, if needed
            console.error('Failed to decode parameters');
        }
    }

    const maxQuestions = decodedParams.maxQuestions;
    const minimumRequiredQuestions = decodedParams.minimumRequiredQuestions;

    // Snippet for showing time left to the user
    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const duration = decodedParams.duration;
    const totalTimeInSeconds = parseInt(duration.split(" ")[0]) * 60;
    const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);
    const [testCompletionDialogOpen, setTestCompletionDialogOpen] = useState(false);
    const initialFormattedTime = formatTime(totalTimeInSeconds);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timerId);
        } else {
            setTestCompletionDialogOpen(true)
            setTimeout(() => {
                router.push('/analysis'); // Redirect to the analysis page
            }, 3000);
        }
    }, [timeLeft, router]);

    // Define currentQuestionNumber
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
    // Define selectedOption
    const [selectedOption, setSelectedOption] = useState(-1);
    // Define legendCounts
    const [legendCounts, setLegendCounts] = useState({
        notVisited: Number(maxQuestions), // Assuming 50 questions initially
        notAnswered: 0,
        answered: 0,
        markedForReview: 0,
        answeredAndMarkedForReview: 0
    });

    // Track the time when the user starts viewing a question
    const [questionStartTime, setQuestionStartTime] = useState(Date.now())

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
        questionId: string;
        timeTaken: number;
    };

    const [questionPalette, setQuestionPalette] = useState<QuestionPaletteItem[]>([]);

    // Required to handle edge cases while updating question palette
    const [lastQuestionUpdated, setLastQuestionUpdated] = useState(false)
    const [firstQuestionUpdated, setFirstQuestionUpdated] = useState(false)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const questions = await db.questions.toArray(); // Assuming 'questions' table is correctly referenced

                const initialPalette: QuestionPaletteItem[] = questions.map((question, index) => ({
                    index: index,
                    questionId: question.questionId || 'N/A', // Fallback to 0 if undefined
                    state: QuestionState.NotVisited,
                    selectedAnswer: -1,
                    timeTaken: 0 // In seconds
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
        if (questionPalette.length > 0 && selectedOption !== -1) {
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
                        <Image
                            src="/images/not_answered.svg"
                            alt="Not Answered"
                            layout="fill"
                            className="block w-full h-auto"
                        />
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{index + 1}</span>
                    </div>
                );
            case QuestionState.Answered:
                return (
                    <div className="w-8 h-8 relative inline-block">
                        <Image
                            src="/images/answered.svg"
                            alt="Answered"
                            layout="fill"
                            className="block w-full h-auto"
                        />
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{index + 1}</span>
                    </div>
                );
            case QuestionState.MarkedForReview:
                return (
                    <div className="w-8 h-8 relative inline-block">
                        <Image
                            src="/images/marked_for_review.svg"
                            alt="Marked for Review"
                            layout="fill"
                            className="block w-full h-auto"
                        />
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{index + 1}</span>
                    </div>
                );
            case QuestionState.AnsweredAndMarkedForReview:
                return (
                    <div className="relative inline-block">
                        <Image
                            src="/images/marked_for_review_other.svg"
                            alt="Answered & Marked for Review"
                            width={32}
                            height={32}
                            className="block"
                        />
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


    const onClickQuestionPalette = (index: number) => {
        if (currentQuestionNumber - 1 == index) { return; }
        // Calculate time spent on the current question
        const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

        const updateTimeSpentPerQuestion = () => {
            setQuestionPalette(prevPalette => {
                const newPalette = [...prevPalette];
                newPalette[currentQuestionNumber - 1].timeTaken += timeSpent / 2;
                return newPalette;
            });
        }

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

        updateTimeSpentPerQuestion();
        // Update the current question number
        setCurrentQuestionNumber(index + 1);
        // Ensure selectedOption is updated for the new current question
        setSelectedOption(prev => questionPalette[index].selectedAnswer);
        // Reset the question start time
        setQuestionStartTime(Date.now());
    };



    const onClickNavigationButtons = (
        state: QuestionState,
        operator: string,
        overrideSelectedOption: boolean
    ) => {
        const currentIndex = currentQuestionNumber - 1;
        const oldState = questionPalette[currentIndex].state;
        const isLastQuestion = currentQuestionNumber === Number(maxQuestions) && operator === 'increment';
        const isFirstQuestion = currentQuestionNumber === 1 && operator === 'decrement';

        // Calculate time spent on the current question
        const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

        const updateLegendCounts = (oldState: QuestionState, newState: QuestionState) => {
            if (oldState !== newState) {
                setLegendCounts(prevCounts => ({
                    ...prevCounts,
                    [stateToLegendAction[oldState]]: prevCounts[stateToLegendAction[oldState] as LegendAction] - 1,
                    [stateToLegendAction[newState]]: prevCounts[stateToLegendAction[newState] as LegendAction] + 1
                }));
            }
        };

        const updateQuestionPalette = (index: number, newState: QuestionState) => {
            setQuestionPalette(prevPalette => {
                const newPalette = [...prevPalette];
                if (index < newPalette.length) {
                    newPalette[index].state = newState;
                }
                return newPalette;
            });
        };

        const updateTimeSpentPerQuestion = () => {
            setQuestionPalette(prevPalette => {
                const newPalette = [...prevPalette];
                newPalette[currentQuestionNumber - 1].timeTaken += timeSpent / 2;
                return newPalette;
            });
        }


        const updateCurrentQuestionNumber = (operator: string) => {
            setCurrentQuestionNumber(prevCurrent => {
                const newCurrent = operator === 'increment' ? prevCurrent + 1 : prevCurrent - 1;
                setSelectedOption(newCurrent - 1 < questionPalette.length ? questionPalette[newCurrent - 1].selectedAnswer : -1);
                return newCurrent;
            });
        };

        updateTimeSpentPerQuestion()

        if (overrideSelectedOption) {
            if (oldState === QuestionState.NotVisited) {
                if (isLastQuestion && !lastQuestionUpdated) {
                    updateLegendCounts(oldState, state);
                    setLastQuestionUpdated(true);
                } else if (isFirstQuestion && !firstQuestionUpdated) {
                    updateLegendCounts(oldState, state);
                    setFirstQuestionUpdated(true);
                } else if (!isLastQuestion && !isFirstQuestion) {
                    updateLegendCounts(oldState, state);
                }
                updateQuestionPalette(currentIndex, state);
            }
            if (!(isLastQuestion || isFirstQuestion)) {
                updateCurrentQuestionNumber(operator);
            }
        } else if (selectedOption !== -1) {
            if (isLastQuestion && !lastQuestionUpdated) {
                updateLegendCounts(oldState, state);
                setLastQuestionUpdated(true);
            } else if (isFirstQuestion && !firstQuestionUpdated) {
                updateLegendCounts(oldState, state);
                setFirstQuestionUpdated(true);
            } else {
                updateLegendCounts(oldState, state);
            }
            updateQuestionPalette(currentIndex, state);
            if (currentQuestionNumber !== Number(maxQuestions) && currentQuestionNumber !== 0) {
                updateCurrentQuestionNumber(operator);
            }
        }

        // Reset the question start time
        setQuestionStartTime(Date.now());
    };



    const submit = () => {
        // Check if its the last question and minimum number of questions have been answered.
        const minimumAnsweredQuestions = legendCounts.answered + legendCounts.answeredAndMarkedForReview + 1
        if (minimumAnsweredQuestions >= Number(minimumRequiredQuestions)) {
            setDialogOpen(true);
            setIsCompleted(true);
        }
        else {
            if (minimumAnsweredQuestions < Number(minimumRequiredQuestions)) {
                setDialogOpen(true);
                setIsCompleted(false);
            }
        }
    }


    const clearResponse = () => {
        if (selectedOption !== -1) {
            const currentIndex = currentQuestionNumber - 1;
            const oldState = questionPalette[currentIndex].state;
            // Update the legend counts
            const updateLegendCounts = (oldState: QuestionState, newState: QuestionState) => {
                if (oldState !== newState) {
                    setLegendCounts(prevCounts => ({
                        ...prevCounts,
                        [stateToLegendAction[oldState]]: prevCounts[stateToLegendAction[oldState] as LegendAction] - 1,
                        [stateToLegendAction[newState]]: prevCounts[stateToLegendAction[newState] as LegendAction] + 1
                    }));
                }
            };
            // Update the question palette
            const updateQuestionPalette = (index: number, newState: QuestionState) => {
                setQuestionPalette(prevPalette => {
                    const newPalette = [...prevPalette];
                    if (index < newPalette.length) {
                        newPalette[index].state = newState;
                        console.log("Updated Palette:", newPalette);
                    }
                    return newPalette;
                });
            };

            updateLegendCounts(oldState, QuestionState.NotVisited)
            updateQuestionPalette(currentIndex, QuestionState.NotVisited)
            setSelectedOption(-1); // Clear the selected option when "Clear Response" button is clicked
        }
    };

    async function storeQuestionPalette(items: QuestionPaletteItem[]) {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
            const res = await fetch(`${baseUrl}/create-or-update-answers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(items),
                credentials: 'include'
            });
            if (!res.ok) {
                throw new Error(`Error storing question palette, status = ${res.status}`);
            }
        } catch (error) {
            console.error("Error storing question palette:", error);
            throw error;
        }
    }

    // Function to populate question palette state
    async function populateQuestionPalette(items: QuestionPaletteItem[]) {
        // Clear any existing records in the questionPalette object store
        db.questionPalette.clear();
        // Add the initial state to the questionPalette object store
        db.questionPalette.bulkPut(items);
        // Function used to store questionPalette(user's answers)
        storeQuestionPalette(items)
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

    if (loading) {
        return <OrigamiAnimation />;
    }

    if (!isAuthenticated) {
        return <OrigamiAnimation />;
    }

    return isMobileSmall ? (
        <Flex direction='column' className="bg-[#38B6FF] px-3 pt-7 pb-4 h-screen w-screen" style={{ position: 'absolute' }}>
            <Flex direction='column' className="h-full w-full" gapY='2'>
                <Header></Header>
                <Box className="mt-[8px] mobile-very-small:mt-[12px] h-[10%]" style={{
                    display: 'flex',
                    flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'stretch',
                    gap: '10px', // Reduced gap for mobile
                    flex: 1,
                }}>
                    {/* Menu Box */}
                    <Box p="4" style={{
                        width: '50%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}>
                        <Flex gapX='2' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                            <Image
                                src="/images/menu.svg"
                                alt="Menu"
                                width={18}
                                height={18}
                            />
                            <Text size="2" weight="medium" wrap="pretty">Question</Text>
                        </Flex>
                    </Box>
                    {/* Timer */}
                    <Flex direction='column' p='4' style={{ 'width': '50%', alignItems: 'center', justifyContent: 'center', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Flex gapX='2' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                            <Image
                                src="/images/timer.svg"
                                alt="Timer"
                                width={18}
                                height={18}
                            />
                            <Text size='2' weight='medium' wrap='pretty'>Time Remaining</Text>
                        </Flex>
                        <Text>{formatTime(timeLeft)} / {initialFormattedTime}</Text>
                    </Flex>
                </Box>
                <Text className="pl-8 pt-2" size='6' weight='bold' wrap='pretty' >Question {currentQuestionNumber}</Text>
                {/* Saperator */}
                <Flex style={{ 'width': '100%', 'alignItems': 'center' }}>
                    <div className="flex items-center justify-center w-full p-4">
                        <div className="flex-grow border-t border-black"></div>
                    </div>
                </Flex>
                <ScrollArea type="always" scrollbars="vertical" size="2" style={{ height: '65%' }}>
                    <Flex direction='column' gap='3'>
                        {/* Question Pre Text*/}
                        <Box style={{ 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                            <Text className="pl-8 pr-8" size='3' weight='regular' wrap='pretty' >{questionPreText}</Text>
                        </Box>
                        {/* Question */}
                        <Box style={{ 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                            <Text className="pl-8 pr-8" size='3' weight='medium' wrap='pretty' >{question}</Text>
                        </Box>
                        {/* Options */}
                        <Box style={{ 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                            <RadioGroup.Root size='3' name="Options" className="pl-8 pr-8" highContrast style={{ fontSize: '1.1rem', width: '100%' }}>
                                {options.map((option, index) => (
                                    <RadioGroup.Item
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        key={index}
                                        value={option}
                                        className="flex items-center h-8 w-8 pr-8 tablet-medium:m-2"
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
                <Flex style={{ 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                    <div className="flex items-center justify-center w-full p-4">
                        <div className="flex-grow border-t border-black"></div>
                    </div>
                </Flex>
                {/* Dialog Box */}
                <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                    <Dialog.Content style={{ backgroundColor: '#DFF6FA', borderRadius: '5px', padding: '20px', boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.1)' }}>
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
                                            <Button style={{ borderRadius: '5px', backgroundColor: 'rgba(0, 0, 59, 0.051)', color: '#60646C', }} size="3" variant='soft' onClick={() => {
                                            }}>Cancel</Button>
                                        </Dialog.Close>
                                        <Button style={{ borderRadius: '5px', backgroundColor: '#120052' }} size="3" variant='solid' onClick={handleTestCompletion}>Proceed</Button>
                                    </Flex>
                                </Flex>
                            }
                        </div>
                    </Dialog.Content>
                </Dialog.Root>
                {/* Test completion dialog, Not part of this Flex */}
                <Dialog.Root open={testCompletionDialogOpen}>
                    <Dialog.Content style={{ backgroundColor: '#DFF6FA', borderRadius: '5px', padding: '20px', boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.1)' }}>
                        <Text>The test has ended. Please wait while we redirect you to the analysis page.</Text>
                    </Dialog.Content>
                </Dialog.Root>

                {/* Navigation Buttons */}
                <Flex direction='column' className="gap-4 w-[100%]" style={{ 'alignContent': 'center', 'justifyContent': 'start' }}>
                    <Flex direction='row' className="gap-1 w-[100%]" style={{ 'alignItems': 'center', 'justifyContent': 'center' }}>
                        <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052', cursor: 'pointer' }} size="2" variant='solid' onClick={() => {
                            onClickNavigationButtons(QuestionState.Answered, 'increment', false)
                        }}>Save and Next</Button>
                        <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052', cursor: 'pointer' }} size="2" variant='solid' onClick={() => {
                            clearResponse()
                        }}>Clear Response</Button>
                    </Flex>
                    <Flex direction='row' className="gap-1 w-[100%]" style={{ 'alignItems': 'center', 'justifyContent': 'center' }}>
                        <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052', cursor: 'pointer', padding: '6px' }} size="2" variant='solid' onClick={() => {
                            onClickNavigationButtons(QuestionState.AnsweredAndMarkedForReview, 'increment', false)
                        }}>Save and Mark for Review</Button>
                        <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052', cursor: 'pointer', padding: '6px' }} size="2" variant='solid' onClick={() => {
                            onClickNavigationButtons(QuestionState.MarkedForReview, 'increment', false)
                        }}>Mark for Review and Next</Button>
                    </Flex>
                    <Flex direction='row' className="gap-1 w-[100%]" style={{ 'alignItems': 'center', 'justifyContent': 'center' }}>
                        <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052', cursor: 'pointer' }} size="2" variant='solid' onClick={() => { onClickNavigationButtons(QuestionState.NotAnswered, 'decrement', true) }}>Previous</Button>
                        <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052', cursor: 'pointer' }} size="2" variant='solid' onClick={submit}>Submit</Button>
                        <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052', cursor: 'pointer' }} size="2" variant='solid' onClick={() => { onClickNavigationButtons(QuestionState.NotAnswered, 'increment', true) }}>Next</Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    ) : (
        <Flex className="bg-[#38B6FF] p-8 h-screen w-screen" direction='column' style={{ position: 'absolute' }}>
            <Header></Header>
            <Box className="h-[100%] w-[100%]">
                <Flex className="h-[100%] w-[100%]" gap='4'>
                    <Box className="my-4 h-[100%] w-[75%] tablet-medium:w-[65%]">
                        <Flex className="h-[100%] w-[100%]" direction='column' gap='4'>
                            <Flex direction='row' style={{ 'width': '100%', 'justifyContent': 'space-between', 'alignItems': 'center' }}>
                                <Text className="pl-8" size='6' weight='bold' wrap='pretty' >Question {currentQuestionNumber}</Text>
                                {/* Menu Box */}
                                <Box p="4" mr='5' style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)'
                                }}>
                                    <Image
                                        src="/images/menu.svg"
                                        alt="Menu"
                                        width={20}
                                        height={20}
                                    />
                                    <Text size="3" weight="medium" wrap="pretty" style={{ marginLeft: '8px' }}>Question</Text>
                                </Box>
                            </Flex>
                            {/* Saperator */}
                            <Flex style={{ 'width': '100%', 'alignItems': 'center' }}>
                                <div className="flex items-center justify-center w-full p-4">
                                    <div className="flex-grow border-t border-black"></div>
                                </div>
                            </Flex>
                            <ScrollArea type="always" scrollbars="vertical" size="2" style={{ height: isTabletMedium ? '50%' : '40%', maxHeight: isTabletMedium ? '50vh' : '300px', overflow: 'hidden' }}>
                                <Flex direction='column' gap='3'>

                                    <Box style={{ 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                        <Text className="pl-8 pr-8" size='3' weight='regular' wrap='pretty' >{questionPreText}</Text>
                                    </Box>

                                    <Box style={{ 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                        <Text className="pl-8 pr-8" size='3' weight='medium' wrap='pretty' >{question}</Text>
                                    </Box>

                                    <Box style={{ 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                        <RadioGroup.Root size='3' name="Options" className="pl-8 pr-8" highContrast style={{ fontSize: '1.1rem', width: '100%' }}>
                                            {options.map((option, index) => (
                                                <RadioGroup.Item
                                                    style={{
                                                        cursor: 'pointer'
                                                    }}
                                                    key={index}
                                                    value={option}
                                                    className="flex items-center h-8 w-8 pr-8 tablet-medium:m-2"
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
                            <Flex style={{ 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}>
                                <div className="flex items-center justify-center w-full p-4">
                                    <div className="flex-grow border-t border-black"></div>
                                </div>
                            </Flex>
                            {/* Dialog Box */}
                            <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                                <Dialog.Content style={{ backgroundColor: '#DFF6FA', borderRadius: '5px', padding: '20px', boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.1)' }}>
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
                                                        <Button style={{ borderRadius: '5px', backgroundColor: 'rgba(0, 0, 59, 0.051)', color: '#60646C', }} size="3" variant='soft' onClick={() => {
                                                        }}>Cancel</Button>
                                                    </Dialog.Close>
                                                    <Button style={{ borderRadius: '5px', backgroundColor: '#120052' }} size="3" variant='solid' onClick={handleTestCompletion}>Proceed</Button>
                                                </Flex>
                                            </Flex>
                                        }
                                    </div>
                                </Dialog.Content>
                            </Dialog.Root>
                            {/* Navigation Buttons */}
                            <Flex direction='column' className="gap-4 w-[100%]" style={{ 'alignContent': 'center', 'justifyContent': 'start' }}>
                                <Flex direction='row' className="gap-6 w-[100%]" style={{ 'alignItems': 'center', 'justifyContent': 'center' }}>
                                    <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052', cursor: 'pointer' }} size={isTabletMedium ? "2" : "3"} variant='solid' onClick={() => {
                                        onClickNavigationButtons(QuestionState.Answered, 'increment', false)
                                    }}>Save and Next</Button>
                                    <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052', cursor: 'pointer' }} size={isTabletMedium ? "2" : "3"} variant='solid' onClick={() => {
                                        clearResponse()
                                    }}>Clear Response</Button>
                                </Flex>
                                <Flex direction='row' className="gap-6 w-[100%]" style={{ 'alignItems': 'center', 'justifyContent': 'center' }}>
                                    <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052', cursor: 'pointer' }} size={isTabletMedium ? "2" : "3"} variant='solid' onClick={() => {
                                        onClickNavigationButtons(QuestionState.AnsweredAndMarkedForReview, 'increment', false)
                                    }}>Save and Mark for Review</Button>
                                    <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052', cursor: 'pointer' }} size={isTabletMedium ? "2" : "3"} variant='solid' onClick={() => {
                                        onClickNavigationButtons(QuestionState.MarkedForReview, 'increment', false)
                                    }}>Mark for Review and Next</Button>
                                </Flex>
                                <Flex direction='row' className="gap-6 w-[100%]" style={{ 'alignItems': 'center', 'justifyContent': 'center' }}>
                                    <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052', cursor: 'pointer' }} size={isTabletMedium ? "2" : "3"} variant='solid' onClick={() => { onClickNavigationButtons(QuestionState.NotAnswered, 'decrement', true) }}>Previous</Button>
                                    <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052', cursor: 'pointer' }} size={isTabletMedium ? "2" : "3"} variant='solid' onClick={submit}>Submit</Button>
                                    <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052', cursor: 'pointer' }} size={isTabletMedium ? "2" : "3"} variant='solid' onClick={() => { onClickNavigationButtons(QuestionState.NotAnswered, 'increment', true) }}>Next</Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Box>
                    <Box className="my-4 h-[100%] w-[25%] tablet-medium:w-[35%]">
                        <Flex gapY='4' direction='column' style={{ height: '100%', width: '100%', alignItems: 'center' }}>
                            {/* Timer */}
                            <Flex direction='column' p='3' style={{ 'width': '100%', alignItems: 'center', justifyItems: 'center', justifyContent: 'space-between', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                <Flex gapX='2' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                                    <Image
                                        src="/images/timer.svg"
                                        alt="Timer"
                                        width={20}
                                        height={20}
                                    />
                                    <Text size='4' weight='medium' wrap='pretty'>Time Remaining</Text>
                                </Flex>
                                <Text>{formatTime(timeLeft)} / {initialFormattedTime}</Text>
                            </Flex>
                            {/* Test completion dialog, Not part of this Flex */}
                            <Dialog.Root open={testCompletionDialogOpen}>
                                <Dialog.Content style={{ backgroundColor: '#DFF6FA', borderRadius: '5px', padding: '20px', boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.1)' }}>
                                    <Text>The test has ended. Please wait while we redirect you to the analysis page.</Text>
                                </Dialog.Content>
                            </Dialog.Root>
                            {/* Questions List */}
                            <Flex direction='column' gapY='2' style={{ justifyContent: 'center', alignContent: 'center', width: '100%' }}>
                                <Flex direction='row' gapX='2' style={{ alignItems: 'center', justifyContent: 'left', width: '100%' }}>
                                    <Image
                                        src="/images/question_palette.svg"
                                        alt="Question Palette"
                                        width={24}
                                        height={24}
                                    />
                                    <Text size='4' weight='medium' wrap='pretty'>Question Palette</Text>
                                </Flex>
                                {/* Questions List Buttons */}
                                <Grid gapY='1' style={{ 'width': '100%', 'gridTemplateColumns': 'repeat(8, 1fr)', alignItems: 'center', justifyItems: 'center' }}>
                                    {questionPalette.map((state, index) => (
                                        <div key={index} style={{ width: '30px', height: '30px' }}>
                                            <button onClick={() => {
                                                // Here index is the index of the question that is clicked
                                                onClickQuestionPalette(index)
                                            }} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{getComponentForState(state)}</button>
                                        </div>
                                    ))}
                                </Grid>
                            </Flex>
                            {/* Legend */}
                            <Flex direction='column' gapY='2' style={{ justifyContent: 'center', alignContent: 'center', width: '100%' }}>
                                <Flex direction='row' gapX='2' style={{ display: 'flex', alignItems: 'center', justifyContent: 'left', width: '100%' }}>
                                    <Image
                                        src="/images/legend.svg"
                                        alt="Legend"
                                        width={24}
                                        height={24}
                                    />
                                    <Text size='4' weight='medium' wrap='pretty'>Legend</Text>
                                </Flex>
                                {/* Legend Buttons */}
                                <Grid gapX={isTabletMedium ? '3' : '9'} pl={isTabletMedium ? '0' : '2'} style={{
                                    'width': '100%', 'display': 'grid', gridTemplateRows: isTabletMedium ? 'repeat(3, 2fr)' : 'repeat(3, 2fr)',
                                    gridTemplateColumns: isTabletMedium ? '2fr 1fr' : 'min-content auto',
                                    alignItems: 'center', justifyItems: 'left'
                                }}>
                                    <div className="flex flex-row items-center justify-center">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-lg text-white bg-gradient-to-tr from-stone-500 to-stone-400 text-sm">
                                            {legendCounts.notVisited}
                                        </div>
                                        <div className="pl-1">Not Visited</div>
                                    </div>
                                    <div className="flex flex-row items-center justify-center">
                                        <div className="w-8 h-8 relative inline-block">
                                            <Image
                                                src="/images/not_answered.svg"
                                                alt="Not Answered"
                                                layout="fill"
                                                className="block w-full h-auto"
                                            />
                                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{legendCounts.notAnswered}</span>
                                        </div>
                                        <div className="pl-1 whitespace-nowrap">Not Answered</div>
                                    </div>
                                    <div className="flex flex-row items-center justify-center">
                                        <div className="w-8 h-8 relative inline-block">
                                            <Image
                                                src="/images/answered.svg"
                                                alt="Answered"
                                                layout="fill"
                                                className="block w-full h-auto"
                                            />
                                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{legendCounts.answered}</span>
                                        </div>
                                        <div className="pl-1">Answered</div>
                                    </div>
                                    <div className="flex flex-row items-center justify-center">
                                        <div className="tablet-medium:w-9 tablet-medium:h:9 w-7 h-7 relative inline-block">
                                            <Image
                                                src="/images/marked_for_review.svg"
                                                alt="Marked For Review"
                                                layout="fill"
                                                className="block w-full h-auto"
                                            />
                                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{legendCounts.markedForReview}</span>
                                        </div>
                                        <div className="pl-1">Marked for Review</div>
                                    </div>
                                    <div className="flex flex-row items-center justify-center" style={{ 'gridColumn': '1 / span 2', 'gridRow': '3 / 4' }}>
                                        <div className="tablet-medium:w-14 tablet-medium:h:14 w-11 h-11 relative inline-block">
                                            <Image
                                                src="/images/marked_for_review_other.svg"
                                                alt="Marked For Review Other"
                                                layout="fill"
                                                className="block w-full h-auto"
                                            />
                                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm">{legendCounts.answeredAndMarkedForReview}</span>
                                        </div>
                                        <div className="pl-1">Answered & Marked for Review (will be considered for evaluation)</div>
                                    </div>
                                </Grid>
                            </Flex>
                            {/* Assistant */}
                            <Flex direction='column' gapY='2' style={{ justifyContent: 'center', alignContent: 'center', width: '100%' }}>
                                <Flex gapX='2' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', width: '100%' }}>
                                    <Image
                                        src="/images/assistant.svg"
                                        alt="Assistant"
                                        width={24}
                                        height={24}
                                    />
                                    <Text size='4' weight='medium' wrap='pretty'>Assistant</Text>
                                </Flex>
                                {/* Assistant Box */}
                                <Box p="2" style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '8px',
                                    backgroundColor: '#EAF6FA',
                                    cursor: 'pointer',
                                    boxShadow: '4px 4px 25px 5px rgba(0, 0, 0, 0.2)'
                                }}>
                                    <Text size="3" weight="medium" wrap="pretty" style={{ marginLeft: '4px' }}>👋 How may I help you?</Text>
                                </Box>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex >
            </Box >
        </Flex >
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