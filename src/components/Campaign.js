import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Campaign.css"

const Campaign = ({campaign,isDashBoard}) => {
  const navigate = useNavigate();
  return (
    <div className="campaign">
        <div style={{height:'200px',width:'100%',maxWidth:'500px',borderTopLeftRadius:'5px',borderTopRightRadius:'5px',backgroundColor:'gray'}}>
          <img style={{height:'200px',width:'100%',maxWidth:'500px',borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}} src={campaign.image}  alt="Image" />
        </div>
        <p className='campaign__title'>{campaign?.title}</p>
        <div className="campaign__owner">
            <p>Owner</p>
            <p>{campaign?.owner.slice(0,6)}...{campaign?.owner.slice(39)} </p>
        </div>
        <div className="campaign__amount">
            <p>Amount</p>
            <p>{campaign?.amount} ETH</p>
        </div>
        <p style={{letterSpacing:'2px',display:'flex',alignItems:'center',justifyContent:'center'}}>{new Date(campaign.timeStamp * 1000).toLocaleString()}</p>
        <div className="campaign__bnt">
            <button className="Btn" type="submit" onClick={(e)=>navigate(`/campaigns/${campaign?.address}`)}>{isDashBoard===true?'Go to Campaign':'Donate Now'}</button>
        </div>
        
    </div>
  )
}

export default Campaign