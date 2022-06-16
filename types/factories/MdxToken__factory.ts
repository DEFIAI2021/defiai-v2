/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MdxToken, MdxTokenInterface } from "../MdxToken";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
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
  "0x60806040523480156200001157600080fd5b506040518060400160405280600981526020016826a22c102a37b5b2b760b91b8152506040518060400160405280600381526020016209a88b60eb1b815250816003908051906020019062000068929190620005f1565b5080516200007e906004906020840190620005f1565b50506005805460ff191660121790555060006200009a62000105565b600a80546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350620000ff336a01a784379d99db4200000062000109565b62000768565b3390565b6200012082826200014b60201b62000ebf1760201c565b6001600160a01b038083166000908152600660205260408120546200014792168362000237565b5050565b6001600160a01b0382166200017d5760405162461bcd60e51b815260040162000174906200071a565b60405180910390fd5b6200018b60008383620003a4565b620001a781600254620003a960201b62000f7f1790919060201c565b6002556001600160a01b03821660009081526020818152604090912054620001da91839062000f7f620003a9821b17901c565b6001600160a01b0383166000818152602081905260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906200022b90859062000751565b60405180910390a35050565b816001600160a01b0316836001600160a01b0316141580156200025a5750600081115b15620003a4576001600160a01b0383161562000302576001600160a01b03831660009081526008602052604081205463ffffffff1690816200029e576000620002d0565b6001600160a01b038516600090815260076020908152604080832063ffffffff60001987011684529091529020600101545b90506000620002ee8483620003d860201b62000fa41790919060201c565b9050620002fe8684848462000422565b5050505b6001600160a01b03821615620003a4576001600160a01b03821660009081526008602052604081205463ffffffff1690816200034057600062000372565b6001600160a01b038416600090815260076020908152604080832063ffffffff60001987011684529091529020600101545b90506000620003908483620003a960201b62000f7f1790919060201c565b9050620003a08584848462000422565b5050505b505050565b600082820183811015620003d15760405162461bcd60e51b81526004016200017490620006e3565b9392505050565b6000620003d183836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506200058f60201b60201c565b600062000449436040518060600160405280603881526020016200274960389139620005be565b905060008463ffffffff161180156200049357506001600160a01b038516600090815260076020908152604080832063ffffffff6000198901811685529252909120548282169116145b15620004d2576001600160a01b038516600090815260076020908152604080832063ffffffff6000198901168452909152902060010182905562000543565b60408051808201825263ffffffff808416825260208083018681526001600160a01b038a166000818152600784528681208b8616825284528681209551865490861663ffffffff19918216178755925160019687015590815260089092529390208054928801909116919092161790555b846001600160a01b03167fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a7248484604051620005809291906200075a565b60405180910390a25050505050565b60008184841115620005b65760405162461bcd60e51b81526004016200017491906200068d565b505050900390565b6000816401000000008410620005e95760405162461bcd60e51b81526004016200017491906200068d565b509192915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200063457805160ff191683800117855562000664565b8280016001018555821562000664579182015b828111156200066457825182559160200191906001019062000647565b506200067292915062000676565b5090565b5b8082111562000672576000815560010162000677565b6000602080835283518082850152825b81811015620006bb578581018301518582016040015282016200069d565b81811115620006cd5783604083870101525b50601f01601f1916929092016040019392505050565b6020808252601b908201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604082015260600190565b6020808252601f908201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604082015260600190565b90815260200190565b918252602082015260400190565b611fd180620007786000396000f3fe608060405234801561001057600080fd5b50600436106101cf5760003560e01c8063715018a611610104578063a9059cbb116100a2578063dd62ed3e11610071578063dd62ed3e146103b0578063e7a324dc146103c3578063f1127ed8146103cb578063f2fde38b146103ec576101cf565b8063a9059cbb14610364578063aa271e1a14610377578063b4b5ea571461038a578063c3cda5201461039d576101cf565b80638da5cb5b116100de5780638da5cb5b1461032e57806395d89b4114610336578063983b2d561461033e578063a457c2d714610351576101cf565b8063715018a614610300578063782d6fe1146103085780637ecebe001461031b576101cf565b8063313ce567116101715780635b7121f81161014b5780635b7121f8146102985780635c19a95c146102b85780636fcfff45146102cd57806370a08231146102ed576101cf565b8063313ce5671461025d578063395093511461027257806340c10f1914610285576101cf565b806318160ddd116101ad57806318160ddd1461022757806320606b701461022f57806323338b881461023757806323b872dd1461024a576101cf565b80630323aac7146101d457806306fdde03146101f2578063095ea7b314610207575b600080fd5b6101dc6103ff565b6040516101e9919061197a565b60405180910390f35b6101fa610410565b6040516101e991906119e9565b61021a610215366004611860565b6104a6565b6040516101e9919061196f565b6101dc6104c4565b6101dc6104ca565b61021a6102453660046117d1565b6104ee565b61021a610258366004611820565b610569565b6102656105f0565b6040516101e99190611ecd565b61021a610280366004611860565b6105f9565b61021a610293366004611860565b610647565b6102ab6102a6366004611928565b6106a5565b6040516101e9919061195b565b6102cb6102c63660046117d1565b61071b565b005b6102e06102db3660046117d1565b610728565b6040516101e99190611ea6565b6101dc6102fb3660046117d1565b610740565b6102cb61075b565b6101dc610316366004611860565b6107e4565b6101dc6103293660046117d1565b6109cd565b6102ab6109df565b6101fa6109ee565b61021a61034c3660046117d1565b610a4f565b61021a61035f366004611860565b610ac1565b61021a610372366004611860565b610b29565b61021a6103853660046117d1565b610b3d565b6101dc6103983660046117d1565b610b4a565b6102cb6103ab36600461188a565b610bae565b6101dc6103be3660046117ec565b610d82565b6101dc610dad565b6103de6103d93660046118e9565b610dd1565b6040516101e9929190611eb7565b6102cb6103fa3660046117d1565b610dfe565b600061040b600b610fe6565b905090565b60038054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561049c5780601f106104715761010080835404028352916020019161049c565b820191906000526020600020905b81548152906001019060200180831161047f57829003601f168201915b5050505050905090565b60006104ba6104b3610ff1565b8484610ff5565b5060015b92915050565b60025490565b7f8cad95687ba82c2ce50e74f7b754645e5117c3a5bec8151c0726d5857980a86681565b60006104f8610ff1565b6001600160a01b03166105096109df565b6001600160a01b0316146105385760405162461bcd60e51b815260040161052f90611d5b565b60405180910390fd5b6001600160a01b03821661055e5760405162461bcd60e51b815260040161052f90611dd5565b6104be600b836110a9565b60006105768484846110be565b6105e684610582610ff1565b6105e185604051806060016040528060288152602001611f4f602891396001600160a01b038a166000908152600160205260408120906105c0610ff1565b6001600160a01b031681526020810191909152604001600020549190611100565b610ff5565b5060019392505050565b60055460ff1690565b60006104ba610606610ff1565b846105e18560016000610617610ff1565b6001600160a01b03908116825260208083019390935260409182016000908120918c168152925290205490610f7f565b600061065233610b3d565b61066e5760405162461bcd60e51b815260040161052f90611ced565b6b011bb76193c72433c200000061068d6106866104c4565b8490610f7f565b111561069b575060006104be565b6104ba838361112c565b60006106af610ff1565b6001600160a01b03166106c06109df565b6001600160a01b0316146106e65760405162461bcd60e51b815260040161052f90611d5b565b60016106f06103ff565b038211156107105760405162461bcd60e51b815260040161052f90611d24565b6104be600b8361115f565b610725338261116b565b50565b60086020526000908152604090205463ffffffff1681565b6001600160a01b031660009081526020819052604090205490565b610763610ff1565b6001600160a01b03166107746109df565b6001600160a01b03161461079a5760405162461bcd60e51b815260040161052f90611d5b565b600a546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600a80546001600160a01b0319169055565b60004382106108055760405162461bcd60e51b815260040161052f90611bdb565b6001600160a01b03831660009081526008602052604090205463ffffffff16806108335760009150506104be565b6001600160a01b038416600090815260076020908152604080832063ffffffff6000198601811685529252909120541683106108a2576001600160a01b03841660009081526007602090815260408083206000199490940163ffffffff168352929052206001015490506104be565b6001600160a01b038416600090815260076020908152604080832083805290915290205463ffffffff168310156108dd5760009150506104be565b600060001982015b8163ffffffff168163ffffffff16111561099657600282820363ffffffff1604810361090f6117a3565b506001600160a01b038716600090815260076020908152604080832063ffffffff808616855290835292819020815180830190925280549093168082526001909301549181019190915290871415610971576020015194506104be9350505050565b805163ffffffff168711156109885781935061098f565b6001820392505b50506108e5565b506001600160a01b038516600090815260076020908152604080832063ffffffff9094168352929052206001015491505092915050565b60096020526000908152604090205481565b600a546001600160a01b031690565b60048054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561049c5780601f106104715761010080835404028352916020019161049c565b6000610a59610ff1565b6001600160a01b0316610a6a6109df565b6001600160a01b031614610a905760405162461bcd60e51b815260040161052f90611d5b565b6001600160a01b038216610ab65760405162461bcd60e51b815260040161052f90611b0b565b6104be600b8361121d565b60006104ba610ace610ff1565b846105e185604051806060016040528060258152602001611f776025913960016000610af8610ff1565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190611100565b60006104ba610b36610ff1565b84846110be565b60006104be600b83611232565b6001600160a01b03811660009081526008602052604081205463ffffffff1680610b75576000610ba7565b6001600160a01b038316600090815260076020908152604080832063ffffffff60001986011684529091529020600101545b9392505050565b60007f8cad95687ba82c2ce50e74f7b754645e5117c3a5bec8151c0726d5857980a866610bd9610410565b80519060200120610be8611247565b30604051602001610bfc94939291906119a7565b60405160208183030381529060405280519060200120905060007fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf888888604051602001610c4d9493929190611983565b60405160208183030381529060405280519060200120905060008282604051602001610c7a929190611940565b604051602081830303815290604052805190602001209050600060018288888860405160008152602001604052604051610cb794939291906119cb565b6020604051602081039080840390855afa158015610cd9573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610d0c5760405162461bcd60e51b815260040161052f90611c5d565b6001600160a01b03811660009081526009602052604090208054600181019091558914610d4b5760405162461bcd60e51b815260040161052f90611ca7565b87421115610d6b5760405162461bcd60e51b815260040161052f90611ac1565b610d75818b61116b565b505050505b505050505050565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b7fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf81565b60076020908152600092835260408084209091529082529020805460019091015463ffffffff9091169082565b610e06610ff1565b6001600160a01b0316610e176109df565b6001600160a01b031614610e3d5760405162461bcd60e51b815260040161052f90611d5b565b6001600160a01b038116610e635760405162461bcd60e51b815260040161052f90611b53565b600a546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600a80546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b038216610ee55760405162461bcd60e51b815260040161052f90611e61565b610ef1600083836110fb565b600254610efe9082610f7f565b6002556001600160a01b038216600090815260208190526040902054610f249082610f7f565b6001600160a01b0383166000818152602081905260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610f7390859061197a565b60405180910390a35050565b600082820183811015610ba75760405162461bcd60e51b815260040161052f90611c26565b6000610ba783836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250611100565b60006104be8261124b565b3390565b6001600160a01b03831661101b5760405162461bcd60e51b815260040161052f90611e1d565b6001600160a01b0382166110415760405162461bcd60e51b815260040161052f90611b99565b6001600160a01b0380841660008181526001602090815260408083209487168084529490915290819020849055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259061109c90859061197a565b60405180910390a3505050565b6000610ba7836001600160a01b03841661124f565b6110c9838383611315565b6001600160a01b038084166000908152600660205260408082205485841683529120546110fb9291821691168361142a565b505050565b600081848411156111245760405162461bcd60e51b815260040161052f91906119e9565b505050900390565b6111368282610ebf565b6001600160a01b0380831660009081526006602052604081205461115b92168361142a565b5050565b6000610ba78383611567565b6001600160a01b038083166000908152600660205260408120549091169061119284610740565b6001600160a01b03858116600090815260066020526040902080546001600160a01b03191691861691909117905590506111cd82848361142a565b826001600160a01b0316826001600160a01b0316856001600160a01b03167f3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f60405160405180910390a450505050565b6000610ba7836001600160a01b0384166115ac565b6000610ba7836001600160a01b0384166115f6565b4690565b5490565b6000818152600183016020526040812054801561130b578354600019808301919081019060009087908390811061128257fe5b906000526020600020015490508087600001848154811061129f57fe5b6000918252602080832090910192909255828152600189810190925260409020908401905586548790806112cf57fe5b600190038181906000526020600020016000905590558660010160008781526020019081526020016000206000905560019450505050506104be565b60009150506104be565b6001600160a01b03831661133b5760405162461bcd60e51b815260040161052f90611d90565b6001600160a01b0382166113615760405162461bcd60e51b815260040161052f90611a7e565b61136c8383836110fb565b6113a981604051806060016040528060268152602001611f29602691396001600160a01b0386166000908152602081905260409020549190611100565b6001600160a01b0380851660009081526020819052604080822093909355908416815220546113d89082610f7f565b6001600160a01b0380841660008181526020819052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061109c90859061197a565b816001600160a01b0316836001600160a01b03161415801561144c5750600081115b156110fb576001600160a01b038316156114de576001600160a01b03831660009081526008602052604081205463ffffffff16908161148c5760006114be565b6001600160a01b038516600090815260076020908152604080832063ffffffff60001987011684529091529020600101545b905060006114cc8285610fa4565b90506114da8684848461160e565b5050505b6001600160a01b038216156110fb576001600160a01b03821660009081526008602052604081205463ffffffff16908161151957600061154b565b6001600160a01b038416600090815260076020908152604080832063ffffffff60001987011684529091529020600101545b905060006115598285610f7f565b9050610d7a8584848461160e565b8154600090821061158a5760405162461bcd60e51b815260040161052f90611a3c565b82600001828154811061159957fe5b9060005260206000200154905092915050565b60006115b883836115f6565b6115ee575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556104be565b5060006104be565b60009081526001919091016020526040902054151590565b600061163243604051806060016040528060388152602001611ef160389139611773565b905060008463ffffffff1611801561167b57506001600160a01b038516600090815260076020908152604080832063ffffffff6000198901811685529252909120548282169116145b156116b8576001600160a01b038516600090815260076020908152604080832063ffffffff60001989011684529091529020600101829055611729565b60408051808201825263ffffffff808416825260208083018681526001600160a01b038a166000818152600784528681208b8616825284528681209551865490861663ffffffff19918216178755925160019687015590815260089092529390208054928801909116919092161790555b846001600160a01b03167fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a7248484604051611764929190611e98565b60405180910390a25050505050565b600081640100000000841061179b5760405162461bcd60e51b815260040161052f91906119e9565b509192915050565b604080518082019091526000808252602082015290565b80356001600160a01b03811681146104be57600080fd5b6000602082840312156117e2578081fd5b610ba783836117ba565b600080604083850312156117fe578081fd5b61180884846117ba565b915061181784602085016117ba565b90509250929050565b600080600060608486031215611834578081fd5b833561183f81611edb565b9250602084013561184f81611edb565b929592945050506040919091013590565b60008060408385031215611872578182fd5b61187c84846117ba565b946020939093013593505050565b60008060008060008060c087890312156118a2578182fd5b6118ac88886117ba565b95506020870135945060408701359350606087013560ff811681146118cf578283fd5b9598949750929560808101359460a0909101359350915050565b600080604083850312156118fb578182fd5b61190584846117ba565b9150602083013563ffffffff8116811461191d578182fd5b809150509250929050565b600060208284031215611939578081fd5b5035919050565b61190160f01b81526002810192909252602282015260420190565b6001600160a01b0391909116815260200190565b901515815260200190565b90815260200190565b9384526001600160a01b039290921660208401526040830152606082015260800190565b938452602084019290925260408301526001600160a01b0316606082015260800190565b93845260ff9290921660208401526040830152606082015260800190565b6000602080835283518082850152825b81811015611a15578581018301518582016040015282016119f9565b81811115611a265783604083870101525b50601f01601f1916929092016040019392505050565b60208082526022908201527f456e756d657261626c655365743a20696e646578206f7574206f6620626f756e604082015261647360f01b606082015260800190565b60208082526023908201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260408201526265737360e81b606082015260800190565b6020808252602a908201527f4d6478546f6b656e3a3a64656c656761746542795369673a207369676e6174756040820152691c9948195e1c1a5c995960b21b606082015260800190565b60208082526028908201527f4d6478546f6b656e3a205f6164644d696e74657220697320746865207a65726f604082015267206164647265737360c01b606082015260800190565b60208082526026908201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160408201526564647265737360d01b606082015260800190565b60208082526022908201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604082015261737360f01b606082015260800190565b6020808252602b908201527f4d6478546f6b656e3a3a6765745072696f72566f7465733a206e6f742079657460408201526a0819195d195c9b5a5b995960aa1b606082015260800190565b6020808252601b908201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604082015260600190565b6020808252602a908201527f4d6478546f6b656e3a3a64656c656761746542795369673a20696e76616c6964604082015269207369676e617475726560b01b606082015260800190565b60208082526026908201527f4d6478546f6b656e3a3a64656c656761746542795369673a20696e76616c6964604082015265206e6f6e636560d01b606082015260800190565b60208082526018908201527f63616c6c6572206973206e6f7420746865206d696e7465720000000000000000604082015260600190565b6020808252601d908201527f4d6478546f6b656e3a20696e646578206f7574206f6620626f756e6473000000604082015260600190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526025908201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604082015264647265737360d81b606082015260800190565b60208082526028908201527f4d6478546f6b656e3a205f64656c4d696e74657220697320746865207a65726f604082015267206164647265737360c01b606082015260800190565b60208082526024908201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646040820152637265737360e01b606082015260800190565b6020808252601f908201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604082015260600190565b918252602082015260400190565b63ffffffff91909116815260200190565b63ffffffff929092168252602082015260400190565b60ff91909116815260200190565b6001600160a01b038116811461072557600080fdfe4d6478546f6b656e3a3a5f7772697465436865636b706f696e743a20626c6f636b206e756d6265722065786365656473203332206269747345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa2646970667358221220e40896552e4ec1a3c7902d874046871cf29f68cc5594842c5b5a3d6c88b4571064736f6c634300060c00334d6478546f6b656e3a3a5f7772697465436865636b706f696e743a20626c6f636b206e756d62657220657863656564732033322062697473";

type MdxTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MdxTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MdxToken__factory extends ContractFactory {
  constructor(...args: MdxTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "MdxToken";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MdxToken> {
    return super.deploy(overrides || {}) as Promise<MdxToken>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MdxToken {
    return super.attach(address) as MdxToken;
  }
  connect(signer: Signer): MdxToken__factory {
    return super.connect(signer) as MdxToken__factory;
  }
  static readonly contractName: "MdxToken";
  public readonly contractName: "MdxToken";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MdxTokenInterface {
    return new utils.Interface(_abi) as MdxTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MdxToken {
    return new Contract(address, _abi, signerOrProvider) as MdxToken;
  }
}