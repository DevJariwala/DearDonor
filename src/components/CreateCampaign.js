import React, { useState } from 'react'
import "./CreateCampaign.css"
import {FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField} from '@mui/material'
import FileBase from 'react-file-base64'
import { toast } from 'react-toastify'
import { TailSpin } from 'react-loader-spinner'
import { create as IPFSHTTPClient } from 'ipfs-http-client'
import { ethers } from 'ethers'
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { useNavigate } from 'react-router-dom'
import { CONTRACT_ADDRESS } from '../constants'

const client = IPFSHTTPClient("https://ipfs.infura.io:5001/api/v0")

const CreateCampaign = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        campaignTitle:"",
        story:"",
        requiredAmount:"",
        category:"",
        image:""
    })

    const [uploadLoading, setUploadLoading] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [storyUrl, setStoryUrl] = useState()
    const [imgUrl, setImgUrl] = useState()
    const [address, setAddress] = useState("")
    const [loading, setLoading] = useState(false)

    const [image,setImage] = useState(null)


    const handleSubmit= async (e)=>{
        e.preventDefault()
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        console.log(form);

        if(form.campaignTitle===""){
            alert("Title Field is Empty")
        }else if(form.story===""){
            alert("Story Field is Empty")
        }else if(form.requiredAmount===""){
            alert("Required Amount Field is Empty")
        }else if(uploaded===false){
            alert("Files Upload Required")
        }else{
            setLoading(true)

            console.log("Creating contract");
            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                CampaignFactory.abi,
                signer
            )

            console.log(contract);
            console.log("image url is",imgUrl);
            console.log("story url is",storyUrl);

            const CampaignAmount = ethers.utils.parseEther(form.requiredAmount)

            const campaignData = await contract.createCampaign(
                form.campaignTitle,
                CampaignAmount,
                imgUrl,
                storyUrl,
                form.category
            )
            
            await campaignData.wait();

            setAddress(campaignData.to)

        }

    }

    const handleUploadFiles= async (e)=>{
        e.preventDefault()
        setUploadLoading(true)

        if(form.story!==""){
            try {
                const added = await client.add(form.story);
                setStoryUrl(added.path)
                console.log("Here story url is ",added.path);
                console.log(storyUrl);
            } catch (error) {
                toast.warn('Error While Uploading Story')
                alert('Error while Uploading Story')
            }
        }

        if(image!==null){
            try {
                const added = await client.add(image);
                setImgUrl(added.path)
                console.log("Here Image url is ",added.path);
                console.log(imgUrl);
            } catch (error) {
                toast.warn('Error While Uploading Image')
                alert('Error while Uploading Image')
            }
        }

        setUploadLoading(false)
        setUploaded(true)
        toast.success("Files Uploaded Successfully")

    }

    const handleImage=(e)=>{
        setImage(e.target.files[0])
    }

  return (
    <div className='form'>
        {
            loading===true?
                address==""?
                    <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}} >
                        <TailSpin height={50} />
                    </div>
                : <div style={{justifyContent:'center',flexDirection:'column',display:'flex',alignItems:'center'}}>
                        <p className='form__heading'>Campaign Started Successfully</p>
                        <p className='form__heading'>{address}</p>
                        <button className="submitBtn" type="submit" onClick={(e)=>navigate("/campaigns")} >Go To Campaign</button>
                    </div>
            :
            <form className='form__data' autoComplete='off' noValidate onSubmit={handleSubmit}>
                <p className='form__heading'>Create Campaign</p>
                <TextField 
                    style={{width:"80%",maxWidth:'700px',marginTop:'10px'}}
                    name="title"
                    label="Campaign Title"
                    variant='outlined'
                    onChange={(e)=>setForm({...form,campaignTitle:e.target.value})}
                />

                <TextField 
                    style={{width:"80%",maxWidth:'700px',marginTop:'10px'}}
                    name="requiredAmount"
                    label="Required Amount"
                    variant="outlined"
                    onChange={(e)=>setForm({...form,requiredAmount:e.target.value})}
                    type={'number'}
                />

                <FormControl style={{width:"80%",maxWidth:'700px',marginTop:'10px'}}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={form.category}
                        label="Category"
                        onChange={(e)=>setForm({...form,category:e.target.value})}
                        >
                        <MenuItem value="Education">Education</MenuItem>
                        <MenuItem value="Health">Health</MenuItem>
                        <MenuItem value="Animal">Animal</MenuItem>
                    </Select>
                </FormControl>

                <TextareaAutosize 
                    placeholder='Describe your story'
                    style={{width:"80%",maxWidth:'695px',marginTop:'10px'}}
                    minRows={2}
                    onChange={(e)=>setForm({...form,story:e.target.value})}
                />
                <div className="input-file">
                    <input type="file" name="" id="" onChange={handleImage} />
                </div>
                
                <div className="buttons">
                    {
                        uploadLoading===true?<TailSpin  height={20} />:
                        uploaded===false?
                        <button className="submitBtn" onClick={handleUploadFiles}>Upload Files to IPFS</button>:
                        <button className="submitBtn" style={{cursor:"no-drop"}} >Files uploaded Sucessfully</button>
                    }
                   <button className="submitBtn" type="submit" onClick={handleSubmit}>Start Campaign</button>
                </div>

            </form>
        }
    </div>
  )
}

export default CreateCampaign


