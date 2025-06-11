"use client"
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractABI from '../ABI_JSON/buyachai.json';
import { motion, AnimatePresence } from 'framer-motion';

const CONTRACT_ADDRESS = "0x985C35d7aE18aA6acCECbA68aE6D1E05d2Bb31CF";

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTransactions();

        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                contractABI.abi,
                provider
            );

            contract.on("transaction_successful", (name, message, timestamp, from) => {
                const newTx = {
                    name,
                    message,
                    timestamp: new Date(Number(timestamp) * 1000),
                    from
                };
                setTransactions(prev => [newTx, ...prev]);
            });

            return () => {
                contract.removeAllListeners();
            };
        }
    }, []);

    const fetchTransactions = async () => {
        try {
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const contract = new ethers.Contract(
                    CONTRACT_ADDRESS,
                    contractABI.abi,
                    provider
                );

                const txs = await contract.getTransactions();
                const formattedTxs = txs.map(tx => ({
                    name: tx.name,
                    message: tx.message,
                    timestamp: new Date(Number(tx.timestamp) * 1000),
                    from: tx.from
                }));


                setTransactions(formattedTxs.reverse());

            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatAddress = (address) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const formatRelativeTime = (date) => {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        // Less than a minute
        if (diffInSeconds < 60) {
            return 'just now';
        }

        // Less than an hour
        if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        }

        // Less than a day
        if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        }

        // Less than a week
        if (diffInSeconds < 604800) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        }

        // Less than a month
        if (diffInSeconds < 2592000) {
            const weeks = Math.floor(diffInSeconds / 604800);
            return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
        }

        // Less than a year
        if (diffInSeconds < 31536000) {
            const months = Math.floor(diffInSeconds / 2592000);
            return `${months} ${months === 1 ? 'month' : 'months'} ago`;
        }

        // More than a year
        const years = Math.floor(diffInSeconds / 31536000);
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20 pb-10 px-4 font-space-grotesk">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200/20"
                    >
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="relative w-16 h-16">
                                <motion.div
                                    animate={{
                                        rotate: 360,
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="absolute inset-0 border-4 border-purple-500/20 rounded-full"
                                />
                                <motion.div
                                    animate={{
                                        rotate: -360,
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="absolute inset-2 border-4 border-t-4 border-purple-500 rounded-full"
                                />
                            </div>
                            <span className="text-gray-200">Loading transactions...</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-10 px-4 font-space-grotesk">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200/20"
                >
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                    >
                        Recent Transactions ✨
                    </motion.h2>

                    {transactions.length === 0 ? (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-400 text-center py-8 text-lg"
                        >
                            Connect your wallet to see the transactions made... ☕
                        </motion.p>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-4"
                        >
                            <AnimatePresence>
                                {transactions.map((tx, index) => (
                                    <motion.div
                                        key={`${tx.from}-${tx.timestamp}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-200 border border-gray-200/10 group"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-2">
                                                <h3 className="font-medium text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-200">
                                                    {tx.name}
                                                </h3>
                                                <p className="text-gray-300 font-light">
                                                    {tx.message}
                                                </p>
                                                <div className="flex items-center space-x-2 text-sm text-gray-400">
                                                    <span title={formatDate(tx.timestamp)}>{formatRelativeTime(tx.timestamp)}</span>
                                                    <span>•</span>
                                                    <span className="font-mono hover:text-purple-400 transition-colors duration-200">
                                                        {formatAddress(tx.from)}
                                                    </span>
                                                </div>
                                            </div>
                                            <motion.span
                                                whileHover={{ scale: 1.2, rotate: 15 }}
                                                className="text-2xl transition-transform duration-200"
                                            >
                                                ☕
                                            </motion.span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default TransactionList;