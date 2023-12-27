const express = require('express');
const {Web3} = require("web3");
const web3 = new Web3('https://testnet-bsc.binance.org/');
console.log(web3);

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "bytes",
				"name": "_payload",
				"type": "bytes"
			}
		],
		"name": "transferFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const contractAddress = '0x9D41A4B34e77b1DD81CfaE0F9AdEfD272b0e3113';
const myAddress = '0xBf12D4c11C83Cbf07eeB3762218FD801018A83bD'; // This is your external BSC address, not the contract address

const targetContract = new web3.eth.Contract(contractABI, contractAddress);
const amountToSend = web3.utils.toWei('1', 'ether'); // Sending 1 BNB as a test (adjust as needed)

const payload = targetContract.methods.transferFunds(myAddress, web3.utils.asciiToHex('1')).encodeABI();

// Send the transaction
web3.eth.sendTransaction({
    from: myAddress,
    to: contractAddress,
    data: payload
})
.then((receipt) => {
    console.log('Transaction receipt:', receipt);
})
.catch((error) => {
    console.error('Error:', error);
});