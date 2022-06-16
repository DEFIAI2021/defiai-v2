/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { CakeToken, CakeTokenInterface } from "../CakeToken";

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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "devMint",
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
    outputs: [],
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
  "0x60806040523480156200001157600080fd5b50604051806040016040528060118152602001702830b731b0b5b2a9bbb0b8102a37b5b2b760791b8152506040518060400160405280600481526020016343616b6560e01b81525060006200006b620000f660201b60201c565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3508151620000ca906006906020850190620000fa565b508051620000e0906005906020840190620000fa565b50506004805460ff191660121790555062000196565b3390565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200013d57805160ff19168380011785556200016d565b828001600101855582156200016d579182015b828111156200016d57825182559160200191906001019062000150565b506200017b9291506200017f565b5090565b5b808211156200017b576000815560010162000180565b611be480620001a66000396000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c8063782d6fe1116100f9578063a9059cbb11610097578063dd62ed3e11610071578063dd62ed3e14610594578063e7a324dc146105c2578063f1127ed8146105ca578063f2fde38b1461061c576101c4565b8063a9059cbb146104fb578063b4b5ea5714610527578063c3cda5201461054d576101c4565b80638da5cb5b116100d35780638da5cb5b146104a257806395d89b41146104aa578063a0712d68146104b2578063a457c2d7146104cf576101c4565b8063782d6fe1146104485780637ecebe0014610474578063893d20e81461049a576101c4565b806339509351116101665780635c19a95c116101405780635c19a95c146103b55780636fcfff45146103db57806370a082311461041a578063715018a614610440576101c4565b8063395093511461031b57806340c10f1914610347578063587cde1e14610373576101c4565b806320606b70116101a257806320606b70146102a057806323b872dd146102a8578063313ce567146102de578063375a069a146102fc576101c4565b806306fdde03146101c9578063095ea7b31461024657806318160ddd14610286575b600080fd5b6101d1610642565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561020b5781810151838201526020016101f3565b50505050905090810190601f1680156102385780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102726004803603604081101561025c57600080fd5b506001600160a01b0381351690602001356106d8565b604080519115158252519081900360200190f35b61028e6106f6565b60408051918252519081900360200190f35b61028e6106fc565b610272600480360360608110156102be57600080fd5b506001600160a01b03813581169160208101359091169060400135610720565b6102e66107a7565b6040805160ff9092168252519081900360200190f35b6103196004803603602081101561031257600080fd5b50356107b0565b005b6102726004803603604081101561033157600080fd5b506001600160a01b0381351690602001356107bd565b6103196004803603604081101561035d57600080fd5b506001600160a01b03813516906020013561080b565b6103996004803603602081101561038957600080fd5b50356001600160a01b03166108a0565b604080516001600160a01b039092168252519081900360200190f35b610319600480360360208110156103cb57600080fd5b50356001600160a01b03166108be565b610401600480360360208110156103f157600080fd5b50356001600160a01b03166108c8565b6040805163ffffffff9092168252519081900360200190f35b61028e6004803603602081101561043057600080fd5b50356001600160a01b03166108e0565b6103196108fb565b61028e6004803603604081101561045e57600080fd5b506001600160a01b0381351690602001356109a7565b61028e6004803603602081101561048a57600080fd5b50356001600160a01b0316610baf565b610399610bc1565b610399610bd0565b6101d1610bdf565b610272600480360360208110156104c857600080fd5b5035610c40565b610272600480360360408110156104e557600080fd5b506001600160a01b038135169060200135610cbd565b6102726004803603604081101561051157600080fd5b506001600160a01b038135169060200135610d25565b61028e6004803603602081101561053d57600080fd5b50356001600160a01b0316610d39565b610319600480360360c081101561056357600080fd5b506001600160a01b038135169060208101359060408101359060ff6060820135169060808101359060a00135610d9d565b61028e600480360360408110156105aa57600080fd5b506001600160a01b0381358116916020013516611010565b61028e61103b565b6105fc600480360360408110156105e057600080fd5b5080356001600160a01b0316906020013563ffffffff1661105f565b6040805163ffffffff909316835260208301919091528051918290030190f35b6103196004803603602081101561063257600080fd5b50356001600160a01b031661108c565b60068054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156106ce5780601f106106a3576101008083540402835291602001916106ce565b820191906000526020600020905b8154815290600101906020018083116106b157829003601f168201915b5050505050905090565b60006106ec6106e561118e565b8484611192565b5060015b92915050565b60035490565b7f8cad95687ba82c2ce50e74f7b754645e5117c3a5bec8151c0726d5857980a86681565b600061072d84848461127e565b61079d8461073961118e565b61079885604051806060016040528060288152602001611a34602891396001600160a01b038a1660009081526002602052604081209061077761118e565b6001600160a01b0316815260208101919091526040016000205491906113d0565b611192565b5060019392505050565b60045460ff1690565b6107ba3382611467565b50565b60006106ec6107ca61118e565b8461079885600260006107db61118e565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549061154d565b61081361118e565b6001600160a01b0316610824610bd0565b6001600160a01b03161461086d576040805162461bcd60e51b81526020600482018190526024820152600080516020611a82833981519152604482015290519081900360640190fd5b6108778282611467565b6001600160a01b0380831660009081526007602052604081205461089c9216836115a7565b5050565b6001600160a01b039081166000908152600760205260409020541690565b6107ba33826116e9565b60096020526000908152604090205463ffffffff1681565b6001600160a01b031660009081526001602052604090205490565b61090361118e565b6001600160a01b0316610914610bd0565b6001600160a01b03161461095d576040805162461bcd60e51b81526020600482018190526024820152600080516020611a82833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b60004382106109e75760405162461bcd60e51b8152600401808060200182810382526027815260200180611ad66027913960400191505060405180910390fd5b6001600160a01b03831660009081526009602052604090205463ffffffff1680610a155760009150506106f0565b6001600160a01b038416600090815260086020908152604080832063ffffffff600019860181168552925290912054168310610a84576001600160a01b03841660009081526008602090815260408083206000199490940163ffffffff168352929052206001015490506106f0565b6001600160a01b038416600090815260086020908152604080832083805290915290205463ffffffff16831015610abf5760009150506106f0565b600060001982015b8163ffffffff168163ffffffff161115610b7857600282820363ffffffff16048103610af1611987565b506001600160a01b038716600090815260086020908152604080832063ffffffff808616855290835292819020815180830190925280549093168082526001909301549181019190915290871415610b53576020015194506106f09350505050565b805163ffffffff16871115610b6a57819350610b71565b6001820392505b5050610ac7565b506001600160a01b038516600090815260086020908152604080832063ffffffff9094168352929052206001015491505092915050565b600a6020526000908152604090205481565b6000610bcb610bd0565b905090565b6000546001600160a01b031690565b60058054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156106ce5780601f106106a3576101008083540402835291602001916106ce565b6000610c4a61118e565b6001600160a01b0316610c5b610bd0565b6001600160a01b031614610ca4576040805162461bcd60e51b81526020600482018190526024820152600080516020611a82833981519152604482015290519081900360640190fd5b610cb5610caf61118e565b83611467565b506001919050565b60006106ec610cca61118e565b8461079885604051806060016040528060258152602001611b686025913960026000610cf461118e565b6001600160a01b03908116825260208083019390935260409182016000908120918d168152925290205491906113d0565b60006106ec610d3261118e565b848461127e565b6001600160a01b03811660009081526009602052604081205463ffffffff1680610d64576000610d96565b6001600160a01b038316600090815260086020908152604080832063ffffffff60001986011684529091529020600101545b9392505050565b60007f8cad95687ba82c2ce50e74f7b754645e5117c3a5bec8151c0726d5857980a866610dc8610642565b80519060200120610dd761177e565b60408051602080820195909552808201939093526060830191909152306080808401919091528151808403909101815260a0830182528051908401207fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf60c08401526001600160a01b038b1660e084015261010083018a90526101208084018a9052825180850390910181526101408401835280519085012061190160f01b6101608501526101628401829052610182808501829052835180860390910181526101a285018085528151918701919091206000918290526101c2860180865281905260ff8b166101e287015261020286018a90526102228601899052935192965090949293909260019261024280840193601f198301929081900390910190855afa158015610f0a573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610f5c5760405162461bcd60e51b8152600401808060200182810382526026815260200180611a5c6026913960400191505060405180910390fd5b6001600160a01b0381166000908152600a602052604090208054600181019091558914610fba5760405162461bcd60e51b8152600401808060200182810382526022815260200180611b236022913960400191505060405180910390fd5b87421115610ff95760405162461bcd60e51b8152600401808060200182810382526026815260200180611a0e6026913960400191505060405180910390fd5b611003818b6116e9565b505050505b505050505050565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b7fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf81565b60086020908152600092835260408084209091529082529020805460019091015463ffffffff9091169082565b61109461118e565b6001600160a01b03166110a5610bd0565b6001600160a01b0316146110ee576040805162461bcd60e51b81526020600482018190526024820152600080516020611a82833981519152604482015290519081900360640190fd5b6001600160a01b0381166111335760405162461bcd60e51b81526004018080602001828103825260268152602001806119e86026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b3390565b6001600160a01b0383166111d75760405162461bcd60e51b81526004018080602001828103825260248152602001806119c46024913960400191505060405180910390fd5b6001600160a01b03821661121c5760405162461bcd60e51b8152600401808060200182810382526022815260200180611b8d6022913960400191505060405180910390fd5b6001600160a01b03808416600081815260026020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b0383166112c35760405162461bcd60e51b815260040180806020018281038252602581526020018061199f6025913960400191505060405180910390fd5b6001600160a01b0382166113085760405162461bcd60e51b8152600401808060200182810382526023815260200180611b456023913960400191505060405180910390fd5b61134581604051806060016040528060268152602001611afd602691396001600160a01b03861660009081526001602052604090205491906113d0565b6001600160a01b038085166000908152600160205260408082209390935590841681522054611374908261154d565b6001600160a01b0380841660008181526001602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b6000818484111561145f5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561142457818101518382015260200161140c565b50505050905090810190601f1680156114515780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6001600160a01b0382166114c2576040805162461bcd60e51b815260206004820152601f60248201527f42455032303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6003546114cf908261154d565b6003556001600160a01b0382166000908152600160205260409020546114f5908261154d565b6001600160a01b03831660008181526001602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b600082820183811015610d96576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b816001600160a01b0316836001600160a01b0316141580156115c95750600081115b156116e4576001600160a01b0383161561165b576001600160a01b03831660009081526009602052604081205463ffffffff16908161160957600061163b565b6001600160a01b038516600090815260086020908152604080832063ffffffff60001987011684529091529020600101545b905060006116498285611782565b9050611657868484846117c4565b5050505b6001600160a01b038216156116e4576001600160a01b03821660009081526009602052604081205463ffffffff1690816116965760006116c8565b6001600160a01b038416600090815260086020908152604080832063ffffffff60001987011684529091529020600101545b905060006116d6828561154d565b9050611008858484846117c4565b505050565b6001600160a01b0380831660009081526007602052604081205490911690611710846108e0565b6001600160a01b0385811660008181526007602052604080822080546001600160a01b031916898616908117909155905194955093928616927f3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f9190a46117788284836115a7565b50505050565b4690565b6000610d9683836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506113d0565b60006117e843604051806060016040528060348152602001611aa260349139611929565b905060008463ffffffff1611801561183157506001600160a01b038516600090815260086020908152604080832063ffffffff6000198901811685529252909120548282169116145b1561186e576001600160a01b038516600090815260086020908152604080832063ffffffff600019890116845290915290206001018290556118df565b60408051808201825263ffffffff808416825260208083018681526001600160a01b038a166000818152600884528681208b8616825284528681209551865490861663ffffffff19918216178755925160019687015590815260099092529390208054928801909116919092161790555b604080518481526020810184905281516001600160a01b038816927fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724928290030190a25050505050565b600081640100000000841061197f5760405162461bcd60e51b815260206004820181815283516024840152835190928392604490910191908501908083836000831561142457818101518382015260200161140c565b509192915050565b60408051808201909152600080825260208201529056fe42455032303a207472616e736665722066726f6d20746865207a65726f206164647265737342455032303a20617070726f76652066726f6d20746865207a65726f20616464726573734f776e61626c653a206e6577206f776e657220697320746865207a65726f206164647265737343414b453a3a64656c656761746542795369673a207369676e6174757265206578706972656442455032303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636543414b453a3a64656c656761746542795369673a20696e76616c6964207369676e61747572654f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657243414b453a3a5f7772697465436865636b706f696e743a20626c6f636b206e756d6265722065786365656473203332206269747343414b453a3a6765745072696f72566f7465733a206e6f74207965742064657465726d696e656442455032303a207472616e7366657220616d6f756e7420657863656564732062616c616e636543414b453a3a64656c656761746542795369673a20696e76616c6964206e6f6e636542455032303a207472616e7366657220746f20746865207a65726f206164647265737342455032303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f42455032303a20617070726f766520746f20746865207a65726f2061646472657373a264697066735822122076576d2b61bd6c76612cf723290321fbbb68c02b45af9b20a04264491aa0f29064736f6c634300060c0033";

type CakeTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CakeTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CakeToken__factory extends ContractFactory {
  constructor(...args: CakeTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "CakeToken";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CakeToken> {
    return super.deploy(overrides || {}) as Promise<CakeToken>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): CakeToken {
    return super.attach(address) as CakeToken;
  }
  connect(signer: Signer): CakeToken__factory {
    return super.connect(signer) as CakeToken__factory;
  }
  static readonly contractName: "CakeToken";
  public readonly contractName: "CakeToken";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CakeTokenInterface {
    return new utils.Interface(_abi) as CakeTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CakeToken {
    return new Contract(address, _abi, signerOrProvider) as CakeToken;
  }
}