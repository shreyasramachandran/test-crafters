"use client"

export default function Page() {
    console.log('contact us component mounted')
    return (
        <div className="bg-[#38B6FF] flex flex-col items-center justify-center min-h-screen py-2">
            <div className="bg-[#EAF6FA] shadow-md rounded-lg p-8" style={{ 'borderRadius': '5px', 'boxShadow': '4px 4px 50px 5px rgba(0, 0, 0, 0.25)' }}>
                <div className="text-center">
                    <h1 className="text-4xl font-semibold text-gray-800">Contact Us</h1>
                    <p className="mt-3 text-lg text-gray-600">We would love to hear from you! Get in touch with us using any of the methods below</p>

                    <div className="mt-10">
                        <p className="text-gray-800"><span className="font-medium">Email:</span> <a href="mailto:cuettestcrafters@gmail.com" className="text-blue-500 hover:text-blue-600">cuettestcrafters@gmail.com</a></p>
                        <p className="text-gray-800"><span className="font-medium">Phone:</span> <a href="tel:+918107427069" className="text-blue-500 hover:text-blue-600">+918107427069</a></p>
                    </div>

                    <div className="mt-8">
                        <p className="text-gray-600">Our operating hours are all days at all hours. Feel free to reach out at any time.</p>
                    </div>
                </div>
            </div>
        </div>

    );
}
