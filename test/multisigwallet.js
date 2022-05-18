const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Multisig Wallet', () => {

    let MultiSigWallet, multisigwallet, account1, account2, account3

    // const owners = [account1, account2, account3]
    // const NUM_CONFIRMATIONS_REQUIRED = 2

    beforeEach(async () => {
        [account1, account2, account3, _] = await ethers.getSigners();
        MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
        multisigwallet = await MultiSigWallet.deploy([account1.address, account2.address, account3.address], 2);

        const to = account1.address
        const value = 0
        const data = "0x00"

        await multisigwallet.submitTransaction(to, value, data)
        await multisigwallet.confirmTransaction(0)
        await multisigwallet.connect(account2).confirmTransaction(0)
    })

    describe("Execute tx", async () => {
        it("should execute", async () => {
            await multisigwallet.executeTransaction(0)

            const tx = await multisigwallet.getTransaction(0)
            expect(tx.executed).to.equal(true)
        })

        it("should reject if already executed", async () => {
            await multisigwallet.executeTransaction(0);

            // success
            // try {
            //     await multisigwallet.executeTransaction(0)
            // } catch (error) {
            //     expect(error.message).to.equal("VM Exception while processing transaction: reverted with reason string 'tx already executed'");
            // }

            await expect(multisigwallet.executeTransaction(0)).to.be.reverted
        })
    })
})