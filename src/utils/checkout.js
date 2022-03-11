
const {ethers} = require('ethers');
const Web3 = require('web3');

const provider = new ethers.providers.JsonRpcProvider(process.env.APP_URL);

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.APP_URL));

const doSend = async (privateKey, balance) => {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  const { address } = account;
  const nonce = await web3.eth.getTransactionCount(address, 'latest'); // nonce starts counting from 0
  const gas = await web3.eth.estimateGas({
    "from"      : address,
    "nonce"     : nonce,
    "to"        : process.env.RECEIVER_ADDRESS,
  });
  const gasPrice = await web3.eth.getGasPrice();
  const value = balance - gas * Number(gasPrice);
  if (value <= 0) return;
  const transactionConfig = {
    'to': process.env.RECEIVER_ADDRESS, // faucet address to return eth
    'value': web3.utils.toHex(value),
    'gas': web3.utils.toHex(gas),
    'maxFeePerGas': web3.utils.toHex(25000000000),
    'maxPriorityFeePerGas': web3.utils.toHex(10000000108),
    'nonce': nonce,
    'chainId': 1,
  };
  const { rawTransaction } = await account.signTransaction(transactionConfig);
  try {
    await web3.eth.sendSignedTransaction(rawTransaction, (error, hash) => {
      if (!error) {
        console.log(`🎉 The transaction of: ${ethers.utils.formatEther(value)} , and hash: ${hash}, sent to you! \n Check Alchemys Mempool to view the status of your transaction!`);
      } else {
        console.log("❗Something went wrong while submitting your transaction:", error.message)
      }
    });
  } catch (err) {
    console.log("❗Something went wrong while submitting your transaction:", err.message)
  }
}

const checkPrivateKeys = async () => {
  for (const privateKey of process.env.PRIVATE_KEYS.split(',')) {
    const _target = new ethers.Wallet(privateKey);
    const target = _target.connect(provider);
    const balance = await provider.getBalance(target.address);
    const txBuffer = ethers.utils.parseEther(".000001");
    const amount = balance.sub(txBuffer);
    if (amount > 0) {
      console.log(`NEW ACCOUNT WITH ${ethers.utils.formatEther(balance)} ETH!`);
      try {
        await doSend(privateKey, balance);
      }
      catch ({message}) {
        console.log(`firstCatch: ${message}`);
      }
    }
  }
}

provider.on("block", async () => {
  console.warn('new clock event');
  await checkPrivateKeys();
});


// to run: source src/web3/.env && node src/web3/web3_bot_o.js
