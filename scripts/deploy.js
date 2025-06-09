const hre = require("hardhat");

async function main() {
    console.log("Deploying BuyAChai contract...");

    const BuyAChai = await hre.ethers.getContractFactory("buyachai");
    const buyAChai = await BuyAChai.deploy();

    await buyAChai.waitForDeployment();
    const address = await buyAChai.getAddress();

    console.log("BuyAChai deployed to:", address);
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
}); 