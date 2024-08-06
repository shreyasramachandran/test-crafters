"use client"

export default function Page() {
    console.log('refunds and cancellations component mounted')
    return (
        <div className="bg-[#38B6FF] flex flex-col items-center justify-center min-h-screen p-6">
            <div className="bg-[#EAF6FA] rounded-lg shadow overflow-hidden w-full max-w-3xl p-8" style={{ 'borderRadius': '5px', 'boxShadow': '4px 4px 50px 5px rgba(0, 0, 0, 0.25)' }}>
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
                    <a href="mailto:shreyasramachandran@gmail.com" className="px-6 py-2 text-white rounded-lg" style={{ 'borderRadius': '5px', 'backgroundColor': '#120052', cursor: 'pointer' }}>
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}
