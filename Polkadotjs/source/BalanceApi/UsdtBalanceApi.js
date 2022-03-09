var { ApiPromise, WsProvider } = require('@polkadot/api')
var BN = require('bignumber.js')
var apiConf = require('../apiConf.json')
var node = 'wss://node.riochain.io'

async function UsdtBalance (node) {
  // Initialise the provider to connect to the local node
  apiConf.provider = new WsProvider(node)

  // Create the API and wait until ready
  const api = await ApiPromise.create(apiConf)
  
 // Get rUSTD Balance. Change the address to get your balance
  const balance = await api?.query?.rioAssets?.accounts("5GjdzRfDbTQCJAjBRDkJKWoVE9pXJHKQsoo1zMLpxdYQTGtv",102)
  var convertBalance = String(BN(String(JSON.parse(String(balance))?.free)).dividedBy(Math.pow(10, 6)))
  console.log(`Your rUSTD balance is ${convertBalance} `)
}
UsdtBalance(node).catch(console.error).finally(() => {console.log('done')})