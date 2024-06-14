'use client'

import { Flex, Box, Text, ScrollArea } from "@radix-ui/themes";
import OverviewPerformancePieChart from "@/app/components/visualisations/OverviewPerformancePieChart";
import React, { Suspense, useEffect, useState } from 'react';
import PerformanceTable from "@/app/components/visualisations/PerformanceTable";
import db from "@/app/utils/indexedDbUtils";
import useAuth from "@/app/hooks/useAuth";
import dynamic from "next/dynamic";
import OrigamiAnimation from "@/app/components/splash-screen/OrigamiAnimation";
import Header from "@/app/components/header/Header";
import TimeTakenPerQuestion from "@/app/components/visualisations/TimeTakenPerQuestion";
import Image from 'next/image';



interface IPerformanceTable {
    question_number: number;
    user_answer: string;
    correct_answer: string;
    result_status: string;
}

interface ITimeTakenPerQuestion {
    'question': string;
    'timeTaken': number
}

const MainComponent = () => {
    console.log('analysis component mounted')
    const { isAuthenticated, loading } = useAuth();
    const [performanceScores, setPerformanceScores] = useState({ correctAnswers: 0, incorrectAnswers: 0 });
    const [performanceTable, setPerformanceTable] = useState<IPerformanceTable[]>([]);
    const [timeTakenPerQuestion, setTimeTakenPerQuestion] = useState<ITimeTakenPerQuestion[]>([]);

    // Function to fetch performance scores
    async function getPerformanceScores() {
        const scores = await db.calculatePerformanceScores(); // Assume this returns an object with correct and incorrect answers
        setPerformanceScores(scores); // Update state with fetched scores
    }

    // Function to fetch question analysis table
    async function getPerformanceTable() {
        const performanceTable = await db.generatePerformanceTable(); // Assume this returns an array of analysis data
        setPerformanceTable(performanceTable); // Update state with fetched data
    }

    // Function to fetch question analysis table
    async function getTimeSpentPerQuestion() {
        const timeTakenPerQuestion = await db.getTimeTakenPerQuestion(); // Assume this returns an array of analysis data
        setTimeTakenPerQuestion(timeTakenPerQuestion); // Update state with fetched data
    }

    // Effect to run once on component mount
    useEffect(() => {
        getPerformanceScores();
        getPerformanceTable();
        getTimeSpentPerQuestion();
    }, []); // Empty dependency array ensures this effect runs only once after the initial render

    if (loading) {
        return <OrigamiAnimation />;
    }

    if (!isAuthenticated) {
        return <OrigamiAnimation />;
    }

    return (
        <ScrollArea type="always" scrollbars="vertical" size="2" style={{ height: '100vh', position: 'absolute' }}>
            <Flex direction='column' className="bg-[#38B6FF] flex-col items-center justify-center gap-8 p-8" style={{ position: 'relative', height: '100%' }}>
                <Header></Header>
                <Box className="bg-[#EAF6FA] px-8" style={{ 'width': '70%', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'start', 'alignItems': 'start', 'borderRadius': '5px', 'boxShadow': '2px 2px 10px 2px rgba(0, 0, 0, 0.15)' }}>
                    <Flex className="flex-col gap-8 p-14">
                        <Flex direction='row' gap='3' style={{ alignContent: 'center' }}>
                            <Image
                                src="/images/performance_overview.svg"
                                alt="Performance Overview"
                                width={40}
                                height={40}
                            />
                            <Text size='8' wrap='pretty' >Overview of Performance</Text>
                        </Flex>
                        <Text size='4' weight='light' wrap='pretty' >This section provides a quick glance at your overall test results. The chart visualizes the proportion of correct to incorrect answers, offering you a clear, immediate sense of how you performed.
                            Below, a concise summary highlights your total correct answers, giving you a foundational snapshot of your performance.</Text>
                        <Box style={{ "alignSelf": 'center' }}>
                            <OverviewPerformancePieChart {...performanceScores} />
                        </Box>
                    </Flex >
                </Box>
                <Box className="bg-[#EAF6FA] px-8" style={{ 'width': '70%', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'start', 'alignItems': 'start', 'borderRadius': '5px', 'boxShadow': '2px 2px 10px 2px rgba(0, 0, 0, 0.15)' }}>
                    <Flex className="flex-col gap-8 p-14">
                        <Flex direction='row' align='start' gap='3' style={{ alignContent: 'center' }}>
                            <Image
                                src="/images/detailed_analysis.svg"
                                alt="Performance Overview"
                                width={40}
                                height={40}
                            />
                            <Text size='8' wrap='pretty' >Detailed Question Analysis</Text>
                        </Flex>
                        <Text size='4' weight='light' wrap='pretty' >Dive into every question you faced with this detailed table. It lists your answers alongside the correct answers, color-coded to distinguish successes from missteps.
                            This tool is perfect for reviewing specific areas where you excelled or need improvement, making it easier to target your studies effectively.</Text>
                        <Box style={{ "alignSelf": 'center' }}>
                            <PerformanceTable data={performanceTable} />
                        </Box>
                    </Flex >
                </Box>
                <Box className="bg-[#EAF6FA] px-8" style={{ 'width': '70%', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'start', 'alignItems': 'start', 'borderRadius': '5px', 'boxShadow': '2px 2px 10px 2px rgba(0, 0, 0, 0.15)' }}>
                    <Flex className="flex-col gap-8 p-14">
                        <Flex direction='row' align='start' gap='3' style={{ alignContent: 'center' }}>
                            <Image
                                src="/images/time_spent_per_question.svg"
                                alt="Performance Overview"
                                width={40}
                                height={40}
                            />
                            <Text size='8' wrap='pretty' >Time Taken Per Question</Text>
                        </Flex>
                        <Text size='4' weight='light' wrap='pretty' >This chart displays the duration taken to answer each question in a sequence.
                            Each point on the chart represents the time spent on a specific question, with the line connecting these points to illustrate the overall trend.
                            You can zoom in to see the points better and pick to move around the graph.</Text>
                        <TimeTakenPerQuestion data={timeTakenPerQuestion} />
                    </Flex >
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