var { mnemonicToSeed }  = require("bip39");
var {createHash, createCipheriv,createHmac} = require('crypto')
var { derivePath, getPublicKey } = require('ed25519-hd-key')
var { Keypair } = require('@solana/web3.js')
var solanaWeb3 = require('@solana/web3.js')
var nacl = require('tweetnacl')

var mnemoric = '' //address 
var addressSendFrom = "" // sender address
var addressSendTo = '' // receiver address

async function TransferSolana () {
    // solana path
    var path = "m/44'/501'/0'/0'"
    var mnemonicWord = mnemoric
    var mnemonicList = mnemonicWord.trim();
    var seedBuffer = await mnemonicToSeed(mnemonicList);
    var seedHex = seedBuffer.toString('hex');
    // private key
    var { key } = derivePath(path, seedHex)
    
    var keypairValue = Keypair.fromSeed(key)
    // keypair.secretKey
    
    var connection = new solanaWeb3.Connection(
      solanaWeb3.clusterApiUrl('devnet'),
    );
    
    var recentBlockhash = await connection.getRecentBlockhash()
    
    var manualTransaction = new solanaWeb3.Transaction({
    recentBlockhash: recentBlockhash.blockhash,
    feePayer: new solanaWeb3.PublicKey(addressSendFrom)
  })
    
      manualTransaction.add(solanaWeb3.SystemProgram.transfer({
    fromPubkey: new solanaWeb3.PublicKey(addressSendFrom),
    toPubkey: new solanaWeb3.PublicKey(addressSendTo),
    lamports: solanaWeb3.LAMPORTS_PER_SOL / 100
  }))
    
    var transactionBuffer = manualTransaction.serializeMessage()
    var signature = nacl.sign.detached(transactionBuffer, keypairValue.secretKey)
  manualTransaction.addSignature(new solanaWeb3.PublicKey(addressSendFrom), signature)
  manualTransaction.verifySignatures()

  var rawTransaction = manualTransaction.serialize()
  var result = await solanaWeb3.sendAndConfirmRawTransaction(connection, rawTransaction)
  console.log(`Your signature is. ${result}. you may go to devnet solana explorer to check transaction`)
    
}
TransferSolana().catch(console.error).finally(() => {console.log('done')})