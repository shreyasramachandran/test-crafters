'use client'

import { Flex, Box, Text, ScrollArea } from "@radix-ui/themes";
import OverviewPerformancePieChart from "@/app/components/visualisations/OverviewPerformancePieChart";
import React, { useEffect, useState } from 'react';
import PerformanceTable from "@/app/components/visualisations/PerformanceTable";
import db from "@/app/utils/index-db/operations";

interface IPerformanceTable {
    question_number: number;
    user_answer: string;
    correct_answer: string;
    result_status: string;
}

export default function Page() {
    const [performanceScores, setPerformanceScores] = useState({ correctAnswers: 0, incorrectAnswers: 0 });
    const [performanceTable, setPerformanceTable] = useState<IPerformanceTable[]>([]);

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

    // Effect to run once on component mount
    useEffect(() => {
        getPerformanceScores();
        getPerformanceTable();
    }, []); // Empty dependency array ensures this effect runs only once after the initial render


    return (
        <ScrollArea type="always" scrollbars="vertical" size="2" style={{ height: '100vh' }}>
            <Flex className="bg-[#38B6FF] flex-col items-center justify-center gap-8 p-8">
                <Box className="bg-[#EAF6FA] px-8" style={{ 'width': '50%', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'start', 'alignItems': 'start', 'borderRadius': '5px', 'boxShadow': '2px 2px 10px 2px rgba(0, 0, 0, 0.15)' }}>
                    <Flex className="flex-col gap-8 p-14">
                        <Text size='5' weight='bold' wrap='pretty' >Overview of Performance</Text>
                        <Text size='4' weight='light' wrap='pretty' >This section provides a quick glance at your overall test results. The chart visualizes the proportion of correct to incorrect answers, offering you a clear, immediate sense of how you performed.
                            Below, a concise summary highlights your total correct answers, giving you a foundational snapshot of your performance.</Text>
                        <Box style={{ "alignSelf": 'center' }}>
                            <OverviewPerformancePieChart {...performanceScores} />
                        </Box>
                    </Flex >
                </Box>
                <Box className="bg-[#EAF6FA] px-8" style={{ 'width': '50%', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'start', 'alignItems': 'start', 'borderRadius': '5px', 'boxShadow': '2px 2px 10px 2px rgba(0, 0, 0, 0.15)' }}>
                    <Flex className="flex-col gap-8 p-14">
                        <Text size='5' weight='bold' wrap='pretty' >Detailed Question Analysis</Text>
                        <Text size='4' weight='light' wrap='pretty' >Dive into every question you faced with this detailed table. It lists your answers alongside the correct answers, color-coded to distinguish successes from missteps.
                            This tool is perfect for reviewing specific areas where you excelled or need improvement, making it easier to target your studies effectively.</Text>
                        <Box style={{ "alignSelf": 'center' }}>
                            <PerformanceTable data={performanceTable} />
                        </Box>
                    </Flex >
                </Box>
            </Flex >
        </ScrollArea >
    )
}