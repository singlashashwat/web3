var axios = require('axios');

async function GetNFTsApi () {
    
    
    // go to moralis server and create an api key. Please create your own api key based on your needs
    var config = {
    'X-API-Key': '**************' // moralis api key
    }
    
    // owner address on ploygon chain
    var owner_address = '0x66C5F477749A83Cb9CaB985e3e5008bE7637c7AD'
    
    var response = await axios.get('https://deep-index.moralis.io/api/v2/'+ owner_address +'/nft', {
        params: {
        chain : 'eth',
        format: 'decimal'
        },
        headers: config
        })
    console.log(`Your nfts with metadata on ${owner_address} is ${JSON.stringify(response.data)} `)
    
}

GetNFTsApi().catch(console.error).finally(() => {console.log('done')})