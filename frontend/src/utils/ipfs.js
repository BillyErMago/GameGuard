import axios from 'axios';

export const uploadToIPFS = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    // Aggiungi metadati opzionali
    const metadata = JSON.stringify({
      name: file.name,
      keyvalues: {
        project: 'VideoGuardian'
      }
    });
    formData.append('pinataMetadata', metadata);

    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_APP_PINATA_JWT}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return response.data.IpfsHash; // Restituisce il CID IPFS
  } catch (error) {
    console.error('Errore upload Pinata:', error.response?.data || error.message);
    throw new Error('Upload fallito: ' + (error.response?.data?.error || error.message));
  }
};