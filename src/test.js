const CampaignFactory = require("./artifacts/contracts/Campaign.sol/CampaignFactory.json")
const {ethers} = require('ethers') 
const { CONTRACT_ADDRESS, RPC_URL } = require("./constants")

const main = async () =>{
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

    const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CampaignFactory.abi,
        provider
    )

    const getDeployedCampaign = contract.filters.campaignCreated()
    let events = await contract.queryFilter(getDeployedCampaign)
    let event = events.reverse()
    console.log(event);

}

main();