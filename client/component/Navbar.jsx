"use client"
import React, { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState('');
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [balance, setBalance] = useState('0');
    const [network, setNetwork] = useState('');
    const dropdownRef = useRef(null);

    const connectWallet = async () => {
        try {
            setLoading(true);
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                setAccount(accounts[0]);
                setIsConnected(true);
                await updateWalletInfo(provider, accounts[0]);
            } else {
                alert('Please install MetaMask!');
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateWalletInfo = async (provider, address) => {
        try {
            const balance = await provider.getBalance(address);
            setBalance(ethers.formatEther(balance).substring(0, 6));
            const network = await provider.getNetwork();
            setNetwork(network.name);
        } catch (error) {
            console.error('Error fetching wallet info:', error);
        }
    };

    const disconnectWallet = () => {
        setIsConnected(false);
        setAccount('');
        setBalance('0');
        setNetwork('');
        setShowDropdown(false);
    };

    useEffect(() => {
        const checkConnection = async () => {
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send("eth_accounts", []);
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    setIsConnected(true);
                    await updateWalletInfo(provider, accounts[0]);
                }
            }
        };
        checkConnection();

        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-gray-200/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Buy A Chai ☕
                        </h1>
                    </div>
                    <div className="flex items-center relative" ref={dropdownRef}>
                        {!isConnected ? (
                            <button
                                onClick={connectWallet}
                                disabled={loading}
                                className={`
                                    px-6 py-2 rounded-full font-medium
                                    ${loading
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90'
                                    }
                                    transition-all duration-300 ease-in-out
                                `}
                            >
                                {loading ? 'Connecting...' : 'Connect Wallet'}
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="px-6 py-2 rounded-full font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 text-purple-500 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 ease-in-out flex items-center space-x-2"
                                >
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span>{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <AnimatePresence>
                                    {showDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 top-full w-72 rounded-xl bg-white/20 backdrop-blur-lg border border-gray-200/20 shadow-xl"
                                        >
                                            <div className="p-4 space-y-3">
                                                <div className="space-y-2">
                                                    <p className="text-sm text-gray-400">Connected Account</p>
                                                    <p className="font-mono text-xl text-purple-400 break-all">{account}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-sm text-gray-400">Balance</p>
                                                    <p className="font-medium text-white text-xl">{balance} ETH</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-sm text-gray-400">Network</p>
                                                    <p className="font-medium text-white text-xl capitalize">{network || 'Unknown Network'}</p>
                                                </div>
                                                <button
                                                    onClick={disconnectWallet}
                                                    className="w-full mt-4 px-4 py-2 rounded-lg font-medium bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    <span>Disconnect</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;