"use client";

export default function Page() {
    console.log('pricing component mounted')
    return (
        <div className="bg-[#38B6FF] flex flex-col items-center justify-center min-h-screen p-6">
            <div className="bg-[#EAF6FA] max-w-3xl w-full p-8 shadow-lg rounded-lg" style={{ 'borderRadius': '5px', 'boxShadow': '4px 4px 50px 5px rgba(0, 0, 0, 0.25)' }}>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Pricing Plans</h2>
                <p className="text-center text-gray-600 mb-8">Currently we offer only one plan:</p>

                <div className="flex justify-center space-x-6">
                    {/* <div className="flex-1 p-4 border-2 border-gray-150 rounded-lg space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">Subscription Plan</h3>
                        <p className="text-gray-600">Get unlimited access to all tests for a whole month.</p>
                        <p className="text-lg text-gray-800 font-semibold">₹100/month</p>
                    </div> */}

                    <div className="flex-1 p-4 border-2 border-gray-150 rounded-lg space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">Pay-Per-Use Plan</h3>
                        <p className="text-gray-600">Pay only for the tests you take, ideal for occasional practice.</p>
                        <p className="text-lg text-gray-800 font-semibold">₹5/test</p>
                    </div>
                </div>

            </div>
        </div>
    );
}