'use client'

import { IconButton, TextField, Text, Box, Button, Dialog, Flex } from "@radix-ui/themes"
import { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

export interface RazorpayErrorResponse {
    error: {
        code: string;
        description: string;
        source: string;
        step: string;
        reason: string;
        metadata: {
            order_id: string;
            payment_id: string;
        };
    };
}

type Width<T> = T;

interface RazorpayPayButtonProps {
    name: string;
}

export default function RazorpayPayButton({ name }: RazorpayPayButtonProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [amount, setAmount] = useState('');

    const addFunds = async () => {
        setDialogOpen(true)
    }

    async function createOrder() {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
            const body = {
                orderAmount: Number(amount),
                orderCurrency: "INR",
                paritalPayment: false
            }
            const res = await fetch(`${baseUrl}/create-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(body)
            });
            // Ensure proper error handling
            if (!res.ok) {
                // Handle errors, e.g., return an error response
                return new Response(JSON.stringify({ error: "Error in creating an order" }), {
                    status: res.status,
                    headers: { "Content-Type": "application/json" },
                });
            }
            const responseData = await res.json();
            const orderId = responseData.id
            return orderId
        }
        catch (error) {
            // Handle other errors
            console.error("Error checking if user exists", error);
        }
    }

    const checkout = async () => {
        setDialogOpen(false)
        const orderId = await createOrder()
        console.log(orderId)
        var options = {
            "key_id": "rzp_test_B9h0zDfA107vBR", // Enter the Key ID generated from the Dashboard
            "amount": Number(amount) * 100, // Amount has to be in currency subunits, therefore multiply by 100. Default currency is INR. Hence, 50000 refers to 50000 paise. 
            "currency": "INR",
            "name": "Test Crafters", // your business name
            "description": "Test Transaction",
            "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response: RazorpayResponse) {
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature);
            },
            "prefill": { // We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Shreyas Ramachandran", // your customer's name
                "email": "shreyasramachandran@gmail.com",
                "contact": "8107427069" // Provide the customer's phone number for better conversion rates 
            },
            "theme": {
                "color": "#120052"
            }
        };
        const rzpPaymentComponent = new window.Razorpay(options);
        rzpPaymentComponent.on('payment.failed', function (response: RazorpayErrorResponse) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzpPaymentComponent.open();
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <Flex>
            <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052', 'cursor': 'pointer', 'width': '100%', 'alignSelf': 'center' }} size="4" variant='solid' id="rzp-pay-button" onClick={addFunds}>{name}</Button>
            {/* Dialog Box */}
            <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                <Dialog.Content style={{ padding: '0px' }}>
                    <Flex direction='column' gap='5' style={{ width: '100%' }}>
                        <Box p='6' className="bg-[#EAF6FA]" style={{ 'justifyContent': 'space-between', 'display': 'flex', 'flexDirection': 'column', 'height': '100%', 'width': '100%', 'borderRadius': '5px', 'boxShadow': '4px 4px 50px 5px rgba(0, 0, 0, 0.25)', gap: '30px' }}>
                            <Box style={{ 'display': 'flex', 'flexDirection': 'row', 'height': '10%', 'width': '100%', alignItems: 'center' }}>
                                <img src="images/add_funds.svg" alt="Add Funds" className="w-6 h-6" />
                                <Text as="div" size="6" className="ml-3">Add Funds</Text>
                            </Box>
                            <Box>
                                <TextField.Root value={amount} onChange={(e) => setAmount(e.target.value)} size="3" variant="soft" placeholder='Enter the amount you want to add' className="bg-[#EAF6FA]">
                                    <TextField.Slot pr="3">
                                        <IconButton size="2" variant="ghost">
                                            <img src="images/rupee_currency.svg" alt="Rupee Currency" className="w-5 h-5" />
                                        </IconButton>
                                    </TextField.Slot>
                                </TextField.Root>
                            </Box>
                            <Button style={{ borderRadius: '5px', 'backgroundColor': '#120052', cursor: 'pointer' }} size="3" variant='solid' onClick={checkout}>Proceed</Button>
                        </Box>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </Flex>
    )
}