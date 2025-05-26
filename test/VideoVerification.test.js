const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('VideoVerification', () => {
  let VideoVerification;
  let contract;
  let owner, user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    VideoVerification = await ethers.getContractFactory('VideoVerification');
    contract = await VideoVerification.deploy();
    await contract.deployed();
  });

  it('Dovrebbe registrare un video correttamente', async () => {
    const videoId = 'video-1';
    const videoHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('hash'));
    const ipfsCID = 'QmXYZ';

    await expect(contract.connect(owner).registerVideo(videoId, videoHash, ipfsCID))
      .to.emit(contract, 'VideoRegistered')
      .withArgs(videoId, owner.address, ipfsCID);

    const details = await contract.getVideoDetails(videoId);
    expect(details.hash).to.equal(videoHash);
    expect(details.ipfsCID).to.equal(ipfsCID);
  });

  it('Dovrebbe fallire se si tenta di registrare un video già esistente', async () => {
    const videoId = 'test-video-1';
    await contract.connect(owner).registerVideo(videoId, '0x1234', 'QmABC');
    
    await expect(
      contract.connect(owner).registerVideo(videoId, '0x5678', 'QmDEF')
    ).to.be.revertedWithCustomError(contract, 'VideoAlreadyRegistered');
  });

  it('Dovrebbe fallire se un non-owner prova a registrare', async () => {
    const videoId = 'video1';
    const videoHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('hash'));
    await expect(
      contract.connect(user).registerVideo(videoId, videoHash, 'QmXYZ')
    ).to.be.revertedWith('Ownable: caller is not the owner');
  });
});