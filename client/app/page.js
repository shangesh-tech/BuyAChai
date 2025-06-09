"use client"
import React from 'react';
import Navbar from '../component/Navbar';
import Buy from '../component/Buy';
import TransactionList from '../component/TransactionList';
import Footer from '../component/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navbar />
      <Buy />
      <TransactionList />
      <Footer />
    </main>
  );
}
