var {PublicKey} = require('@solana/web3.js')
var solanaWeb3 = require('@solana/web3.js')
var {TOKEN_PROGRAM_ID} =  require('@solana/spl-token')

async function GetBalanceSPL() {
    
    var address = '2FFvJn5MkKvjZKezfhsPoD3DHBJWCwwD8HPFDWfFZDhh'
    var contract_address = '3SghkPdBSrpF9bzdAy5LwR4nGgFbqNcC6ZSq8vtZdj91'
    
    var SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL')

   var PrgAddress = (await PublicKey.findProgramAddress(
        [
            new PublicKey(address).toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            new PublicKey(contract_address).toBuffer(),
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    ))[0]
    
    var connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl('mainnet-beta'),
    );
    
    let balance = ''
    
    try{
     balance = await connection.getTokenAccountBalance(PrgAddress)
    } 
    catch (e){
       balance = 0 
    }
    
    console.log("balance if no account found means ZERO balance", balance)
}

GetBalanceSPL().catch(console.error).finally(() => {console.log('done')})