var Web3 = require('web3');

async function BalanceApi () {
    
    // Connect Any ETH Node
  var Node_url =
        "https://mainnet.infura.io/v3/2edda5df859a4d68ab402cd016329860";
      let web3 = new Web3(new Web3.providers.HttpProvider(Node_url));
    
    var balance = await web3.eth.getBalance('0x66C5F477749A83Cb9CaB985e3e5008bE7637c7AD')
    console.log(`Your balance is ${balance} `)
}

BalanceApi().catch(console.error).finally(() => {console.log('done')})