require("@nomiclabs/hardhat-waffle")
require("dotenv").config({path:"./.env.local"})

task("accounts","Prints the list of accounts", async (taskArg,hre)=>{
  const accounts = await hre.ethers.getSigners();

  accounts.forEach(account => {
    console.log(account.address);
  });

})

const privateKey=process.env.NEXT_PUBLIC_PRIVATE_KEY

module.exports = {
  solidity: "0.8.10",
  paths:{
    artifacts:"./src/artifacts"
  },
  defaultNetwork:"Rinkeby",
  networks:{
    hardhat:{},
    Rinkeby:{
      url:process.env.NEXT_PUBLIC_RPC_URL,
      accounts:[privateKey]
    }
  }
};
