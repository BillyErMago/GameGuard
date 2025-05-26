// SPDX-License-Identifier: UNKNOWN
pragma solidity ^0.8.20;

//import "@openzeppelin/contracts/access/Ownable.sol";
import "./Ownable.sol";

/**
 * @title VideoVerification
 * @dev Registra e verifica l'integrità di video utilizzando hash crittografici.
 */
contract VideoVerification is Ownable {
    struct VideoRecord {
        bytes32 videoHash;
        uint256 timestamp;
        address owner;
        string ipfsCID; // CID IPFS per il video (opzionale)
    }

    constructor() Ownable(msg.sender){}

    // Mappa da ID video (hash del nome + timestamp) al record
    mapping(bytes32 => VideoRecord) private _videoRegistry;

    // Eventi per tracciare le operazioni
    event VideoRegistered(bytes32 indexed videoHash, address indexed owner, string ipfsCID);
    event VideoVerified(bytes32 indexed videoHash, bool isValid);

    // Errori personalizzati
    error VideoAlreadyRegistered(bytes32 videoHash);
    error VideoNotRegistered(bytes32 videoHash);
    error Unauthorized(address caller);

    /**
     * @dev Registra un video con il suo hash e CID IPFS.
     * @param videoHash Hash SHA-256 del video.
     * @param ipfsCID CID IPFS del video (opzionale).
     */
     // Usa calldata per parametri di input (ottimizza il gas)
    function registerVideo(
        bytes32 videoHash,
        string calldata ipfsCID
    ) external onlyOwner {
        if (_videoRegistry[videoHash].timestamp != 0) {
            revert VideoAlreadyRegistered(videoHash);
        }

        _videoRegistry[videoHash] = VideoRecord({
            videoHash: videoHash,
            timestamp: block.timestamp,
            owner: msg.sender,
            ipfsCID: ipfsCID
        });

        emit VideoRegistered(videoHash, msg.sender, ipfsCID);
    }

    /**
     * @dev Verifica l'integrità di un video.
     * @param currentHash Hash corrente del video da verificare.
     * @return isValid True se l'hash corrisponde, false altrimenti.
     */
    function verifyVideo(
        bytes32 currentHash
    ) external view returns (bool isValid) {
        // 1. Verifica se currentHash è valido
        require(currentHash.length == 32, "Hash non valido");
        
        // 2. Controllo se il video è registrato
        if (_videoRegistry[currentHash].timestamp == 0) {
            return false;
        }

        VideoRecord memory record = _videoRegistry[currentHash];

        // 2. Controllo migliorato con messaggio di errore dettagliato
        /* if (record.timestamp == 0) {
            revert VideoNotRegistered(videoId);
        } */

        // 3. Aggiunta verifica hash nullo per sicurezza
        require(currentHash != bytes32(0), "Hash non valido");

        isValid = (record.videoHash == currentHash);
        //emit VideoVerified(videoId, isValid);
        return isValid;
    }

    /**
     * @dev Ottieni i dettagli di un video registrato.
     * @param videoHash Hash del video da cercare.
     */
    function getVideoDetails(
        bytes32 videoHash
    ) external view returns (VideoRecord memory) {
        // Verifica se il video è registrato
        if (_videoRegistry[videoHash].timestamp == 0) {
            revert VideoNotRegistered(videoHash);
        }
        return _videoRegistry[videoHash];
    }

    /**
     * @dev Funzione per ritirare i fondi (se necessaria).
     */
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}