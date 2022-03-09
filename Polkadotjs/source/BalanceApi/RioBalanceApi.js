var { ApiPromise, WsProvider } = require('@polkadot/api')
var BN = require('bignumber.js')
var apiConf = require('../apiConf.json')
var node = 'wss://node-m03.riochain.io'

async function RioBalance (node) {
  // Initialise the provider to connect to the local node
  apiConf.provider = new WsProvider(node)

  // Create the API and wait until ready
  const api = await ApiPromise.create(apiConf)
  
  // Get RFuel Balance. Change the address to get your balance
  const Freebalance = await api?.query?.system?.account("5DUSQrNRcavR6jVBJx6WRm2evXPfTY5koJMAhLBpA8sLL4wF")
  var convertFreebalance = String(BN(String(JSON.parse(String(Freebalance)).data.free)).dividedBy(Math.pow(10, 12)))
  console.log(`Your RFUEL Freebalance is ${convertFreebalance} `) 
    
  const Lockbalance = await api?.query?.rioAssets?.accounts("5DUSQrNRcavR6jVBJx6WRm2evXPfTY5koJMAhLBpA8sLL4wF",1)
  var convertLockbalance = String(BN(String(JSON.parse(String(Lockbalance))?.reserved)).dividedBy(Math.pow(10, 12)))
  console.log(`Your RFUEL Freebalance is ${convertLockbalance} `)
}
RioBalance(node).catch(console.error).finally(() => {console.log('done')})