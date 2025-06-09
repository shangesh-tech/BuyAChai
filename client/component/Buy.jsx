"use client"
import React, { useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../ABI_JSON/buyachai.json';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import TransactionModal from './TransactionModal';

const CONTRACT_ADDRESS = "0x985C35d7aE18aA6acCECbA68aE6D1E05d2Bb31CF";

const Buy = () => {
    const [formData, setFormData] = useState({
        name: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const buyChai = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setShowModal(true);
            setTransactionStatus('processing');

            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(
                    CONTRACT_ADDRESS,
                    contractABI.abi,
                    signer
                );

                contract.on("transaction_successful", (name, message, timestamp, from) => {
                    toast.success(`${name} just bought a chai! ☕ `, {
                        position: 'top-right',
                        style: {
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#fff',
                        },
                    });
                });

                const tx = await contract.buyChai(
                    formData.name,
                    formData.message,
                    { value: ethers.parseEther('0.001') }
                );
                await tx.wait();

                setTransactionStatus('success');
                setTimeout(() => {
                    setShowModal(false);
                    setFormData({ name: '', message: '' });
                }, 2000);
            }
        } catch (error) {
            console.error('Error:', error);

            toast.error(`Transaction failed. \n Code: ${(error.code).toLowerCase()}`, {
                position: 'top-right',
                style: {
                    background: 'rgba(255, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 0, 0, 0.2)',
                    color: '#fff',
                },
            });

            setShowModal(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TransactionModal isOpen={showModal} status={transactionStatus} />
            <div className="min-h-screen pt-20 pb-10 px-4 font-space-grotesk">
                <div className="max-w-xl mx-auto">
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
                            className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                        >
                            Buy me a Chai ✨
                        </motion.h2>

                        <form onSubmit={buyChai} className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-20 transition-all duration-200 text-white placeholder-gray-400 font-light"
                                    placeholder="Enter your name"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-gray-200/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-20 transition-all duration-200 text-white placeholder-gray-400 font-light"
                                    placeholder="Enter your message..."
                                />
                            </motion.div>

                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                    w-full py-4 px-6 rounded-lg font-medium text-white
                                    ${loading
                                        ? 'bg-gray-600 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:opacity-90'
                                    }
                                    transition-all duration-200
                                    flex items-center justify-center space-x-2
                                    shadow-lg shadow-purple-500/20
                                `}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send 0.001 ETH</span>
                                        <span className="text-2xl">☕</span>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Buy;