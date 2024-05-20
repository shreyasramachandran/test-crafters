import { Flex, ScrollArea, Button } from "@radix-ui/themes";

export default function ShippingPolicyPage() {
    console.log('shipping policy component mounted')
    return (
        <ScrollArea type="always" scrollbars="vertical" size="2" style={{ height: '100vh' }}>
            <Flex direction='column'>
                <div style={{ 'borderRadius': '5px', 'boxShadow': '4px 4px 50px 5px rgba(0, 0, 0, 0.25)' }} className="bg-[#38B6FF] flex flex-col items-center justify-center min-h-screen px-4 py-10">
                    <div className="bg-[#EAF6FA] rounded-lg shadow-xl overflow-hidden w-full max-w-3xl p-8">
                        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Shipping Policy</h1>

                        <section className="mb-5">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">No Shipping Available</h2>
                            <p className="text-gray-600">
                                Since our services and products are accessible directly online or provided in a digital format, there are no shipping processes involved. As such, no physical goods are shipped to customers.
                            </p>
                        </section>

                        <section className="mb-5">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Changes to This Shipping Policy</h2>
                            <p className="text-gray-600">
                                We may update our Shipping Policy from time to time. We will notify you of any changes by posting the new Shipping Policy on this page. You are advised to review this Shipping Policy periodically for any changes. Changes to this Shipping Policy are effective when they are posted on this page.
                            </p>
                        </section>
                    </div>
                </div>
            </Flex>
        </ScrollArea >
    );
}
