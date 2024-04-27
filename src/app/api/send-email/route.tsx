import nodemailer from 'nodemailer';

export async function POST(request: Request, context: any) {
    try {
        // Parsing JSON body from request
        const body = await request.json();
        const { to, verificationCode } = body;
        const from = process.env.NEXT_PUBLIC_GMAIL_USERNAME
        const username = process.env.NEXT_PUBLIC_GMAIL_USERNAME
        const password = process.env.NEXT_PUBLIC_GMAIL_CUET_TEST_CRAFTERS_APP_PASSWORD
        const expirationTimeMinutes = 2
        const companyName = 'Cuet Test Crafters'
        const text = `Dear User,\nThank you for registering with us. Please use the following verification code to complete your registration process:\n\nVerification Code: ${verificationCode}\n\nThis code is valid for ${expirationTimeMinutes} minutes. If you did not request this code, please disregard this email.\n\nBest regards,\n${companyName}`;

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            // Configure your SMTP settings here
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: username,
                pass: password,
            },
        });

        // Send the email
        await transporter.sendMail({
            from: from, // Sender address
            to,
            subject: `Email verification code: ${verificationCode}`,
            text
        });

        console.log('Email sent successfully');
        return new Response(JSON.stringify({
            message: 'Email sent successfully'
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });


    } catch (error) {
        console.error("Error in sending email:", error);
        return new Response(JSON.stringify({ error: "Internal server error", details: error }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}