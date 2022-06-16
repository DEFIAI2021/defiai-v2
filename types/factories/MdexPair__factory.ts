/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MdexPair, MdexPairInterface } from "../MdexPair";

const _abi = [
  {
    inputs: [],
    payable: false,
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
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "Burn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "Swap",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve0",
        type: "uint112",
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve1",
        type: "uint112",
      },
    ],
    name: "Sync",
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
    constant: true,
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "MINIMUM_LIQUIDITY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
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
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
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
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
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
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "burn",
    outputs: [
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getReserves",
    outputs: [
      {
        internalType: "uint112",
        name: "_reserve0",
        type: "uint112",
      },
      {
        internalType: "uint112",
        name: "_reserve1",
        type: "uint112",
      },
      {
        internalType: "uint32",
        name: "_blockTimestampLast",
        type: "uint32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token1",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "kLast",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
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
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
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
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
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
    name: "permit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "price0CumulativeLast",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "price1CumulativeLast",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "skim",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "swap",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "sync",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token0",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "token1",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
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
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
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
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526001600c5534801561001557600080fd5b5060405146908060526125de8239604080519182900360520182208282018252600d83526c26a222ac102628102a37b5b2b760991b6020938401528151808301835260018152603160f81b908401528151808401919091527fb85ad0ab12fc9666beeb4154f24feab6f58ff8137a3f14500ba8ae1d38e72118818301527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6606082015260808101949094523060a0808601919091528151808603909101815260c09094019052825192019190912060035550600580546001600160a01b031916331790556124d6806101086000396000f3fe608060405234801561001057600080fd5b50600436106101a95760003560e01c80636a627842116100f9578063ba9a7a5611610097578063d21220a711610071578063d21220a714610534578063d505accf1461053c578063dd62ed3e1461058d578063fff6cae9146105bb576101a9565b8063ba9a7a56146104fe578063bc25cf7714610506578063c45a01551461052c576101a9565b80637ecebe00116100d35780637ecebe001461046557806389afcb441461048b57806395d89b41146104ca578063a9059cbb146104d2576101a9565b80636a6278421461041157806370a08231146104375780637464fc3d1461045d576101a9565b806323b872dd116101665780633644e515116101405780633644e515146103cb578063485cc955146103d35780635909c0d5146104015780635a3d549314610409576101a9565b806323b872dd1461036f57806330adf81f146103a5578063313ce567146103ad576101a9565b8063022c0d9f146101ae57806306fdde031461023c5780630902f1ac146102b9578063095ea7b3146102f15780630dfe16811461033157806318160ddd14610355575b600080fd5b61023a600480360360808110156101c457600080fd5b8135916020810135916001600160a01b0360408301351691908101906080810160608201356401000000008111156101fb57600080fd5b82018360208201111561020d57600080fd5b8035906020019184600183028401116401000000008311171561022f57600080fd5b5090925090506105c3565b005b610244610bcc565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561027e578181015183820152602001610266565b50505050905090810190601f1680156102ab5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102c1610bf5565b604080516001600160701b03948516815292909316602083015263ffffffff168183015290519081900360600190f35b61031d6004803603604081101561030757600080fd5b506001600160a01b038135169060200135610c1f565b604080519115158252519081900360200190f35b610339610c36565b604080516001600160a01b039092168252519081900360200190f35b61035d610c45565b60408051918252519081900360200190f35b61031d6004803603606081101561038557600080fd5b506001600160a01b03813581169160208101359091169060400135610c4b565b61035d610ce5565b6103b5610d09565b6040805160ff9092168252519081900360200190f35b61035d610d0e565b61023a600480360360408110156103e957600080fd5b506001600160a01b0381358116916020013516610d14565b61035d610d97565b61035d610d9d565b61035d6004803603602081101561042757600080fd5b50356001600160a01b0316610da3565b61035d6004803603602081101561044d57600080fd5b50356001600160a01b03166110a2565b61035d6110b4565b61035d6004803603602081101561047b57600080fd5b50356001600160a01b03166110ba565b6104b1600480360360208110156104a157600080fd5b50356001600160a01b03166110cc565b6040805192835260208301919091528051918290030190f35b610244611471565b61031d600480360360408110156104e857600080fd5b506001600160a01b038135169060200135611494565b61035d6114a1565b61023a6004803603602081101561051c57600080fd5b50356001600160a01b03166114a7565b610339611611565b610339611620565b61023a600480360360e081101561055257600080fd5b506001600160a01b03813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c0013561162f565b61035d600480360360408110156105a357600080fd5b506001600160a01b0381358116916020013516611830565b61023a61184d565b600c5460011461060d576040805162461bcd60e51b815260206004820152601060248201526f1359195e14ddd85c0e881313d0d2d15160821b604482015290519081900360640190fd5b6000600c55841515806106205750600084115b61065b5760405162461bcd60e51b81526004018080602001828103825260248152602001806124136024913960400191505060405180910390fd5b600080610666610bf5565b5091509150816001600160701b03168710801561068b5750806001600160701b031686105b6106dc576040805162461bcd60e51b815260206004820181905260248201527f4d646578537761703a20494e53554646494349454e545f4c4951554944495459604482015290519081900360640190fd5b60065460075460009182916001600160a01b0391821691908116908916821480159061071a5750806001600160a01b0316896001600160a01b031614155b610762576040805162461bcd60e51b81526020600482015260146024820152734d646578537761703a20494e56414c49445f544f60601b604482015290519081900360640190fd5b8a1561077357610773828a8d6119ae565b891561078457610784818a8c6119ae565b861561083f57886001600160a01b031663b2ff9f26338d8d8c8c6040518663ffffffff1660e01b815260040180866001600160a01b03166001600160a01b03168152602001858152602001848152602001806020018281038252848482818152602001925080828437600081840152601f19601f8201169050808301925050509650505050505050600060405180830381600087803b15801561082657600080fd5b505af115801561083a573d6000803e3d6000fd5b505050505b604080516370a0823160e01b815230600482015290516001600160a01b038416916370a08231916024808301926020929190829003018186803b15801561088557600080fd5b505afa158015610899573d6000803e3d6000fd5b505050506040513d60208110156108af57600080fd5b5051604080516370a0823160e01b815230600482015290519195506001600160a01b038316916370a0823191602480820192602092909190829003018186803b1580156108fb57600080fd5b505afa15801561090f573d6000803e3d6000fd5b505050506040513d602081101561092557600080fd5b5051925060009150506001600160701b0385168a90038311610948576000610957565b89856001600160701b03160383035b9050600089856001600160701b0316038311610974576000610983565b89856001600160701b03160383035b905060008211806109945750600081115b6109cf5760405162461bcd60e51b81526004018080602001828103825260238152602001806124586023913960400191505060405180910390fd5b60055460408051634c2fc06f60e01b81523060048201529051600092610a7c92610a5e926001600160a01b0390921691634c2fc06f91602480820192602092909190829003018186803b158015610a2557600080fd5b505afa158015610a39573d6000803e3d6000fd5b505050506040513d6020811015610a4f57600080fd5b5051859063ffffffff611b4816565b610a708761271063ffffffff611b4816565b9063ffffffff611ba816565b60055460408051634c2fc06f60e01b81523060048201529051929350600092610ad592610a5e926001600160a01b0390911691634c2fc06f91602480820192602092909190829003018186803b158015610a2557600080fd5b9050610b076305f5e100610afb6001600160701b038b8116908b1663ffffffff611b4816565b9063ffffffff611b4816565b610b17838363ffffffff611b4816565b1015610b58576040805162461bcd60e51b815260206004820152600b60248201526a4d646578537761703a204b60a81b604482015290519081900360640190fd5b5050610b6684848888611bea565b60408051838152602081018390528082018d9052606081018c905290516001600160a01b038b169133917fd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d8229181900360800190a350506001600c55505050505050505050565b6040518060400160405280600d81526020016c26a222ac102628102a37b5b2b760991b81525081565b6008546001600160701b0380821692600160701b830490911691600160e01b900463ffffffff1690565b6000610c2c338484611dae565b5060015b92915050565b6006546001600160a01b031681565b60005481565b6001600160a01b038316600090815260026020908152604080832033845290915281205460001914610cd0576001600160a01b0384166000908152600260209081526040808320338452909152902054610cab908363ffffffff611ba816565b6001600160a01b03851660009081526002602090815260408083203384529091529020555b610cdb848484611e10565b5060019392505050565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b601281565b60035481565b6005546001600160a01b03163314610d69576040805162461bcd60e51b815260206004820152601360248201527226b232bc29bbb0b81d102327a92124a22222a760691b604482015290519081900360640190fd5b600680546001600160a01b039384166001600160a01b03199182161790915560078054929093169116179055565b60095481565b600a5481565b6000600c54600114610def576040805162461bcd60e51b815260206004820152601060248201526f1359195e14ddd85c0e881313d0d2d15160821b604482015290519081900360640190fd5b6000600c81905580610dff610bf5565b50600654604080516370a0823160e01b815230600482015290519395509193506000926001600160a01b03909116916370a08231916024808301926020929190829003018186803b158015610e5357600080fd5b505afa158015610e67573d6000803e3d6000fd5b505050506040513d6020811015610e7d57600080fd5b5051600754604080516370a0823160e01b815230600482015290519293506000926001600160a01b03909216916370a0823191602480820192602092909190829003018186803b158015610ed057600080fd5b505afa158015610ee4573d6000803e3d6000fd5b505050506040513d6020811015610efa57600080fd5b505190506000610f19836001600160701b03871663ffffffff611ba816565b90506000610f36836001600160701b03871663ffffffff611ba816565b90506000610f448787611eca565b60005490915080610f8157610f6d6103e8610a70610f68878763ffffffff611b4816565b612126565b9850610f7c60006103e8612178565b610fd0565b610fcd6001600160701b038916610f9e868463ffffffff611b4816565b81610fa557fe5b046001600160701b038916610fc0868563ffffffff611b4816565b81610fc757fe5b0461220e565b98505b6000891161100f5760405162461bcd60e51b815260040180806020018281038252602781526020018061247b6027913960400191505060405180910390fd5b6110198a8a612178565b61102586868a8a611bea565b811561105557600854611051906001600160701b0380821691600160701b90041663ffffffff611b4816565b600b555b6040805185815260208101859052815133927f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f928290030190a250506001600c5550949695505050505050565b60016020526000908152604090205481565b600b5481565b60046020526000908152604090205481565b600080600c54600114611119576040805162461bcd60e51b815260206004820152601060248201526f1359195e14ddd85c0e881313d0d2d15160821b604482015290519081900360640190fd5b6000600c81905580611129610bf5565b50600654600754604080516370a0823160e01b815230600482015290519496509294506001600160a01b039182169391169160009184916370a08231916024808301926020929190829003018186803b15801561118557600080fd5b505afa158015611199573d6000803e3d6000fd5b505050506040513d60208110156111af57600080fd5b5051604080516370a0823160e01b815230600482015290519192506000916001600160a01b038516916370a08231916024808301926020929190829003018186803b1580156111fd57600080fd5b505afa158015611211573d6000803e3d6000fd5b505050506040513d602081101561122757600080fd5b5051306000908152600160205260408120549192506112468888611eca565b6000549091508061125d848763ffffffff611b4816565b8161126457fe5b049a5080611278848663ffffffff611b4816565b8161127f57fe5b04995060008b118015611292575060008a115b6112cd5760405162461bcd60e51b81526004018080602001828103825260278152602001806123ec6027913960400191505060405180910390fd5b6112d73084612225565b6112e2878d8d6119ae565b6112ed868d8c6119ae565b604080516370a0823160e01b815230600482015290516001600160a01b038916916370a08231916024808301926020929190829003018186803b15801561133357600080fd5b505afa158015611347573d6000803e3d6000fd5b505050506040513d602081101561135d57600080fd5b5051604080516370a0823160e01b815230600482015290519196506001600160a01b038816916370a0823191602480820192602092909190829003018186803b1580156113a957600080fd5b505afa1580156113bd573d6000803e3d6000fd5b505050506040513d60208110156113d357600080fd5b505193506113e385858b8b611bea565b81156114135760085461140f906001600160701b0380821691600160701b90041663ffffffff611b4816565b600b555b604080518c8152602081018c905281516001600160a01b038f169233927fdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496929081900390910190a35050505050505050506001600c81905550915091565b6040518060400160405280600781526020016604d444558204c560cc1b81525081565b6000610c2c338484611e10565b6103e881565b600c546001146114f1576040805162461bcd60e51b815260206004820152601060248201526f1359195e14ddd85c0e881313d0d2d15160821b604482015290519081900360640190fd5b6000600c55600654600754600854604080516370a0823160e01b815230600482015290516001600160a01b0394851694909316926115a0928592879261159b926001600160701b03169185916370a0823191602480820192602092909190829003018186803b15801561156357600080fd5b505afa158015611577573d6000803e3d6000fd5b505050506040513d602081101561158d57600080fd5b50519063ffffffff611ba816565b6119ae565b600854604080516370a0823160e01b81523060048201529051611607928492879261159b92600160701b90046001600160701b0316916001600160a01b038616916370a0823191602480820192602092909190829003018186803b15801561156357600080fd5b50506001600c5550565b6005546001600160a01b031681565b6007546001600160a01b031681565b42841015611678576040805162461bcd60e51b81526020600482015260116024820152701359195e14ddd85c0e8811561412549151607a1b604482015290519081900360640190fd5b6003546001600160a01b0380891660008181526004602090815260408083208054600180820190925582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98186015280840196909652958d166060860152608085018c905260a085019590955260c08085018b90528151808603909101815260e08501825280519083012061190160f01b6101008601526101028501969096526101228085019690965280518085039096018652610142840180825286519683019690962095839052610162840180825286905260ff89166101828501526101a284018890526101c28401879052519193926101e280820193601f1981019281900390910190855afa158015611793573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906117c95750886001600160a01b0316816001600160a01b0316145b61181a576040805162461bcd60e51b815260206004820152601b60248201527f4d646578537761703a20494e56414c49445f5349474e41545552450000000000604482015290519081900360640190fd5b611825898989611dae565b505050505050505050565b600260209081526000928352604080842090915290825290205481565b600c54600114611897576040805162461bcd60e51b815260206004820152601060248201526f1359195e14ddd85c0e881313d0d2d15160821b604482015290519081900360640190fd5b6000600c55600654604080516370a0823160e01b815230600482015290516119a7926001600160a01b0316916370a08231916024808301926020929190829003018186803b1580156118e857600080fd5b505afa1580156118fc573d6000803e3d6000fd5b505050506040513d602081101561191257600080fd5b5051600754604080516370a0823160e01b815230600482015290516001600160a01b03909216916370a0823191602480820192602092909190829003018186803b15801561195f57600080fd5b505afa158015611973573d6000803e3d6000fd5b505050506040513d602081101561198957600080fd5b50516008546001600160701b0380821691600160701b900416611bea565b6001600c55565b604080518082018252601981527f7472616e7366657228616464726573732c75696e74323536290000000000000060209182015281516001600160a01b0385811660248301526044808301869052845180840390910181526064909201845291810180516001600160e01b031663a9059cbb60e01b1781529251815160009460609489169392918291908083835b60208310611a5b5780518252601f199092019160209182019101611a3c565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114611abd576040519150601f19603f3d011682016040523d82523d6000602084013e611ac2565b606091505b5091509150818015611af0575080511580611af05750808060200190516020811015611aed57600080fd5b50515b611b41576040805162461bcd60e51b815260206004820152601960248201527f4d646578537761703a205452414e534645525f4641494c454400000000000000604482015290519081900360640190fd5b5050505050565b600082611b5757506000610c30565b82820282848281611b6457fe5b0414611ba15760405162461bcd60e51b81526004018080602001828103825260218152602001806124376021913960400191505060405180910390fd5b9392505050565b6000611ba183836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506122c3565b6001600160701b038411801590611c0857506001600160701b038311155b611c4e576040805162461bcd60e51b81526020600482015260126024820152714d646578537761703a204f564552464c4f5760701b604482015290519081900360640190fd5b60085463ffffffff42811691600160e01b90048116820390811615801590611c7e57506001600160701b03841615155b8015611c9257506001600160701b03831615155b15611d03578063ffffffff16611cc085611cab8661235a565b6001600160e01b03169063ffffffff61236c16565b600980546001600160e01b03929092169290920201905563ffffffff8116611ceb84611cab8761235a565b600a80546001600160e01b0392909216929092020190555b600880546dffffffffffffffffffffffffffff19166001600160701b03888116919091176dffffffffffffffffffffffffffff60701b1916600160701b8883168102919091176001600160e01b0316600160e01b63ffffffff871602179283905560408051848416815291909304909116602082015281517f1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1929181900390910190a1505050505050565b6001600160a01b03808416600081815260026020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b038316600090815260016020526040902054611e39908263ffffffff611ba816565b6001600160a01b038085166000908152600160205260408082209390935590841681522054611e6e908263ffffffff61239116565b6001600160a01b0380841660008181526001602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600080600560009054906101000a90046001600160a01b03166001600160a01b031663017e7e586040518163ffffffff1660e01b815260040160206040518083038186803b158015611f1b57600080fd5b505afa158015611f2f573d6000803e3d6000fd5b505050506040513d6020811015611f4557600080fd5b505190506001600160a01b03811615801590611fd85750600554604080516335d0ea0b60e11b815230600482015290516001600160a01b0390921691636ba1d41691602480820192602092909190829003018186803b158015611fa757600080fd5b505afa158015611fbb573d6000803e3d6000fd5b505050506040513d6020811015611fd157600080fd5b5051600914155b600b54909250821561211257801561210d57600061200b610f686001600160701b0388811690881663ffffffff611b4816565b9050600061201883612126565b90508082111561210a576000612046612037848463ffffffff611ba816565b6000549063ffffffff611b4816565b600554604080516335d0ea0b60e11b815230600482015290519293506000926120e69286926120da926001600160a01b0390921691636ba1d41691602480820192602092909190829003018186803b1580156120a157600080fd5b505afa1580156120b5573d6000803e3d6000fd5b505050506040513d60208110156120cb57600080fd5b5051879063ffffffff611b4816565b9063ffffffff61239116565b905060008183816120f357fe5b0490508015612106576121068782612178565b5050505b50505b61211e565b801561211e576000600b555b505092915050565b60006003821115612169575080600160028204015b818110156121635780915060028182858161215257fe5b04018161215b57fe5b04905061213b565b50612173565b8115612173575060015b919050565b60005461218b908263ffffffff61239116565b60009081556001600160a01b0383168152600160205260409020546121b6908263ffffffff61239116565b6001600160a01b03831660008181526001602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b60008183111561221e5781611ba1565b5090919050565b6001600160a01b03821660009081526001602052604090205461224e908263ffffffff611ba816565b6001600160a01b0383166000908152600160205260408120919091555461227b908263ffffffff611ba816565b60009081556040805183815290516001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef919081900360200190a35050565b600081848411156123525760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156123175781810151838201526020016122ff565b50505050905090810190601f1680156123445780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6001600160701b0316600160701b0290565b60006001600160701b0382166001600160e01b0384168161238957fe5b049392505050565b600082820183811015611ba1576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fdfe4d646578537761703a20494e53554646494349454e545f4c49515549444954595f4255524e45444d646578537761703a20494e53554646494349454e545f4f55545055545f414d4f554e54536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f774d646578537761703a20494e53554646494349454e545f494e5055545f414d4f554e544d646578537761703a20494e53554646494349454e545f4c49515549444954595f4d494e544544a265627a7a72315820df56069202b8f70a59b4330f0cf2ba5d91bc2cb3fa62efb48ad02c1de9c4ec1364736f6c63430005100032454950373132446f6d61696e28737472696e67206e616d652c737472696e672076657273696f6e2c75696e7432353620636861696e49642c6164647265737320766572696679696e67436f6e747261637429";

type MdexPairConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MdexPairConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MdexPair__factory extends ContractFactory {
  constructor(...args: MdexPairConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "MdexPair";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MdexPair> {
    return super.deploy(overrides || {}) as Promise<MdexPair>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MdexPair {
    return super.attach(address) as MdexPair;
  }
  connect(signer: Signer): MdexPair__factory {
    return super.connect(signer) as MdexPair__factory;
  }
  static readonly contractName: "MdexPair";
  public readonly contractName: "MdexPair";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MdexPairInterface {
    return new utils.Interface(_abi) as MdexPairInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MdexPair {
    return new Contract(address, _abi, signerOrProvider) as MdexPair;
  }
}