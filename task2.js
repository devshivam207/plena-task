const {Web3} = require('web3');
const web3 = new Web3();

// Constants
const TOKEN_ADDRESS = 'TOKEN_ADDRESS';
const LENDING_POOL_PROVIDER_ADDRESS = 'LENDING_POOL_ADDRESSES_PROVIDER_ADDRESS';
const LENDING_POOL_ADDRESS = 'LENDING_POOL_ADDRESS';
const AMOUNT_TO_DEPOSIT = web3.utils.toWei('1', 'ether'); // Example: Depositing 1 token

// ABI of ERC20 token
const ERC20_ABI = []; // Fill in with ERC20 ABI

const LENDING_POOL_PROVIDER_ABI = ['']; // Fill in with LendingPoolAddressesProvider ABI
const LENDING_POOL_ABI = ['']; // Fill in with LendingPool ABI

// Contracts
const erc20TokenContract = new web3.eth.Contract(ERC20_ABI, TOKEN_ADDRESS);
const lendingPoolProviderContract = new web3.eth.Contract(LENDING_POOL_PROVIDER_ABI, LENDING_POOL_PROVIDER_ADDRESS);
const lendingPoolContract = new web3.eth.Contract(LENDING_POOL_ABI, LENDING_POOL_ADDRESS);

async function depositToAave() {
    try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        // Approve Aave to transfer tokens on behalf of the user
        await erc20TokenContract.methods.approve(LENDING_POOL_ADDRESS, AMOUNT_TO_DEPOSIT).send({ from: account });

        // Deposit tokens to Aave
        await lendingPoolContract.methods.deposit(TOKEN_ADDRESS, AMOUNT_TO_DEPOSIT, account, 0).send({ from: account });

        console.log('Transaction successful!');
    } catch (error) {
        console.error('Error:', error);
    }
}

depositToAave();
