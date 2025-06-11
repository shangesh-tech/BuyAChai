import "./globals.css";
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "BuyAChai by shangesh ☕",
  description: "Buy me a virtual chai using Ethereum",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Buy A Chai ☕</title>
        <meta name="description" content="Buy me a virtual chai using Ethereum" />
      </head>
      <body className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen text-white">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
