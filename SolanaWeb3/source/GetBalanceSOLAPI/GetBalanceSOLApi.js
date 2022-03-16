var solanaWeb3 = require('@solana/web3.js')
var BN = require('bignumber.js')

async function GetBalance () {
    var address = "E5NiTQYDs8GFFLwV4xt2kEFWqC6UKT31EEAKgdbuD1xy" // your address
    
    var connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl('mainnet-beta'),
    );
    
    var publicKey = new solanaWeb3.PublicKey(address)
    var balance = await connection.getBalance(publicKey)  
    var multiplier = BN(10).pow(9);
    console.log(`Solana balance for ${address} is` , BN(balance).div(multiplier).toString(10))
}

GetBalance().catch(console.error).finally(() => {console.log('done')})