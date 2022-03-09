var Web3 = require('web3');
var BN = require('bignumber.js')

async function TransferETH () {
    
    var addressFrom = "0x5a7Fd267ACF032aF16BF5b9BE8c24557B21765a4"
    var addressTo = "0x29eE90B3AA1A1D134239c678ae180436BD85F7E6"
    var valueInput =  "0.05" // value
    var privKey = '*****' // your private key
    
        // Connect Any ETH Node
    var Node_url =
        "https://ropsten.infura.io/v3/2edda5df859a4d68ab402cd016329860";
    var web3 = new Web3(new Web3.providers.HttpProvider(Node_url));
    
    var multiplier = BN(10).pow(18)
    var value = BN(valueInput).times(multiplier).toString(10)
    
    var transactionCount = await web3.eth.getTransactionCount(addressFrom);
    
    var info = {
        addressFrom,
        addressTo,
        value
      }
    
    var gasLimit =  await web3.eth.estimateGas(info)
    
    
    const signResult = await web3.eth.accounts.signTransaction(
      {
         from: addressFrom,
         to: addressTo,
         value: value,
         gasLimit: gasLimit > 100000 ? 100000 : gasLimit,
         nonce : web3.utils.toHex(transactionCount)
      },
      privKey
   );
    

   // Deploy transaction
    const {rawTransaction} = signResult || {};
    web3.eth.sendSignedTransaction(rawTransaction).on('transactionHash',txId => {
                  console.log(`Transaction successful with hash: ${txId}`);
            }).on("error", error => {
                reject(error);
            })
}

TransferETH().catch(console.error).finally(() => {console.log('done')})