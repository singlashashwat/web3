var Web3 = require('web3');
var BN = require('bignumber.js')

async function TransferERC20Token () {
    
    var to = '0x449E2C55dc4737aa54aFFA2c438Cd6AD9f82E4f2' // receiver account
    var from = '0x29eE90B3AA1A1D134239c678ae180436BD85F7E6' // sender account
    var amount = '0.01'
     var privKey = '*******' // your private key
    
    // Connect Any ETH Node on TestNet
  var Node_url =
        "https://ropsten.infura.io/v3/2edda5df859a4d68ab402cd016329860";
      let web3 = new Web3(new Web3.providers.HttpProvider(Node_url));
    
    // TestToken ERC20 Contract address and abi
    var contract_address = '0x722dd3F80BAC40c951b51BdD28Dd19d435762180'
    var contract_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"showMeTheMoney","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
        
    var multiplier = BN(10).pow(18)
    var value = BN(amount).times(multiplier).toString(10)    
    
    var contract = new web3.eth.Contract(contract_abi,contract_address)
    
    var data = await contract.methods.transfer(to,value).encodeABI();
    console.log("data",data)
    
    
    var transactionCount = await web3.eth.getTransactionCount(from);
    
//     var info = {
//         from,
//         to: contract_address,
//         value,
//         data
//       }
    
//     var gasLimit =  await web3.eth.estimateGas(info)
    // console.log("gasLimit",gasLimit)
    
    const signResult = await web3.eth.accounts.signTransaction(
      {
         from: from,
         to: contract_address,
         value: 0,
         gasLimit: 100000,
         nonce : web3.utils.toHex(transactionCount),
         data: data,
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

TransferERC20Token().catch(console.error).finally(() => {console.log('done')})