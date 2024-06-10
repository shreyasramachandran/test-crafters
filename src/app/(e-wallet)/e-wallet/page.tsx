'use client'

import OrigamiAnimation from "@/app/components/splash-screen/OrigamiAnimation";
import useAuth from "@/app/hooks/useAuth";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Table, Text, Box, Flex, ScrollArea, Strong, Button } from "@radix-ui/themes";
import Header from "@/app/components/header/Header";
import WeeklyFinancesChart from "@/app/components/visualisations/WeeklyFinances";
import RazorpayPayButton from "@/app/components/RazorpayPayButton";

type ExchangeRate = {
    baseCurrency: string;
    targetCurrency: string;
    rate: number;
};

type UserWallet = {
    userId: string;
    balance: number;
    lastTransactionDate: string | null;
    lastTransactionAmount: number | null;
};

type Transaction = {
    id: string;
    amount: number;
    status: boolean;
    currency: string;
    description: string;
    updatedAt: string;
};

type WeeklyExpenses = {
    mon: number;
    tue: number;
    wed: number;
    thu: number;
    fri: number;
    sat: number;
    sun: number;
};

type WalletData = {
    exchangeRate: ExchangeRate;
    userWallet: UserWallet;
    transactions: Transaction[];
    weeklyExpences: WeeklyExpenses;
};


