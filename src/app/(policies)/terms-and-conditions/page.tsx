"use client"

import { Flex, ScrollArea } from "@radix-ui/themes";

export default function Page() {
    console.log('terms and conditions component mounted')
    return (
        <ScrollArea type="always" scrollbars="vertical" size="2" style={{ height: '100vh' }}>
            <Flex direction='column'>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
                    <div className="bg-white rounded-lg shadow overflow-hidden w-full max-w-3xl p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
                        <p className="text-gray-600 mb-4">Last updated: April 26, 2024</p>

                        <ul className="list-disc space-y-2 pl-5">
                            <li className="text-gray-700">
                                By accessing the website at cuet.net.in, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                            </li>
                            <li className="text-gray-700">
                                Use of the Service is at your sole risk. The Service is provided on an AS IS and AS AVAILABLE basis. The Service is for personal use only - users may not use the Service for any illegal or unauthorized purpose.
                            </li>
                            <li className="text-gray-700">
                                You must not damage, disable, overburden, or impair the Service or interfere with any other party use and enjoyment of it.
                            </li>
                            <li className="text-gray-700">
                                We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach the Terms and Conditions.
                            </li>
                            <li className="text-gray-700">
                                All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                            </li>
                            <li className="text-gray-700">
                                Our Service may contain links to third-party web sites or services that are not owned or controlled by Cuet Test Crafters.
                            </li>
                            <li className="text-gray-700">
                                Cuet Test Crafters has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Cuet Test Crafters shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods, or services available on or through any such web sites or services.
                            </li>
                            <li className="text-gray-700">
                                Changes to the terms and conditions can be made at any time and become effective upon posting to the site.
                            </li>
                        </ul>

                        <p className="mt-6 text-gray-700">
                            Your use of the website is also subject to the Cuet Test Crafters Privacy Policy. Please review our Privacy Policy, which also governs the site and informs users of our data collection practices.
                        </p>
                    </div>
                </div>
            </Flex>
        </ScrollArea>
    );
}
