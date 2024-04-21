'use client'
import useAuth from "@/app/hooks/useAuth";
import { Flex, Box, ScrollArea, Text, Button } from "@radix-ui/themes";


export default function Page() {
    // Get isAuthenticated in case you need to use it for future operations
    const isAuthenticated = useAuth();
    return (
        <ScrollArea type="always" scrollbars="vertical" size="2" style={{ height: '100vh' }}>
            <Flex className="bg-[#F6F7FB]" direction='column'>
                <Box className="bg-[#0144FF] bg-opacity-[0.059]" height='64px' flexGrow='1' style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text color='indigo' size='6' weight='bold' wrap='pretty' >CUET Mock Test</Text>
                </Box>
                <Box className="bg-[#0249F5] bg-opacity-[0.099]" height='32px' flexGrow='1' style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text size='5' weight='regular' wrap='pretty' >Instructions</Text>
                </Box>
                <Box className="py-8" height='32px' flexGrow='1' style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text size='6' weight='light' wrap='pretty' >Please read the instructions carefully</Text>
                </Box>
                <Box className="pl-6 py-8" height='42px' flexGrow='1' style={{ width: '100%', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                    <Text size='6' weight='regular' wrap='pretty' >General Instructions</Text>
                </Box>
                <Box className="pl-6" flexGrow='1' style={{ width: '100%', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                    <div style={{ padding: '1rem' }}>
                        <ol className="list-decimal">
                            <li>Total duration of English Paper is 45 min.</li>
                            <li>The Questions Palette displayed on the right side of the screen will show the status of each question using one of the following symbols:</li>
                            <ul className="list-[lower-alpha] pl-4">
                                <li>You have not visited the question yet.</li>
                                <li>You have not answered the question.</li>
                                <li>You have answered the question.</li>
                                <li>You have NOT answered the question, but have marked the question for review.</li>
                                <li>The question(s) &apos;Answered and Marked for Review&apos; will be considered for evaluation.</li>
                            </ul>
                            <li>You can click on the &gt; arrow which appears to the left of question palette to collapse the question palette thereby maximizing the question window. To view the question palette again, you can click on &lt; which appears on the right side of question window.</li>
                            <li>You can click on your &apos;Profile&apos; image on top right corner of your screen to change the language during the exam for entire question paper. On clicking of Profile image you will get a drop-down to change the question content to the desired language.</li>
                            <li>You can click on to navigate to the bottom and to navigate to top of the question area, without scrolling.</li>
                            <li>To answer a question, do the following:</li>
                            <ul className="list-[lower-alpha] pl-4">
                                <li>Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.</li>
                                <li>Click on Save & Next to save your answer for the current question and then go to the next question.</li>
                                <li>Click on Mark for Review & Next to save your answer for the current question, mark it for review, and then go to the next question.</li>
                            </ul>
                            <li>Procedure for answering a multiple-choice type question:</li>
                            <ul className="list-[lower-alpha] pl-4">
                                <li>To select your answer, click on the button of one of the options.</li>
                                <li>To deselect your chosen answer, click on the button of the chosen option again or click on the Clear Response button.</li>
                                <li>To change your chosen answer, click on the button of another option.</li>
                                <li>To save your answer, you MUST click on the Save & Next button.</li>
                                <li>To mark the question for review, click on the Mark for Review & Next button.</li>
                                <li>To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that question.</li>
                                <li>Navigate through questions using the Previous and Next buttons.</li>
                            </ul>
                            <li>After clicking the Save & Next button on the last question in a section, you will automatically be taken to the first question of the next section.</li>
                            <li>After you click the Submit Test button and confirm the action, you will not be able to modify any of the answers in the exam.</li>
                            <li>Examination can view the corresponding section summary as stipulated. The candidate can per your convenience only during the time part of the legend that appears in every section above the question palette.</li>
                        </ol>
                    </div>
                </Box>
                <Box className="pl-6 py-6" height='64px' flexGrow='1' style={{ width: '100%', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                    <Text color="red" size='3' weight='light' wrap='pretty' >Please note all questions will appear in your default language.
                        This language can be changed for a particular question later on.</Text>
                </Box>
                <Box className="pl-6" flexGrow='1' style={{ width: '100%', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                    <label className="flex items-start space-x-2">
                        <input type="checkbox" className="form-checkbox text-blue-500 h-4 w-4 mt-1" />
                        <span className="text-gray-800">
                            I have read and understood the instructions. My computer hardware are in proper working condition.
                            I declare that I am not using any prohibited gadget like mobile phone, bluetooth devices etc. while giving the test. I agree that in case of not adhering to the instructions, I shall be liable
                            to be debarred from this test and/or to disciplinary action, which may include ban from future tests/examinations.
                        </span>
                    </label>
                </Box>
                <Box className="p-4" style={{ height: '20%', width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                    <Button className="w-full h-full" size="3" variant='solid'>I am ready to begin</Button>
                </Box>
            </Flex>
        </ScrollArea >
    )
}