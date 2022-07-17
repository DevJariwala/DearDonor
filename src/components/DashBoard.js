import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import "./DashBoard.css"
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import Campaign from './Campaign'
import { CONTRACT_ADDRESS, RPC_URL } from '../constants'


const DashBoard = () => {

    const [campaigns, setCampaigns] = useState([])
    const [address, setAddress] = useState()

    const getData = async()=>{
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = Web3provider.getSigner();
        const Address = await signer.getAddress();
        setAddress(Address)

        const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

        const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CampaignFactory.abi,
            provider
        )
    
        const getAllCampaigns = contract.filters.campaignCreated(null,null,Address)
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
    console.log("Address is ",address);

  return (
    <div style={{display:'flex',flexWrap:'wrap',padding:'20px',justifyContent:'center'}}>
        {
            campaigns.map((campaign,ind)=>(
                <Campaign key={ind} campaign={campaign} isDashBoard={true}/>
            ))
        }
    </div>
  )
}

export default DashBoard