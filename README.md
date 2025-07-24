# BuyAChai ☕ - Decentralized Tip Platform

A full-stack decentralized application (dApp) that allows users to buy virtual chai (tea) for content creators using Ethereum cryptocurrency. This project demonstrates a complete Web3 development stack with smart contracts, frontend integration, and comprehensive testing.

## 🚀 Project Overview

BuyAChai is a tip-based platform where supporters can send Ethereum to content creators along with personalized messages. It's similar to "Buy Me a Coffee" but built on blockchain technology, ensuring transparency, decentralization, and immutable transaction records.

## 🏗️ Architecture

```
├── contracts/          # Smart contracts (Solidity)
├── scripts/            # Deployment and interaction scripts
├── test/              # Smart contract tests
├── client/            # Frontend application (Next.js)
│   ├── app/           # Next.js App Router pages
│   ├── component/     # React components
│   ├── ABI_JSON/      # Contract ABI files
│   └── public/        # Static assets
└── hardhat.config.js  # Hardhat configuration
```

## 🛠️ Tech Stack

### Blockchain & Smart Contracts
- **Solidity ^0.8.28** - Smart contract development
- **Hardhat ^2.24.2** - Ethereum development environment
- **Ethers.js v6** - Ethereum library for blockchain interaction
- **OpenZeppelin** - Security-audited contract libraries

### Frontend
- **Next.js 15.3.3** - React framework with App Router
- **React 19** - UI library
- **TailwindCSS 4** - Utility-first CSS framework
- **Framer Motion 12.16.0** - Animation library
- **React Hot Toast** - Toast notifications

### Development & Testing
- **Hardhat Toolbox** - Comprehensive testing suite
- **Chai** - Assertion library for testing
- **ESLint** - Code linting
- **dotenv** - Environment variable management

### Deployment & Networks
- **Sepolia Testnet** - Ethereum test network
- **Alchemy** - Blockchain node provider
- **Etherscan** - Contract verification

## 📋 Features

### Smart Contract Features
- **Minimum Payment Validation** - Ensures payments exceed 0.0001 ETH
- **Instant Transfers** - Payments are immediately transferred to the owner
- **Transaction Storage** - All transactions are stored on-chain
- **Event Emission** - Real-time transaction notifications
- **Transaction History** - Retrieve all past transactions

### Frontend Features
- **Wallet Integration** - MetaMask and other Web3 wallets support
- **Real-time Updates** - Live transaction feed using contract events
- **Responsive Design** - Mobile-first responsive interface
- **Transaction Modals** - Beautiful transaction status dialogs
- **Animation Effects** - Smooth animations using Framer Motion
- **Toast Notifications** - User-friendly feedback system
- **Network Detection** - Automatic network and balance display

## 🔧 Smart Contract Details

### Contract: `buyachai.sol`

```solidity
contract buyachai {
    address payable owner_contract;
    uint256 public minimum_amount; // 0.0001 ETH
    
    struct transaction_struct {
        string name;
        string message;
        uint timestamp;
        address from;
    }
}
```

#### Key Functions:
- `buyChai(string name, string message)` - Send tip with message
- `getTransactions()` - Retrieve all transaction history
- `minimum_amount` - View minimum payment required

#### Events:
- `transaction_successful` - Emitted on successful payments

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MetaMask or compatible Web3 wallet
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd buyachai
```

2. **Install root dependencies**
```bash
npm install
```

3. **Install client dependencies**
```bash
cd client
npm install
cd ..
```

4. **Environment Setup**
Create a `.env` file in the root directory:
```env
ALCHEMY_SEPOLIA_RPC_URL=your_alchemy_sepolia_url
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### Development Workflow

#### 1. Start Local Blockchain
```bash
npx hardhat node
```

#### 2. Deploy Contract Locally
```bash
npx hardhat run scripts/deploy.js --network localhost
```

#### 3. Test Contract Interaction
```bash
npx hardhat run scripts/interact.js --network localhost
```

#### 4. Run Tests
```bash
npx hardhat test
```

#### 5. Start Frontend Development Server
```bash
cd client
npm run dev
```

### Production Deployment

#### 1. Deploy to Sepolia Testnet
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

#### 2. Verify Contract on Etherscan
```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

#### 3. Update Contract Address
Update the `CONTRACT_ADDRESS` in:
- `client/component/Buy.jsx`
- `client/component/TransactionList.jsx`

#### 4. Build and Deploy Frontend
```bash
cd client
npm run build
npm start
```

## 🧪 Testing

The project includes comprehensive test coverage:

### Smart Contract Tests
```bash
npx hardhat test
```

**Test Coverage:**
- Deployment validation
- Payment amount validation
- Transaction storage
- Event emission
- Access control
- Edge cases and error handling

### Test Results Example:
- ✅ Minimum amount validation
- ✅ Payment processing
- ✅ Transaction storage
- ✅ Event emission
- ✅ Owner balance updates

## 📱 Frontend Components

### Core Components:
- **Navbar.jsx** - Wallet connection and user info
- **Buy.jsx** - Main payment interface
- **TransactionList.jsx** - Display transaction history
- **TransactionModal.jsx** - Transaction status dialog
- **Footer.jsx** - App footer with links

### Key Features:
- **Wallet Connection** - Automatic wallet detection and connection
- **Real-time Updates** - Live transaction feed
- **Transaction Status** - Visual feedback for transaction states
- **Responsive Design** - Works on all device sizes

## 🌐 Network Configuration

### Supported Networks:
- **Hardhat Local** - Development (Chain ID: 31337)
- **Sepolia Testnet** - Testing (Chain ID: 11155111)

### Contract Addresses:
- **Local Development**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **Sepolia Testnet**: `0x985C35d7aE18aA6acCECbA68aE6D1E05d2Bb31CF`

## 🔒 Security Features

- **Minimum Payment Validation** - Prevents spam transactions
- **Owner-only Withdrawals** - Payments go directly to contract owner
- **Input Validation** - Proper validation of user inputs
- **Reentrancy Protection** - Safe transfer patterns
- **Event Logging** - Transparent transaction tracking

## 📊 Gas Optimization

- **Efficient Storage** - Optimized struct packing
- **Minimal State Changes** - Reduced gas costs
- **Event-based Updates** - Efficient frontend synchronization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **OpenZeppelin** - Secure smart contract libraries
- **Hardhat Team** - Excellent development framework
- **Ethereum Foundation** - Blockchain infrastructure
- **Next.js Team** - Amazing React framework

## 📞 Support

For support, questions, or contributions:
- Create an issue in the repository
- Contact the development team
- Join our community discussions

---

**Built with ❤️ by Shangesh** ☕

*Empowering creators through decentralized tipping*
