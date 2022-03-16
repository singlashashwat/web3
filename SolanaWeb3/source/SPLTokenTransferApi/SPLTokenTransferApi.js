var solanaWeb3 = require('@solana/web3.js')
var {TOKEN_PROGRAM_ID, Token} = require('@solana/spl-token')

var secretkey = '' // sender secret key
var addressSendTo = '' // receiver address
var contract = '' // contract token address
var amount = '' // amount

async function TransferSPLToken () {
    
    const lamports = new Decimal(amount)
      .times(Math.pow(10, decimals))
      .toString();
    
    // Connect to cluster
  var connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));
  // Construct wallet keypairs
  var fromWallet = Keypair.fromSecretKey(secretkey);
    
  // Construct my token class
  var myMint = new PublicKey(contract);
  var myToken = new Token(
    connection,
    myMint,
    TOKEN_PROGRAM_ID,
    fromWallet
  );
  // Create associated token accounts for my token if they don't exist yet
  var fromTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
    fromWallet.publicKey
  )
  var toTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
    new PublicKey(addressSendTo)
  )
  // Add token transfer instructions to transaction
  var transaction = new Transaction()
    .add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        [],
        lamports
      )
    );
  // Sign transaction, broadcast, and confirm
  var signatureHash = await connection.sendTransaction(transaction, [
      fromWallet,
    ]);
  console.log("SIGNATURE", signatureHash);
  console.log("SUCCESS");
}

TransferSPLToken().catch(console.error).finally(() => {console.log('done')})