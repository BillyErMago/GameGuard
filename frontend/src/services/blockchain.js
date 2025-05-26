import { ethers } from 'ethers';
import VideoVerificationABI from '../contracts/VideoVerification.json';

// Configurazione del provider e del contratto
//let provider;
// const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const provider = new ethers.providers.JsonRpcProvider(
  {
    url: import.meta.env.VITE_ALCHEMY_SEPOLIA_URL,
    skipFetchSetup: true // Importante per ambienti browser
  },
  {
    chainId: 11155111, // Chain ID Sepolia
    name: 'sepolia',
    ensAddress: null // Disabilita esplicitamente ENS
  }
)
let contract;

export const connectWallet = async () => {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    return provider.getSigner();
  } else {
    throw new Error("Installa MetaMask!");
  }
};

export const initializeContract = async (contractAddress, abi) => {
  const signer = await connectWallet();
  contract = new ethers.Contract(contractAddress, abi, signer);
  return contract;
};

// Funzione per registrare un video
export const registerVideo = async (videoId, videoHash, ipfsCID) => {
  const tx = await contract.registerVideo(videoId, videoHash, ipfsCID);
  await tx.wait();
  return tx.hash;
};

// Funzione per verificare un video
export const verifyVideo = async (videoId, currentHash) => {
  return await contract.verifyVideo(videoId, currentHash);
};