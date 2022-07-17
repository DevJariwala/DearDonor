import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "./Navbar.css"
import { ethers } from 'ethers'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const networks={
  Rinkeby:{
    chainId: `0x${Number(4).toString(16)}`,
    chainName:"Rinkeby",
    nativeCurrency:{
      name:"ETH",
      Symbol:"ETH",
      decimals:18
    },
    rpcUrls:["https://rinkeby.infura.io/v3/2b327d68e3274235be80df231540ee29"],
    blockExplorerUrls:["https://rinkeby.etherscan.io/"]
  }
}

const Navbar = () => {

  const navigate = useNavigate();
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState('')
  const [burgerStatus, setBurgerStatus] = useState(false)

  const connectWallet = async ()=>{
    if(window.ethereum){
      await window.ethereum.request({method:'eth_requestAccounts'})
      const provider = new ethers.providers.Web3Provider(window.ethereum,"any")
      const account = provider.getSigner();
      const address = await account.getAddress();
      const Balance = ethers.utils.formatEther(await account.getBalance());
      setAddress(address);
      setBalance(Balance)
    }else{
      alert("Please Install Metamask")
    }
  }

  window.ethereum.on('accountsChanged',connectWallet)
  
  

  return (
    <div className='navbar'>
      <div>
       <p className='navbar__name' onClick={()=>navigate("/")}> Dear Donor </p>
      </div>
      <div className='navbar__category'>
        <p className='navbar__p' onClick={(e)=>navigate("/campaigns")}>Campaings</p>
        <p className='navbar__p' onClick={(e)=>navigate("/createCampaign")}>Create Campaings</p>
        <p className='navbar__p' onClick={(e)=>navigate("/dashBoard")}>Dashboard</p>
      </div>
      <div className='wallet__btn'>
        {
          address==='' && <p className='navbar__p' onClick={connectWallet}>Connect Wallet</p>
        }

        {
          balance!=='' && <p className='wallet'>{balance.slice(0,4)} ETH</p>
        }
        
        {
          address!=='' && <p className='wallet'>{address.slice(0,6)}...{address.slice(39)} </p>
        }
        <div className="outside__menu">
            <MenuIcon onClick={()=>setBurgerStatus(true)} className="menu__icon" />
        </div>
        <div className={`burger__nav ${burgerStatus?"display":""}`}>
            <div className="closeIcon">
                <CloseIcon style={{color:'white'}} onClick={()=>setBurgerStatus(false)} className="close"/>
            </div>
            <p onClick={(e)=>{navigate("/campaigns");setBurgerStatus(false)}} >Campaings</p>
            <p onClick={(e)=>{navigate("/createCampaign");setBurgerStatus(false)}} >Create Campaings</p>
            <p onClick={(e)=>{navigate("/dashBoard");setBurgerStatus(false)}} >Dashboard</p>
         </div>
      </div>
    </div>
  )
}

export default Navbar