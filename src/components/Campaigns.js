import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import Campaign from './Campaign'
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { TailSpin } from 'react-loader-spinner'
import { CONTRACT_ADDRESS, RPC_URL } from '../constants'

const Campaigns = () => {

    const [campaigns, setCampaigns] = useState([])

    const getData = async()=>{
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

        const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CampaignFactory.abi,
            provider
        )
    
        const getAllCampaigns = contract.filters.campaignCreated()
        const AllCampaigns = await contract.queryFilter(getAllCampaigns)
        const AllData = AllCampaigns.map((e)=>(
            {
                title:e.args.title,
                image:`https://ipfs.infura.io/ipfs/${e.args.imageURI}`,
                owner:e.args.owner,
                timeStamp: parseInt(e.args.timestamp),
                amount:ethers.utils.formatEther(e.args.requiredAmount),
                address:e.args.campaignAddress
            }
        ))
        setCampaigns(AllData);

    }

    useEffect(() => {
        getData()
    }, [])
    
    console.log("data is");
    console.log(campaigns);

  return (
    <div style={{display:'flex',flexWrap:'wrap',padding:'20px',justifyContent:'center'}}>
        {
            campaigns.length===0&&<TailSpin height={50} />
        }
        {
            campaigns.map((campaign,ind)=>(
                <Campaign key={ind} campaign={campaign} />
            ))
        }
    </div>
  )
}

export default Campaigns