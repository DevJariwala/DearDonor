import React from 'react'
import "./Donate.css"
import { ethers } from 'ethers'
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import Campaign from '../artifacts/contracts/Campaign.sol/Campaign.json'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'
import { RPC_URL } from '../constants'

const Donate = () => {

  const [myDonations, setMyDonations] = useState([])
  const [story, setStory] = useState('')
  const [amount, setAmount] = useState('')
  const [change, setChange] = useState(false)

  const [campaigns, setCampaigns] = useState([])
  const [campaign, setCampaign] = useState({})


  const {id} = useParams();

  console.log("id is ",id);

    const getData =  async()=>{
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

        const contract = new ethers.Contract(
            id.toString(),
            Campaign.abi,
            provider
        )

        const title = await contract.title();
        const requiredAmount = await contract.requiredAmount();
        const image = await contract.image();
        const storyUrl = await contract.story();
        fetch(`https://ipfs.infura.io/ipfs/${storyUrl}`).then((res)=>res.text()).then((data)=>setStory(data))
        const owner = await contract.owner();
        const receivedAmount = await contract.recievedAmount();


        const Data = {
          adress:id,
          title,
          requiredAmount:ethers.utils.formatEther(requiredAmount),
          image:`https://ipfs.infura.io/ipfs/${image}`,
          receivedAmount:ethers.utils.formatEther(receivedAmount),
          storyUrl,
          owner
        }
        setCampaign(Data)
        setChange(false)
    }

    useEffect(() => {
        getData()
    }, [change])
    
    console.log(campaigns);
    console.log("my data is ",campaign);
    console.log(story);


    const donateFunds =async()=>{
      try {
        await window.ethereum.request({method:'eth_requestAccounts'})
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        const contract = new ethers.Contract(
          id.toString(),
          Campaign.abi,
          signer
        )

        const transaction = await contract.donate({value:ethers.utils.parseEther(amount)})
        await transaction.wait();

        setAmount('')
        setChange(true)
      } catch (error) {
        console.log(error);
      }
    }


  return (
    <div className='donate'>
        <div className="donate__left">
            <img style={{width:'100%'}} src={campaign?.image} alt="" />
            <p className='donate'>{story}</p>
        </div>
        <div className="donate__right">
            <p className='donate__title'>{campaign?.title} </p>
            <div className='donate__btn' >
                <input type="number" name="amount" placeholder='Enter Amount to Donate' onChange={(e)=>setAmount(e.target.value)} />
                <button className='Btn' onClick={donateFunds}>Donate</button>
            </div>
            <p>Required Amount : {campaign?.requiredAmount} ETH</p>
            <p>Received Amount : {campaign?.receivedAmount} ETH</p>
        </div>
    </div>
  )
}

export default Donate