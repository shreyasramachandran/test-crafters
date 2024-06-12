'use client'

import { IconButton, TextField, Text, Box, Button, Dialog, Flex } from "@radix-ui/themes"
import { useEffect, useState } from 'react';

interface CreateTransactionParams {
    amount: number;
    currency: string;
    description: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    status: boolean;
}


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

interface RazorpayPayButtonProps {
    name: string;
}

export default function RazorpayPayButton({ name }: RazorpayPayButtonProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [razorpayOrderId, setRazorpayOrderId] = useState('');
    const [razorpayPaymentId, setRazorpayPaymentId] = useState('');
    const [razorpaySignature, setRazorpaySignature] = useState('');
    const [transactionStatus, setTransactionStatus] = useState(true);

    const addFunds = async () => {
        setDialogOpen(true);
    }

    async function createOrder() {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
            const body = {
                orderAmount: Number(amount),
                orderCurrency: "INR",
                paritalPayment: false
            };
            const res = await fetch(`${baseUrl}/create-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(body),
                credentials: 'include'
            });
            if (!res.ok) {
                throw new Error(`Error in creating an order`);
            }
            const responseData = await res.json();
            return responseData.data.order_response.id;
        } catch (error) {
            console.error("Error creating order:", error);
        }
    }

    async function verifySignature(orderId: string, paymentId: string, signature: string, amount: Number) {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
            const body = {
                razorpayOrderId: orderId,
                razorpayPaymentId: paymentId,
                razorpaySignature: signature,
                amount: amount
            };
            const res = await fetch(`${baseUrl}/verify-signature`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                throw new Error(`Error verifying signature, status = ${res.status}`);
            }
            const responseData = await res.json();

            setTransactionStatus(responseData.data.is_valid);
            return responseData.data.is_valid;
        } catch (error) {
            console.error("Error verifying signature:", error);
            throw error;
        }
    }

    async function createTransaction() {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
            const body: CreateTransactionParams = {
                amount: Number(amount),
                currency: "INR",
                description: `Adding Funds`,
                razorpayOrderId: razorpayOrderId,
                razorpayPaymentId: razorpayPaymentId,
                razorpaySignature: razorpaySignature,
                status: transactionStatus
            };
            const res = await fetch(`${baseUrl}/create-transaction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache"
                },
                body: JSON.stringify(body),
                credentials: 'include'
            });
            if (!res.ok) {
                throw new Error(`Error creating transaction, status = ${res.status}`);
            }
        } catch (error) {
            console.error("Error creating transaction:", error);
            throw error;
        }
    }

    const checkout = async () => {
        setDialogOpen(false);
        const orderId = await createOrder();
        if (!orderId) {
            return;
        }

        const options = {
            "key_id": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            "amount": Number(amount) * 100,
            "currency": "INR",
            "name": "Test Crafters",
            "description": "Adding Funds",
            "order_id": orderId,
            "handler": async function (response: RazorpayResponse) {
                setRazorpayOrderId(orderId);
                setRazorpayPaymentId(response.razorpay_payment_id);
                setRazorpaySignature(response.razorpay_signature);
                const isValid = await verifySignature(
                    orderId,
                    response.razorpay_payment_id,
                    response.razorpay_signature,
                    Number(amount) * 100
                );
                if (isValid) {
                    await createTransaction();
                    window.location.reload()
                } else {
                    alert("Payment verification failed.");
                }
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