const MainComponent = () => {
    console.log('e-wallet component mounted');
    const { isAuthenticated, loading } = useAuth();
    const [walletData, setWalletData] = useState<WalletData | null>(null);

    async function fetchEWalletData() {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
            const res = await fetch(`${baseUrl}/get-wallet-data`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                },
                credentials: 'include'
            });
            if (!res.ok) {
                throw new Error(`Error in ewalletdata response`);
            }
            const data = await res.json();
            console.log('Ewallet Data', data);
            setWalletData(data.data);
        } catch (error) {
            console.error(`Error fetching ewalletdata:`, error);
        }
    }

    useEffect(() => {
        fetchEWalletData();
    }, []);

    if (loading) {
        return <OrigamiAnimation />;
    }

    if (!isAuthenticated) {
        return <OrigamiAnimation />;
    }

    if (!walletData) {
        return <OrigamiAnimation />;
    }

    const { exchangeRate, userWallet, transactions, weeklyExpences } = walletData;

    return (
        <ScrollArea type="always" scrollbars="vertical" size="2" style={{ height: '100vh', position: 'absolute' }}>
            <Flex direction='column' className="bg-[#38B6FF] flex-col items-center justify-center gap-7 p-8" style={{ position: 'relative', height: '100%' }}>
                <Header />
                <Box style={{ alignContent: 'center', height: '10%', width: '60%', display: 'flex', flexDirection: 'column' }}>
                    <Text className="text-[#120052]" size='7' as="p">Welcome Back</Text>
                    <Text className="text-[#120052]" size='7' as="p"><Strong>Shreyas</Strong></Text>
                </Box>
                <Flex direction='row' gap='5' style={{ width: '60%' }}>
                    <Box p='6' className="bg-[#EAF6FA]" style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', height: '100%', width: '100%', borderRadius: '5px', boxShadow: '4px 4px 50px 5px rgba(0, 0, 0, 0.25)' }}>
                        <Box style={{ display: 'flex', flexDirection: 'row', height: '10%', width: '100%' }}>
                            <img src="images/available_balance.svg" alt="Wallet" className="w-10 h-10 ml-4" />
                            <Text as="div" size="7" className="ml-3">Available Balance</Text>
                        </Box>
                        <Text as="div" style={{ fontSize: '46px', alignSelf: 'center' }}>₹ {userWallet.balance.toFixed(2)}</Text>
                        <Box style={{ alignSelf: 'center', width: '50%' }}>
                            <RazorpayPayButton name={"Add Funds"} />
                        </Box>
                    </Box>
                    <Box style={{ gap: '15px', display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
                        <Box p='5' className="bg-[#EAF6FA]" style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', height: '50%', width: '100%', borderRadius: '5px', boxShadow: '4px 4px 50px 5px rgba(0, 0, 0, 0.25)' }}>
                            <Box style={{ display: 'flex', flexDirection: 'row', height: '40%', width: '100%', alignItems: 'center' }}>
                                <img src="images/exchange_rate.svg" alt="Exchange Rate" className="w-9 h-9 ml-4" />
                                <Text as="div" size="7" className="ml-3">Exchange Rate</Text>
                            </Box>
                            <Box mb='2' style={{ display: 'flex', flexDirection: 'row', height: '10%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text as="div" size='8'>1 {exchangeRate.targetCurrency} = ₹ {exchangeRate.rate.toFixed(2)}</Text>
                            </Box>
                        </Box>
                        <Box p='5' className="bg-[#EAF6FA]" style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', height: '100%', width: '100%', borderRadius: '5px', boxShadow: '4px 4px 50px 5px rgba(0, 0, 0, 0.25)' }}>
                            <Box style={{ display: 'flex', flexDirection: 'row', height: '27%', width: '100%', alignItems: 'center' }}>
                                <img src="images/last_transaction.svg" alt="Last Transaction" className="w-9 h-9 ml-4" />
                                <Text as="div" size="7" className="ml-3">Last Transaction</Text>
                            </Box>
                            {transactions.length > 0 ? (
                                <>
                                    <Box my='2' style={{ display: 'flex', flexDirection: 'row', height: '30%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text as="div" size='8'>₹ {transactions[0].amount.toFixed(2)}</Text>
                                    </Box>
                                    <Box style={{ display: 'flex', flexDirection: 'row', height: '10%', width: '100%', justifyContent: 'start', alignItems: 'center' }}>
                                        <Text as="div" size='3' className="ml-3">Per {new Date(transactions[0].updatedAt).toLocaleDateString()}</Text>
                                    </Box>
                                </>
                            ) : (
                                <Text as="div" size='8'>No Transactions</Text>
                            )}
                        </Box>
                    </Box>
                </Flex>
                {/* Weekly Expenses */}
                <Flex direction='column' gap='5' style={{ width: '60%' }}>
                    <Box p='6' className="bg-[#EAF6FA]" style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', height: '100%', width: '100%', borderRadius: '5px', boxShadow: '4px 4px 50px 5px rgba(0, 0, 0, 0.25)' }}>
                        <Box style={{ display: 'flex', flexDirection: 'row', height: '10%', width: '100%' }}>
                            <img src="images/statistics.svg" alt="Wallet" className="w-10 h-10 ml-4" />
                            <Text as="div" size="7" className="ml-3">Weekly Expenses</Text>
                        </Box>
                        <Box p='4'>
                            <WeeklyFinancesChart weeklyExpenses={weeklyExpences} />
                        </Box>
                    </Box>
                </Flex>
                {/* Timeline */}
                <Flex direction='column' gap='5' style={{ width: '60%' }}>
                    <Flex gap='6' p='6' className="bg-[#EAF6FA]" style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', height: '100%', width: '100%', borderRadius: '5px', boxShadow: '4px 4px 50px 5px rgba(0, 0, 0, 0.25)' }}>
                        <Box style={{ display: 'flex', flexDirection: 'row', height: '10%', width: '100%' }}>
                            <img src="images/timeline.svg" alt="Wallet" className="w-10 h-10 ml-4" />
                            <Text as="div" size="7" className="ml-3">Timeline</Text>
                        </Box>
                        <Table.Root variant="surface">
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeaderCell>Transaction Id</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {transactions.length > 0 ? (
                                    transactions.map((transaction) => (
                                        <Table.Row key={transaction.id}>
                                            <Table.Cell>{transaction.id}</Table.Cell>
                                            <Table.Cell>{new Date(transaction.updatedAt).toLocaleDateString()}</Table.Cell>
                                            <Table.Cell>
                                                <Text color={transaction.amount > 0 ? "green" : "red"}>
                                                    {transaction.amount > 0 ? '+' : '-'} ₹{Math.abs(transaction.amount).toFixed(2)}
                                                </Text>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <img
                                                    src={transaction.status ? "images/success.svg" : "images/failure.svg"}
                                                    className="w-5 h-5 ml-4"
                                                />
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : (
                                    <Table.Row>
                                        <Table.Cell colSpan={4}>No Transactions</Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table.Root>
                    </Flex>
                </Flex>
            </Flex >
        </ScrollArea >
    );
}

// Dynamically import MainComponent with ssr: false
const DynamicMainComponent = dynamic(() => Promise.resolve(MainComponent), { ssr: false });

const Page = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <DynamicMainComponent />
    </Suspense>
);

export default Page;
