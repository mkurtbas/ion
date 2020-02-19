// Copyright (c) 2020 Clearmatics Technologies Ltd
// SPDX-License-Identifier: LGPL-3.0+
pragma solidity ^0.5.12;

import "../libraries/ECVerify.sol";
import "../libraries/RLP.sol";
import "../libraries/SolidityUtils.sol";
import "../libraries/SortArray.sol";
import "../storage/BlockStore.sol";
import "../IonCompatible.sol";

/* 
    Smart contract for validation of blocks that use the Autonity implementation of the 
    Tendermint consensus algorithm.
*/

contract TendermintAutonity is IonCompatible {
    using RLP for RLP.RLPItem;
    using RLP for RLP.Iterator;
    using RLP for bytes;

    /*
    * @description    persists the last submitted block of a chain being validated
    */
    struct BlockHeader {
        bytes32 blockHash;
        bytes32 parentHash;
        bytes32 validatorsHash; // hash of the sorted validators list
        uint256 votingThreshold; // threshold of the voting power needed to consider a block valid 
    }

    event GenesisCreated(bytes32 chainId, bytes32 blockHash);
    event BlockSubmitted(bytes32 chainId, bytes32 blockHash);

    // ids of the chains registered to this module
    mapping (bytes32 => bool) public supportedChains; 
    
    // chainID to blockHash to blockHeader of the last submitted block
    // by not allowing to build multiple chains for the same chainID one could 
    // easily deny the service
    mapping (bytes32 => mapping(bytes32 => BlockHeader)) public id_chainHeaders;

    /*
    * onlyRegisteredChains
    * param: _id (bytes32) Unique id of chain supplied to function
    *
    * Modifier that checks if the provided chain id has been registered to this contract
    */
    modifier onlyRegisteredChains(bytes32 id) {
        require(supportedChains[id], "Chain is not registered");
        _;
    }

    // initialize ION hub contract
    constructor (address ionAddr) IonCompatible(ionAddr) public {}

/* =====================================================================================================================

        View Functions

   =====================================================================================================================
*/

    /*
    * getValidatorsRoot
    * 
    * @param: chainId (bytes32) id of the chain of the block containing the validators hash
    * @param: blockHash (bytes32) hash of the block containing the validators hash
    *
    * @description: Returns the validators hash of a specific chain head
    */
    function getValidatorsRoot(bytes32 chainId, bytes32 blockHash) external view returns (bytes32) {
        return id_chainHeaders[chainId][blockHash].validatorsHash;
    }

/* =====================================================================================================================

        Public Functions

   =====================================================================================================================
*/
    
    /*
    * RegisterValidationModule 
    * 
    * @description: Register this validation module to ION hub in order to submit blocks to it
    */
    function RegisterValidationModule() public returns (bool) {
        ion.registerValidationModule();
        return true;
    }

    /*
    * RegisterChain
    * 
    * @param: chainId (bytes32) Unique id of another chain to interoperate with
    * @param: validators (address[]) Array containing the validators at the genesis block
    * @param: initialThreshold (uint256) Voting power threshold at the genesis block
    * @param: genesisHash (bytes32) Hash of the genesis block for the chain being registered with Ion
    *
    * @description: Adds a genesis block with the validators and other metadata for this genesis block
    */
    function RegisterChain(bytes32 chainId, address[] calldata validators, uint256 initialTreshold, bytes32 genesisBlockHash, address storeAddr) external {
        require(chainId != ion.chainId(), "Cannot add this chain id to chain register");
        require(id_chainHeaders[chainId][genesisBlockHash].blockHash == bytes32(0), "This chain already exists");

        if (!supportedChains[chainId]) {
            // initialize the chain if it's not yet 
            supportedChains[chainId] = true;
        }

        // register this chain to ion hub
        ion.addChain(storeAddr, chainId);

        // store genesis block data needed to validate further blocks
        BlockHeader storage header = id_chainHeaders[chainId][genesisBlockHash];
        header.blockHash = genesisBlockHash;
        header.validatorsHash = keccak256(abi.encode(SortArray.sortAddresses(validators)));
        header.votingThreshold = initialTreshold;

        emit GenesisCreated(chainId, genesisBlockHash);
    }

/* =====================================================================================================================

        Internal Functions

   =====================================================================================================================
*/

}