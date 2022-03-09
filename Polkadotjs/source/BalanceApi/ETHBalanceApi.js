var { ApiPromise, WsProvider } = require('@polkadot/api')
var BN = require('bignumber.js')
var apiConf = require('../apiConf.json')
var node = 'wss://node.riochain.io'

async function EthBalance (node) {
  // Initialise the provider to connect to the local node
  apiConf.provider = new WsProvider(node)

  // Create the API and wait until ready
  const api = await ApiPromise.create(apiConf)
  
 // Get rETH Balance. Change the address to get your balance
  const balance = await api?.query?.rioAssets?.accounts("5C8ReqFukokQmgMnm6EQwNmJzjFtf8SKAbBxH89X3NVBeRcW",103)
  var convertBalance = String(BN(String(JSON.parse(String(balance))?.free)).dividedBy(Math.pow(10, 18)))
  console.log(`Your rETH balance is ${convertBalance} `)
}
EthBalance(node).catch(console.error).finally(() => {console.log('done')})