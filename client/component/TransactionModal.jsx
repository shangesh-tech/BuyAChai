"use client"
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionModal = ({ isOpen, status }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200/20 max-w-md w-full mx-4"
                >
                    <div className="flex flex-col items-center space-y-4">
                        {status === 'processing' && (
                            <>
                                <div className="relative w-20 h-20">
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
                                <h3 className="text-xl font-semibold text-white">
                                    Processing Transaction
                                </h3>
                                <p className="text-gray-400 text-center">
                                    Please wait while we process your transaction. This may take a few moments.
                                </p>
                            </>
                        )}

                        {status === 'success' && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.5 }}
                            >
                                <div className="relative w-20 h-20">
                                    <div className="absolute inset-0 bg-green-500/20 rounded-full" />
                                    <motion.div
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <motion.path
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </motion.div>
                                </div>
                                <h3 className="text-xl font-semibold text-white mt-4">
                                    Transaction Successful!
                                </h3>
                                <p className="text-gray-400 text-center">
                                    Thank you for your contribution! Your chai has been purchased successfully.
                                </p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default TransactionModal; 