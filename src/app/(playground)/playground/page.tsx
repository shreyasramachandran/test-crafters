"use client"

import { Flex, Text, Button, Box, Card, DropdownMenu, Callout, Checkbox, CheckboxCards } from '@radix-ui/themes'
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';


export default function Page() {
    const languages = ['Hindi', 'English', 'Tamil'];
    const subjects = ['Physics', 'Chemistry', 'Biology'];

    const [count, setCount] = useState(1);

    const incrementCount = () => {
        setCount(count + 1);
    };

    return (
        <Flex style={{ paddingTop: '300px' }} align="center" justify="center" gap="3">
            {/* <div className="bg-black text-[#3e63dd] font-roboto font-semibold text-2xl tracking-tighter w-32 h-32 flex items-center justify-center">
                TestCrafters
            </div> */}
            {/* <Text color='indigo' size='6' weight='bold' wrap='pretty'>TestCrafters</Text>
            <Text size='3' weight='bold' wrap='pretty'>The quick brown fox jumps over the lazy dog.</Text> */}
            <Button size="3" variant='solid' onClick={incrementCount}>
                Increment
            </Button>
            <div className="w-8 h-8 flex items-center justify-center rounded-lg text-white bg-gradient-to-tr from-stone-500 to-stone-100">
                {count}
            </div>
            {/* <Box maxWidth="240px" maxHeight="240px">
                <Card style={{ boxShadow: '4px 4px 50px 5px rgba(0, 0, 0, 0.25)', padding: 0 }}>
                    <img src="/cherry-blossom.avif" alt="Cherry Blossom" />
                </Card>
            </Box> */}
            {/* <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant="soft">
                        Subject
                        <DropdownMenu.TriggerIcon />
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content style={{ backgroundColor: 'skyblue' }}>
                    {languages.map((language) => (
                        <DropdownMenu.Item key={language}>{language}</DropdownMenu.Item>
                    ))}
                    <DropdownMenu.Separator />
                    {subjects.map((subject) => (
                        <DropdownMenu.Item key={subject}>{subject}</DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Root> */}
            {/* <Callout.Root color="green" size="2">
                <Callout.Icon>
                    <CheckCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                    You have successfully completed the test.
                </Callout.Text>
            </Callout.Root> */}
            {/* <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 flex items-center space-x-4">
                <input type="checkbox" className="form-checkbox text-blue-500 h-5 w-5" />
                <div className="text-gray-800">
                    I have read and understood the instructions. I agree to be accountable to myself by not partaking in any form of cheating.
                </div>
            </div> */}
            {/* <div className="pl-8 flex flex-row items-center justify-center">
                <div className="relative inline-block pl-8">
                    <img src="/not_answered.svg" alt="Custom Vector" className="block w-full h-auto" />
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-l font-bold">1</span>
                </div>
                <div className="pl-1">Not Answered</div>
            </div> */}
        </Flex >
    )
}