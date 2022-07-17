Dear Donor: Crowdfunding Platform Powered by Ethereum Blockchain

The Platform is live on Rinkeby Test Network and available to use at: https://deardonor.netlify.app/

# Screenshots
Home Page:
![image](https://user-images.githubusercontent.com/65401776/179399114-34214c18-ee38-4a46-a366-b831331388b2.png)

Campaigns Page:
![image](https://user-images.githubusercontent.com/65401776/179399158-b2d4c592-4568-4f82-9f1c-1451c708fd77.png)

Create Campaign Page:
![image](https://user-images.githubusercontent.com/65401776/179399190-dd0f7476-89b0-4ee4-8f9a-676730e5bd3d.png)

Dashboard Page:
![image](https://user-images.githubusercontent.com/65401776/179399213-c8089b4f-13e6-43d4-a3fb-22664eb0ae4f.png)

## Tech Stack
React Js

Solidity

Web3.js

## To run the application locally
fork the project

run npm install to install all the dependencies

run the npm start to run the application locally

## Prerequisites to create Campaign and Contribute

1.Install Metamask as Google Chrome Extention and Create an account.

2.Request Ether by sharing your ethereum address on social media.

(https://faucet.rinkeby.io/)

3.Get 0.01 ether free by giving the ethereum address

(http://rinkeby-faucet.com/)

## To Deploy your own Contract
1.Create an account in https://infura.io

2.Create .env.local file in Ethereum directory and add these line to it.

NEXT_PUBLIC_RPC_URL=https://rinkeby.infura.io/v3/2b327d68e3274235be80df231540ee29 (infura url like this)

NEXT_PUBLIC_PRIVATE_KEY=bdee38f728f0ed4fc4ccacd71dbda0e9d416ce907540776893e1c108618787f9 (private key of you metamask account)

3.Do the Changes that you want to do inside the Solidity File

4.Compile the Contract node compile.js

5.To Deploy contract run -> npx hardhat run src/scripts/deploy.js

Copy the contract deploy address and replace it in src/constant.js file.

6.also replace RPC_URL
