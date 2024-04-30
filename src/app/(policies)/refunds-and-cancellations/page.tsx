"use client"

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white rounded-lg shadow overflow-hidden w-full max-w-3xl p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Refunds & Cancellations</h1>
                <p className="text-gray-600">
                    Customers are eligible to cancel their subscription and request a full refund within a week of their initial purchase.
                    Cancellations received after this period will not be eligible for a refund. Refunds are processed immediately upon a valid cancellation request.
                </p>
                <p className="text-gray-600 mt-4">
                    To initiate a cancellation or refund, please contact our support team with your order details.
                </p>

                {/* Adding a call-to-action button for contacting support */}
                <div className="mt-6">
                    <a href="mailto:shreyasramachandran@gmail.com" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}
