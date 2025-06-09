// scripts/interact.js
const hre = require("hardhat");

async function main() {
    // Get the contract address from deployment
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //localhost node by hardhat not sepolia testnet
    const BuyAChai = await hre.ethers.getContractFactory("buyachai");
    const contract = BuyAChai.attach(contractAddress);

    // Get the signers
    const [owner, buyer1, buyer2] = await hre.ethers.getSigners();
    console.log("Interacting with contract:", contractAddress);
    console.log("Owner address:", owner.address);
    console.log("Buyer1 address:", buyer1.address);
    console.log("Buyer2 address:", buyer2.address);

    // 1. Check minimum amount
    const minAmount = await contract.minimum_amount();
    console.log("\nMinimum amount required:", hre.ethers.formatEther(minAmount), "ETH");

    // 2. Buy chai from second buyer
    try {
        const amount = hre.ethers.parseEther("0.001"); // Much more than minimum amount
        console.log("\nBuying chai with", hre.ethers.formatEther(amount), "ETH from buyer2");

        const tx = await contract.connect(buyer2).buyChai(
            "Bob",
            "Keep up the amazing work! Here's a generous tip!",
            { value: amount }
        );

        console.log("Transaction hash:", tx.hash);
        await tx.wait();
        console.log("Transaction confirmed!");
    } catch (error) {
        console.error("Error buying chai:", error.message);
    }

    // 3. Get all transactions
    try {
        console.log("\nFetching all transactions...");
        const transactions = await contract.getTransactions();

        if (transactions.length === 0) {
            console.log("No transactions found.");
        } else {
            transactions.forEach((tx, index) => {
                console.log(`\nTransaction ${index + 1}:`);
                console.log("From:", tx.from);
                console.log("Name:", tx.name);
                console.log("Message:", tx.message);
                console.log("Timestamp:", new Date(Number(tx.timestamp) * 1000).toLocaleString());
            });
        }
    } catch (error) {
        console.error("Error fetching transactions:", error.message);
    }

    // 4. Get contract balance
    try {
        const balance = await hre.ethers.provider.getBalance(contractAddress);
        console.log("\nContract balance:", hre.ethers.formatEther(balance), "ETH");
    } catch (error) {
        console.error("Error getting balance:", error.message);
    }

    // 5. Get owner's balance
    try {
        const ownerBalance = await hre.ethers.provider.getBalance(owner.address);
        console.log("Owner's balance:", hre.ethers.formatEther(ownerBalance), "ETH");
    } catch (error) {
        console.error("Error getting owner's balance:", error.message);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });