// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.7.0 <=0.9.0;

contract CampaignFactory{
    address[] public deployedCampaigns;

    event campaignCreated(string title,uint requiredAmount,address indexed owner,address campaignAddress,string imageURI,uint indexed timestamp,string indexed category);

    function createCampaign(string memory campaignTitle,uint campaignRequiredAmout,string memory imgURI,string memory storyURI,string memory category) public {
        Campaign newCampaign = new Campaign(campaignTitle,campaignRequiredAmout,imgURI,storyURI,msg.sender);
        deployedCampaigns.push(address(newCampaign));

        emit campaignCreated(campaignTitle,campaignRequiredAmout,msg.sender,address(newCampaign),imgURI,block.timestamp,category);
    }

}

contract Campaign{
    string public title;
    uint public requiredAmount;
    string public image;
    string public story;
    address payable public owner;
    uint public recievedAmount;

    event donated(address indexed donar, uint indexed amount,uint indexed timestamp);

    constructor(string memory campaignTitle,uint campaignRequiredAmout,string memory imgURI,string memory storyURI,address campaignOwner){
        title=campaignTitle;
        requiredAmount=campaignRequiredAmout;
        image=imgURI;
        story=storyURI;
        owner=payable(campaignOwner);
    }

    function donate() public payable{
        require(requiredAmount>recievedAmount,"required amount fullfilled");
        owner.transfer(msg.value);
        recievedAmount+=msg.value;
        emit donated(msg.sender,msg.value,block.timestamp);
    }

}