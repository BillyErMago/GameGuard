/*//import { sha256 } from 'crypto-js';
export const computeHash = async (file) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};
export const computeHash = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const wordArray = new Uint8Array(reader.result);
      resolve(sha256(wordArray).toString());
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

*/
export const computeHash = async (file) => {
  try {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    
    // Converti l'ArrayBuffer in stringa esadecimale con prefisso 0x
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return `0x${hashHex}`; // Aggiungi il prefisso 0x
  } catch (error) {
    throw new Error('Errore nel calcolo hash: ' + error.message);
  }
};