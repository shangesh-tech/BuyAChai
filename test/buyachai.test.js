const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("BuyAChai Contract", function () {
    // Fixture to deploy the contract before each test
    async function deployBuyAChaiFixture() {
        const [owner, buyer1, buyer2] = await ethers.getSigners();
        const BuyAChai = await ethers.getContractFactory("buyachai");
        const buyAChai = await BuyAChai.deploy();

        // Constants matching the contract
        const MINIMUM_AMOUNT = ethers.parseEther("0.0001");  // 0.0001 ether as defined in contract
        const VALID_AMOUNT = ethers.parseEther("0.00011");   // Slightly above minimum
        const HIGHER_AMOUNT = ethers.parseEther("0.001");    // Much higher than minimum

        return { buyAChai, owner, buyer1, buyer2, MINIMUM_AMOUNT, VALID_AMOUNT, HIGHER_AMOUNT };
    }

    describe("Deployment", function () {
        it("Should set the correct minimum amount", async function () {
            const { buyAChai, MINIMUM_AMOUNT } = await loadFixture(deployBuyAChaiFixture);
            expect(await buyAChai.minimum_amount()).to.equal(MINIMUM_AMOUNT);
        });
    });

    describe("Buying Chai", function () {
        describe("Validations", function () {
            it("Should revert if payment equals minimum amount", async function () {
                const { buyAChai, buyer1, MINIMUM_AMOUNT } = await loadFixture(deployBuyAChaiFixture);

                await expect(
                    buyAChai.connect(buyer1).buyChai(
                        "Test",
                        "Test Message",
                        { value: MINIMUM_AMOUNT }
                    )
                ).to.be.revertedWith("Please pay more than 0.0001 ether");
            });

            it("Should revert if payment is below minimum amount", async function () {
                const { buyAChai, buyer1, MINIMUM_AMOUNT } = await loadFixture(deployBuyAChaiFixture);
                const belowMinimum = MINIMUM_AMOUNT / 2n;

                await expect(
                    buyAChai.connect(buyer1).buyChai(
                        "Test",
                        "Test Message",
                        { value: belowMinimum }
                    )
                ).to.be.revertedWith("Please pay more than 0.0001 ether");
            });

            it("Should accept payment above minimum amount", async function () {
                const { buyAChai, buyer1, VALID_AMOUNT } = await loadFixture(deployBuyAChaiFixture);

                await expect(
                    buyAChai.connect(buyer1).buyChai(
                        "Test",
                        "Test Message",
                        { value: VALID_AMOUNT }
                    )
                ).to.not.be.reverted;
            });
        });

        describe("Transactions", function () {
            it("Should transfer the funds to the contract owner", async function () {
                const { buyAChai, owner, buyer1, VALID_AMOUNT } = await loadFixture(deployBuyAChaiFixture);

                await expect(
                    buyAChai.connect(buyer1).buyChai(
                        "Test",
                        "Test Message",
                        { value: VALID_AMOUNT }
                    )
                ).to.changeEtherBalances(
                    [buyer1, owner],
                    [-VALID_AMOUNT, VALID_AMOUNT]
                );
            });

            it("Should store the transaction details correctly", async function () {
                const { buyAChai, buyer1, VALID_AMOUNT } = await loadFixture(deployBuyAChaiFixture);

                const name = "Test";
                const message = "Test Message";

                await buyAChai.connect(buyer1).buyChai(name, message, { value: VALID_AMOUNT });

                const transactions = await buyAChai.getTransactions();
                const lastTx = transactions[transactions.length - 1];

                expect(lastTx.name).to.equal(name);
                expect(lastTx.message).to.equal(message);
                expect(lastTx.from).to.equal(buyer1.address);
            });
        });

        describe("Events", function () {
            it("Should emit transaction_successful event with correct parameters", async function () {
                const { buyAChai, buyer1, VALID_AMOUNT } = await loadFixture(deployBuyAChaiFixture);

                const name = "Test";
                const message = "Test Message";

                const tx = await buyAChai.connect(buyer1).buyChai(name, message, { value: VALID_AMOUNT });
                const receipt = await tx.wait();

                const event = receipt.logs[0];
                const args = event.args;

                expect(args.name).to.equal(name);
                expect(args.message).to.equal(message);
                expect(args.from).to.equal(buyer1.address);
                expect(args.timestamp).to.be.a('bigint');
            });
        });

        describe("Multiple Transactions", function () {
            it("Should handle multiple chai purchases correctly", async function () {
                const { buyAChai, buyer1, buyer2, VALID_AMOUNT } = await loadFixture(deployBuyAChaiFixture);

                // First purchase
                await buyAChai.connect(buyer1).buyChai(
                    "First",
                    "First Message",
                    { value: VALID_AMOUNT }
                );

                // Second purchase
                await buyAChai.connect(buyer2).buyChai(
                    "Second",
                    "Second Message",
                    { value: VALID_AMOUNT }
                );

                const transactions = await buyAChai.getTransactions();

                expect(transactions.length).to.equal(2);
                expect(transactions[0].name).to.equal("First");
                expect(transactions[1].name).to.equal("Second");
                expect(transactions[0].from).to.equal(buyer1.address);
                expect(transactions[1].from).to.equal(buyer2.address);
            });

            it("Should maintain transaction order", async function () {
                const { buyAChai, buyer1, HIGHER_AMOUNT } = await loadFixture(deployBuyAChaiFixture);

                const purchases = [
                    { name: "Ian", message: "First" },
                    { name: "Jack", message: "Second" },
                    { name: "Kelly", message: "Third" }
                ];

                for (const purchase of purchases) {
                    await buyAChai.connect(buyer1).buyChai(
                        purchase.name,
                        purchase.message,
                        { value: HIGHER_AMOUNT }
                    );
                }

                const transactions = await buyAChai.getTransactions();

                for (let i = 0; i < purchases.length; i++) {
                    expect(transactions[i].name).to.equal(purchases[i].name);
                    expect(transactions[i].message).to.equal(purchases[i].message);
                }
            });
        });
    });

    describe("Transaction History", function () {
        it("Should return empty array when no transactions exist", async function () {
            const { buyAChai } = await loadFixture(deployBuyAChaiFixture);
            const transactions = await buyAChai.getTransactions();
            expect(transactions.length).to.equal(0);
        });

        it("Should return all transactions in correct order", async function () {
            const { buyAChai, buyer1, VALID_AMOUNT } = await loadFixture(deployBuyAChaiFixture);

            const names = ["First", "Second", "Third"];
            const messages = ["Message 1", "Message 2", "Message 3"];

            for (let i = 0; i < names.length; i++) {
                await buyAChai.connect(buyer1).buyChai(
                    names[i],
                    messages[i],
                    { value: VALID_AMOUNT }
                );
            }

            const transactions = await buyAChai.getTransactions();
            expect(transactions.length).to.equal(names.length);

            for (let i = 0; i < names.length; i++) {
                expect(transactions[i].name).to.equal(names[i]);
                expect(transactions[i].message).to.equal(messages[i]);
            }
        });
    });
}); 