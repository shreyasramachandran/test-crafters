"use client"

import { Flex, ScrollArea, Button } from "@radix-ui/themes";
import Link from 'next/link'

export default function Page() {
    return (
        <ScrollArea type="always" scrollbars="vertical" size="2" style={{ height: '100vh' }}>
            <Flex direction='column'>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-3xl p-8">
                        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Privacy Policy</h1>

                        <section className="mb-5">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Information Collection and Use</h2>
                            <p className="text-gray-600">
                                We collect information that your browser sends whenever you visit our service (&quot;Log Data&quot;). This Log Data may include information such as your computer&apos;s Internet Protocol (&quot;IP&quot;) address, browser type, browser version, the pages of our service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
                            </p>
                        </section>

                        <section className="mb-5">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Cookies</h2>
                            <p className="text-gray-600">
                                Cookies are files with a small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your computer&apos;s hard drive. We use &quot;cookies&quot; to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                            </p>
                        </section>

                        <section className="mb-5">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Service Providers</h2>
                            <p className="text-gray-600">
                                We may employ third party companies and individuals to facilitate our Service, to provide the Service on our behalf, to perform Service-related services, or to assist us in analyzing how our Service is used. These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                            </p>
                        </section>

                        <section className="mb-5">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Security</h2>
                            <p className="text-gray-600">
                                The security of your Personal Information is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
                            </p>
                        </section>

                        <section className="mb-5">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Changes to This Privacy Policy</h2>
                            <p className="text-gray-600">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                            </p>
                        </section>

                        <section className="mb-5">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h2>
                            <p className="text-gray-600">
                                If you have any questions about this Privacy Policy, please contact us.
                            </p>
                        </section>

                        <div className="text-center">
                            <Link href="/contact-us">
                                <Button radius='small' size="3" variant='solid'>Contact Support</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Flex>
        </ScrollArea >
    );
}
