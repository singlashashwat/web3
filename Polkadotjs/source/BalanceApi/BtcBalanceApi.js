var { ApiPromise, WsProvider } = require('@polkadot/api')
var BN = require('bignumber.js')
var apiConf = require('../apiConf.json')
var node = 'wss://node.riochain.io'

async function BTCBalance (node) {
  // Initialise the provider to connect to the local node
  apiConf.provider = new WsProvider(node)

  // Create the API and wait until ready
  const api = await ApiPromise.create(apiConf)
  
 // Get BTC Balance. Change the address to get your balance
  const balance = await api?.query?.rioAssets?.accounts("5CkdUEC2JwW5gFRnFdw5vXCvGUY3k3vX8YK5ZHk7AzNWXPCq",100)
  var convertBalance = String(BN(String(JSON.parse(String(balance))?.free)).dividedBy(Math.pow(10, 8)))
  console.log(`Your BTC balance is ${convertBalance} `)
}
BTCBalance(node).catch(console.error).finally(() => {console.log('done')})