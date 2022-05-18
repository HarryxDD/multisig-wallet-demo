const { ethers } = require("hardhat");

async function main() {
    [account1, account2, account3, _] = await ethers.getSigners();
        MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
        multisigwallet = await MultiSigWallet.deploy([account1.address, account2.address, account3.address], 2);

    console.log("contract deploy to: ", multisigwallet.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit;
    }) 