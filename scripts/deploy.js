const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Ottieni il ContractFactory
  const VideoVerification = await hre.ethers.getContractFactory("VideoVerification");
  
  // Esegui il deploy
  const contract = await VideoVerification.deploy();
  await contract.waitForDeployment(); // <-- Nuovo metodo per ethers v6+

  console.log("Contract deployed to:", contract.target); // .target invece di .address
  console.log("Transaction hash:", contract.deploymentTransaction().hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });