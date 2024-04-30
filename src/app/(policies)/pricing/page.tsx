"use client"

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="max-w-md w-full mx-auto p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Pricing</h2>
                <p className="text-center text-gray-600 mb-8">Our services are currently offered free of charge for a limited time period.</p>

                {/* <div className="bg-blue-100 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Standard Plan</h3>
                    <p className="text-gray-600 mb-4">Our most popular plan for individuals.</p>
                    <div className="text-center">
                        <span className="text-4xl font-bold text-gray-800">₹100</span>
                        <span className="text-base text-gray-600">/ month</span>
                    </div>
                    <ul className="text-gray-600 my-4 space-y-2">
                        <li>✓ Access to all features</li>
                        <li>✓ 24/7 customer support</li>
                        <li>✓ Free updates</li>
                        <li>✓ No setup fee</li>
                    </ul>
                    <div className="text-center">
                        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Get Started</button>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
