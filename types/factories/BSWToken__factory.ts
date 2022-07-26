/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BSWToken, BSWTokenInterface } from "../BSWToken";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "fromDelegate",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toDelegate",
        type: "address",
      },
    ],
    name: "DelegateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "previousBalance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "DelegateVotesChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DELEGATION_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addMinter",
        type: "address",
      },
    ],
    name: "addMinter",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "checkpoints",
    outputs: [
      {
        internalType: "uint32",
        name: "fromBlock",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "votes",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_delMinter",
        type: "address",
      },
    ],
    name: "delMinter",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegatee",
        type: "address",
      },
    ],
    name: "delegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegatee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "delegateBySig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegator",
        type: "address",
      },
    ],
    name: "delegates",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getCurrentVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "getMinter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMinterLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "getPriorVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isMinter",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "numCheckpoints",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "preMineSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600681526020016504269737761760d41b8152506040518060400160405280600381526020016242535760e81b81525060006200005f6200010260201b60201c565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3508151620000be906004906020850190620002ab565b508051620000d4906005906020840190620002ab565b506006805460ff19166012179055620000f9336a084595161401484a00000062000106565b50505062000347565b3390565b60006001600160a01b03831662000164576040805162461bcd60e51b815260206004820152601f60248201527f42455032303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6b024306c4097859c43c0000006200018d600354846200024960201b620013d61790919060201c565b11156200019d5750600062000243565b620001b9826003546200024960201b620013d61790919060201c565b6003556001600160a01b038316600090815260016020908152604090912054620001ee918490620013d662000249821b17901c565b6001600160a01b03841660008181526001602090815260408083209490945583518681529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35b92915050565b600082820183811015620002a4576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620002ee57805160ff19168380011785556200031e565b828001600101855582156200031e579182015b828111156200031e57825182559160200191906001019062000301565b506200032c92915062000330565b5090565b5b808211156200032c576000815560010162000331565b61214980620003576000396000f3fe608060405234801561001057600080fd5b50600436106102065760003560e01c8063782d6fe11161011a578063a9059cbb116100ad578063d5abeb011161007c578063d5abeb0114610658578063dd62ed3e14610660578063e7a324dc1461068e578063f1127ed814610696578063f2fde38b146106e857610206565b8063a9059cbb14610599578063aa271e1a146105c5578063b4b5ea57146105eb578063c3cda5201461061157610206565b806395d89b41116100e957806395d89b4114610522578063983b2d561461052a578063a0712d6814610550578063a457c2d71461056d57610206565b8063782d6fe1146104c05780637ecebe00146104ec578063893d20e8146105125780638da5cb5b1461051a57610206565b8063313ce5671161019d5780635b7121f81161016c5780635b7121f81461040e5780635c19a95c1461042b5780636fcfff451461045357806370a0823114610492578063715018a6146104b857610206565b8063313ce56714610356578063395093511461037457806340c10f19146103a0578063587cde1e146103cc57610206565b806318160ddd116101d957806318160ddd146102ea57806320606b70146102f257806323338b88146102fa57806323b872dd1461032057610206565b80630323aac71461020b57806306fdde0314610225578063095ea7b3146102a25780630c16ea83146102e2575b600080fd5b61021361070e565b60408051918252519081900360200190f35b61022d61071f565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561026757818101518382015260200161024f565b50505050905090810190601f1680156102945780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102ce600480360360408110156102b857600080fd5b506001600160a01b0381351690602001356107b5565b604080519115158252519081900360200190f35b6102136107d3565b6102136107e2565b6102136107e8565b6102ce6004803603602081101561031057600080fd5b50356001600160a01b031661080c565b6102ce6004803603606081101561033657600080fd5b506001600160a01b038135811691602081013590911690604001356108b6565b61035e61093d565b6040805160ff9092168252519081900360200190f35b6102ce6004803603604081101561038a57600080fd5b506001600160a01b038135169060200135610946565b6102ce600480360360408110156103b657600080fd5b506001600160a01b038135169060200135610994565b6103f2600480360360208110156103e257600080fd5b50356001600160a01b0316610a20565b604080516001600160a01b039092168252519081900360200190f35b6103f26004803603602081101561042457600080fd5b5035610a3e565b6104516004803603602081101561044157600080fd5b50356001600160a01b0316610b02565b005b6104796004803603602081101561046957600080fd5b50356001600160a01b0316610b0f565b6040805163ffffffff9092168252519081900360200190f35b610213600480360360208110156104a857600080fd5b50356001600160a01b0316610b27565b610451610b42565b610213600480360360408110156104d657600080fd5b506001600160a01b038135169060200135610be4565b6102136004803603602081101561050257600080fd5b50356001600160a01b0316610dec565b6103f2610dfe565b6103f2610e04565b61022d610e13565b6102ce6004803603602081101561054057600080fd5b50356001600160a01b0316610e74565b6102ce6004803603602081101561056657600080fd5b5035610f1e565b6102ce6004803603604081101561058357600080fd5b506001600160a01b038135169060200135610f89565b6102ce600480360360408110156105af57600080fd5b506001600160a01b038135169060200135610ff1565b6102ce600480360360208110156105db57600080fd5b50356001600160a01b0316611005565b6102136004803603602081101561060157600080fd5b50356001600160a01b0316611012565b610451600480360360c081101561062757600080fd5b506001600160a01b038135169060208101359060408101359060ff6060820135169060808101359060a00135611076565b6102136112e9565b6102136004803603604081101561067657600080fd5b506001600160a01b03813581169160200135166112f9565b610213611324565b6106c8600480360360408110156106ac57600080fd5b5080356001600160a01b0316906020013563ffffffff16611348565b6040805163ffffffff909316835260208301919091528051918290030190f35b610451600480360360208110156106fe57600080fd5b50356001600160a01b0316611375565b600061071a6007611430565b905090565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107ab5780601f10610780576101008083540402835291602001916107ab565b820191906000526020600020905b81548152906001019060200180831161078e57829003601f168201915b5050505050905090565b60006107c96107c261143b565b848461143f565b5060015b92915050565b6a084595161401484a00000090565b60035490565b7f8cad95687ba82c2ce50e74f7b754645e5117c3a5bec8151c0726d5857980a86681565b600061081661143b565b6000546001600160a01b03908116911614610866576040805162461bcd60e51b8152602060048201819052602482015260008051602061203f833981519152604482015290519081900360640190fd5b6001600160a01b0382166108ab5760405162461bcd60e51b8152600401808060200182810382526023815260200180611f576023913960400191505060405180910390fd5b6107cd60078361152b565b60006108c3848484611540565b610933846108cf61143b565b61092e85604051806060016040528060288152602001611f9d602891396001600160a01b038a1660009081526002602052604081209061090d61143b565b6001600160a01b031681526020810191909152604001600020549190611692565b61143f565b5060019392505050565b60065460ff1690565b60006107c961095361143b565b8461092e856002600061096461143b565b6001600160a01b03908116825260208083019390935260409182016000908120918c1681529252902054906113d6565b600061099f33611005565b6109f0576040805162461bcd60e51b815260206004820152601860248201527f63616c6c6572206973206e6f7420746865206d696e7465720000000000000000604482015290519081900360640190fd5b6109fa8383611729565b506001600160a01b038084166000908152600960205260408120546107c9921684611843565b6001600160a01b039081166000908152600960205260409020541690565b6000610a4861143b565b6000546001600160a01b03908116911614610a98576040805162461bcd60e51b8152602060048201819052602482015260008051602061203f833981519152604482015290519081900360640190fd5b6001610aa261070e565b03821115610af7576040805162461bcd60e51b815260206004820152601860248201527f4253573a20696e646578206f7574206f6620626f756e64730000000000000000604482015290519081900360640190fd5b6107cd600783611985565b610b0c3382611991565b50565b600b6020526000908152604090205463ffffffff1681565b6001600160a01b031660009081526001602052604090205490565b610b4a61143b565b6000546001600160a01b03908116911614610b9a576040805162461bcd60e51b8152602060048201819052602482015260008051602061203f833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000438210610c245760405162461bcd60e51b8152600401808060200182810382526026815260200180611fe66026913960400191505060405180910390fd5b6001600160a01b0383166000908152600b602052604090205463ffffffff1680610c525760009150506107cd565b6001600160a01b0384166000908152600a6020908152604080832063ffffffff600019860181168552925290912054168310610cc1576001600160a01b0384166000908152600a602090815260408083206000199490940163ffffffff168352929052206001015490506107cd565b6001600160a01b0384166000908152600a6020908152604080832083805290915290205463ffffffff16831015610cfc5760009150506107cd565b600060001982015b8163ffffffff168163ffffffff161115610db557600282820363ffffffff16048103610d2e611e89565b506001600160a01b0387166000908152600a6020908152604080832063ffffffff808616855290835292819020815180830190925280549093168082526001909301549181019190915290871415610d90576020015194506107cd9350505050565b805163ffffffff16871115610da757819350610dae565b6001820392505b5050610d04565b506001600160a01b0385166000908152600a6020908152604080832063ffffffff9094168352929052206001015491505092915050565b600c6020526000908152604090205481565b600061071a5b6000546001600160a01b031690565b60058054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107ab5780601f10610780576101008083540402835291602001916107ab565b6000610e7e61143b565b6000546001600160a01b03908116911614610ece576040805162461bcd60e51b8152602060048201819052602482015260008051602061203f833981519152604482015290519081900360640190fd5b6001600160a01b038216610f135760405162461bcd60e51b8152600401808060200182810382526023815260200180611f7a6023913960400191505060405180910390fd5b6107cd600783611a26565b6000610f2861143b565b6000546001600160a01b03908116911614610f78576040805162461bcd60e51b8152602060048201819052602482015260008051602061203f833981519152604482015290519081900360640190fd5b6107c9610f8361143b565b83611729565b60006107c9610f9661143b565b8461092e856040518060600160405280602581526020016120a86025913960026000610fc061143b565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190611692565b60006107c9610ffe61143b565b8484611540565b60006107cd600783611a3b565b6001600160a01b0381166000908152600b602052604081205463ffffffff168061103d57600061106f565b6001600160a01b0383166000908152600a6020908152604080832063ffffffff60001986011684529091529020600101545b9392505050565b60007f8cad95687ba82c2ce50e74f7b754645e5117c3a5bec8151c0726d5857980a8666110a161071f565b805190602001206110b0611a50565b60408051602080820195909552808201939093526060830191909152306080808401919091528151808403909101815260a0830182528051908401207fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf60c08401526001600160a01b038b1660e084015261010083018a90526101208084018a9052825180850390910181526101408401835280519085012061190160f01b6101608501526101628401829052610182808501829052835180860390910181526101a285018085528151918701919091206000918290526101c2860180865281905260ff8b166101e287015261020286018a90526102228601899052935192965090949293909260019261024280840193601f198301929081900390910190855afa1580156111e3573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166112355760405162461bcd60e51b8152600401808060200182810382526025815260200180611ec36025913960400191505060405180910390fd5b6001600160a01b0381166000908152600c6020526040902080546001810190915589146112935760405162461bcd60e51b8152600401808060200182810382526021815260200180611fc56021913960400191505060405180910390fd5b874211156112d25760405162461bcd60e51b81526004018080602001828103825260258152602001806120cd6025913960400191505060405180910390fd5b6112dc818b611991565b505050505b505050505050565b6b024306c4097859c43c00000090565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b7fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf81565b600a6020908152600092835260408084209091529082529020805460019091015463ffffffff9091169082565b61137d61143b565b6000546001600160a01b039081169116146113cd576040805162461bcd60e51b8152602060048201819052602482015260008051602061203f833981519152604482015290519081900360640190fd5b610b0c81611a54565b60008282018381101561106f576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b60006107cd82611af4565b3390565b6001600160a01b0383166114845760405162461bcd60e51b8152600401808060200182810382526024815260200180611f0d6024913960400191505060405180910390fd5b6001600160a01b0382166114c95760405162461bcd60e51b81526004018080602001828103825260228152602001806120f26022913960400191505060405180910390fd5b6001600160a01b03808416600081815260026020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b600061106f836001600160a01b038416611af8565b6001600160a01b0383166115855760405162461bcd60e51b8152600401808060200182810382526025815260200180611ee86025913960400191505060405180910390fd5b6001600160a01b0382166115ca5760405162461bcd60e51b81526004018080602001828103825260238152602001806120856023913960400191505060405180910390fd5b6116078160405180606001604052806026815260200161205f602691396001600160a01b0386166000908152600160205260409020549190611692565b6001600160a01b03808516600090815260016020526040808220939093559084168152205461163690826113d6565b6001600160a01b0380841660008181526001602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600081848411156117215760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156116e65781810151838201526020016116ce565b50505050905090810190601f1680156117135780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b60006001600160a01b038316611786576040805162461bcd60e51b815260206004820152601f60248201527f42455032303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6b024306c4097859c43c0000006117a8600354846113d690919063ffffffff16565b11156117b6575060006107cd565b6003546117c390836113d6565b6003556001600160a01b0383166000908152600160205260409020546117e990836113d6565b6001600160a01b03841660008181526001602090815260408083209490945583518681529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a392915050565b816001600160a01b0316836001600160a01b0316141580156118655750600081115b15611980576001600160a01b038316156118f7576001600160a01b0383166000908152600b602052604081205463ffffffff1690816118a55760006118d7565b6001600160a01b0385166000908152600a6020908152604080832063ffffffff60001987011684529091529020600101545b905060006118e58285611bbe565b90506118f386848484611c00565b5050505b6001600160a01b03821615611980576001600160a01b0382166000908152600b602052604081205463ffffffff169081611932576000611964565b6001600160a01b0384166000908152600a6020908152604080832063ffffffff60001987011684529091529020600101545b9050600061197282856113d6565b90506112e185848484611c00565b505050565b600061106f8383611d65565b6001600160a01b03808316600090815260096020526040812054909116906119b884610b27565b6001600160a01b0385811660008181526009602052604080822080546001600160a01b031916898616908117909155905194955093928616927f3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f9190a4611a20828483611843565b50505050565b600061106f836001600160a01b038416611dc9565b600061106f836001600160a01b038416611e13565b4690565b6001600160a01b038116611a995760405162461bcd60e51b8152600401808060200182810382526026815260200180611f316026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b5490565b60008181526001830160205260408120548015611bb45783546000198083019190810190600090879083908110611b2b57fe5b9060005260206000200154905080876000018481548110611b4857fe5b600091825260208083209091019290925582815260018981019092526040902090840190558654879080611b7857fe5b600190038181906000526020600020016000905590558660010160008781526020019081526020016000206000905560019450505050506107cd565b60009150506107cd565b600061106f83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250611692565b6000611c244360405180606001604052806033815260200161200c60339139611e2b565b905060008463ffffffff16118015611c6d57506001600160a01b0385166000908152600a6020908152604080832063ffffffff6000198901811685529252909120548282169116145b15611caa576001600160a01b0385166000908152600a6020908152604080832063ffffffff60001989011684529091529020600101829055611d1b565b60408051808201825263ffffffff808416825260208083018681526001600160a01b038a166000818152600a84528681208b8616825284528681209551865490861663ffffffff199182161787559251600196870155908152600b9092529390208054928801909116919092161790555b604080518481526020810184905281516001600160a01b038816927fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724928290030190a25050505050565b81546000908210611da75760405162461bcd60e51b8152600401808060200182810382526022815260200180611ea16022913960400191505060405180910390fd5b826000018281548110611db657fe5b9060005260206000200154905092915050565b6000611dd58383611e13565b611e0b575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556107cd565b5060006107cd565b60009081526001919091016020526040902054151590565b6000816401000000008410611e815760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156116e65781810151838201526020016116ce565b509192915050565b60408051808201909152600080825260208201529056fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e64734253573a3a64656c656761746542795369673a20696e76616c6964207369676e617475726542455032303a207472616e736665722066726f6d20746865207a65726f206164647265737342455032303a20617070726f76652066726f6d20746865207a65726f20616464726573734f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734253573a205f64656c4d696e74657220697320746865207a65726f20616464726573734253573a205f6164644d696e74657220697320746865207a65726f206164647265737342455032303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e63654253573a3a64656c656761746542795369673a20696e76616c6964206e6f6e63654253573a3a6765745072696f72566f7465733a206e6f74207965742064657465726d696e65644253573a3a5f7772697465436865636b706f696e743a20626c6f636b206e756d626572206578636565647320333220626974734f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657242455032303a207472616e7366657220616d6f756e7420657863656564732062616c616e636542455032303a207472616e7366657220746f20746865207a65726f206164647265737342455032303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f4253573a3a64656c656761746542795369673a207369676e6174757265206578706972656442455032303a20617070726f766520746f20746865207a65726f2061646472657373a2646970667358221220192f4780269dfd99ff1ff5908d85d08ece995ac76f76006ec8edf5425fa6e37c64736f6c634300060c0033";

type BSWTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BSWTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BSWToken__factory extends ContractFactory {
  constructor(...args: BSWTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "BSWToken";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BSWToken> {
    return super.deploy(overrides || {}) as Promise<BSWToken>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BSWToken {
    return super.attach(address) as BSWToken;
  }
  connect(signer: Signer): BSWToken__factory {
    return super.connect(signer) as BSWToken__factory;
  }
  static readonly contractName: "BSWToken";
  public readonly contractName: "BSWToken";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BSWTokenInterface {
    return new utils.Interface(_abi) as BSWTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BSWToken {
    return new Contract(address, _abi, signerOrProvider) as BSWToken;
  }
}
