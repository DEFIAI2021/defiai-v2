/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BiswapPair, BiswapPairInterface } from "../BiswapPair";

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
    name: "devFee",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
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
        internalType: "uint32",
        name: "_devFee",
        type: "uint32",
      },
    ],
    name: "setDevFee",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint32",
        name: "_swapFee",
        type: "uint32",
      },
    ],
    name: "setSwapFee",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
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
    name: "swapFee",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    payable: false,
    stateMutability: "view",
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
  "0x6080604052600c8054640100000000600163ffffffff19909216821763ffffffff60201b191617909155600d5534801561003857600080fd5b5060405146908060526126ad8239604080519182900360520182208282018252600a835269426973776170204c507360b01b6020938401528151808301835260018152603160f81b908401528151808401919091527f9af0e98ffe13181561a4920bf009db0b47677d9ae073d40337f69a639f36e66d818301527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6606082015260808101949094523060a0808601919091528151808603909101815260c09094019052825192019190912060035550600580546001600160a01b03191633179055612585806101286000396000f3fe608060405234801561001057600080fd5b50600436106101e55760003560e01c80636827e7641161010f578063ba9a7a56116100a2578063d505accf11610071578063d505accf146105c4578063d6d788c314610615578063dd62ed3e14610638578063fff6cae914610666576101e5565b8063ba9a7a5614610586578063bc25cf771461058e578063c45a0155146105b4578063d21220a7146105bc576101e5565b80637ecebe00116100de5780637ecebe00146104ed57806389afcb441461051357806395d89b4114610552578063a9059cbb1461055a576101e5565b80636827e764146104915780636a6278421461049957806370a08231146104bf5780637464fc3d146104e5576101e5565b806323b872dd11610187578063485cc95511610156578063485cc9551461043257806354cf2aeb146104605780635909c0d5146104815780635a3d549314610489576101e5565b806323b872dd146103ce57806330adf81f14610404578063313ce5671461040c5780633644e5151461042a576101e5565b80630902f1ac116101c35780630902f1ac14610318578063095ea7b3146103505780630dfe16811461039057806318160ddd146103b4576101e5565b8063022c0d9f146101ea57806303c150b01461027857806306fdde031461029b575b600080fd5b6102766004803603608081101561020057600080fd5b8135916020810135916001600160a01b03604083013516919081019060808101606082013564010000000081111561023757600080fd5b82018360208201111561024957600080fd5b8035906020019184600183028401116401000000008311171561026b57600080fd5b50909250905061066e565b005b6102766004803603602081101561028e57600080fd5b503563ffffffff16610bc1565b6102a3610cef565b6040805160208082528351818301528351919283929083019185019080838360005b838110156102dd5781810151838201526020016102c5565b50505050905090810190601f16801561030a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610320610d15565b604080516001600160701b03948516815292909316602083015263ffffffff168183015290519081900360600190f35b61037c6004803603604081101561036657600080fd5b506001600160a01b038135169060200135610d3f565b604080519115158252519081900360200190f35b610398610d56565b604080516001600160a01b039092168252519081900360200190f35b6103bc610d65565b60408051918252519081900360200190f35b61037c600480360360608110156103e457600080fd5b506001600160a01b03813581169160208101359091169060400135610d6b565b6103bc610e05565b610414610e29565b6040805160ff9092168252519081900360200190f35b6103bc610e2e565b6102766004803603604081101561044857600080fd5b506001600160a01b0381358116916020013516610e34565b610468610eb5565b6040805163ffffffff9092168252519081900360200190f35b6103bc610ec1565b6103bc610ec7565b610468610ecd565b6103bc600480360360208110156104af57600080fd5b50356001600160a01b0316610ee1565b6103bc600480360360208110156104d557600080fd5b50356001600160a01b03166111de565b6103bc6111f0565b6103bc6004803603602081101561050357600080fd5b50356001600160a01b03166111f6565b6105396004803603602081101561052957600080fd5b50356001600160a01b0316611208565b6040805192835260208301919091528051918290030190f35b6102a36115ab565b61037c6004803603604081101561057057600080fd5b506001600160a01b0381351690602001356115cd565b6103bc6115da565b610276600480360360208110156105a457600080fd5b50356001600160a01b03166115e0565b610398611748565b610398611757565b610276600480360360e08110156105da57600080fd5b506001600160a01b03813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c00135611766565b6102766004803603602081101561062b57600080fd5b503563ffffffff16611965565b6103bc6004803603604081101561064e57600080fd5b506001600160a01b0381358116916020013516611a87565b610276611aa4565b600d546001146106b6576040805162461bcd60e51b815260206004820152600e60248201526d109a5cddd85c0e881313d0d2d15160921b604482015290519081900360640190fd5b6000600d55841515806106c95750600084115b6107045760405162461bcd60e51b81526004018080602001828103825260228152602001806124e96022913960400191505060405180910390fd5b60008061070f610d15565b5091509150816001600160701b0316871080156107345750806001600160701b031686105b610785576040805162461bcd60e51b815260206004820152601e60248201527f4269737761703a20494e53554646494349454e545f4c49515549444954590000604482015290519081900360640190fd5b60065460075460009182916001600160a01b039182169190811690891682148015906107c35750806001600160a01b0316896001600160a01b031614155b610809576040805162461bcd60e51b81526020600482015260126024820152714269737761703a20494e56414c49445f544f60701b604482015290519081900360640190fd5b8a1561081a5761081a828a8d611c03565b891561082b5761082b818a8c611c03565b86156108e657886001600160a01b0316635b3bc4fe338d8d8c8c6040518663ffffffff1660e01b815260040180866001600160a01b03166001600160a01b03168152602001858152602001848152602001806020018281038252848482818152602001925080828437600081840152601f19601f8201169050808301925050509650505050505050600060405180830381600087803b1580156108cd57600080fd5b505af11580156108e1573d6000803e3d6000fd5b505050505b604080516370a0823160e01b815230600482015290516001600160a01b038416916370a08231916024808301926020929190829003018186803b15801561092c57600080fd5b505afa158015610940573d6000803e3d6000fd5b505050506040513d602081101561095657600080fd5b5051604080516370a0823160e01b815230600482015290519195506001600160a01b038316916370a0823191602480820192602092909190829003018186803b1580156109a257600080fd5b505afa1580156109b6573d6000803e3d6000fd5b505050506040513d60208110156109cc57600080fd5b5051925060009150506001600160701b0385168a900383116109ef5760006109fe565b89856001600160701b03160383035b9050600089856001600160701b0316038311610a1b576000610a2a565b89856001600160701b03160383035b90506000821180610a3b5750600081115b610a765760405162461bcd60e51b81526004018080602001828103825260218152602001806125306021913960400191505060405180910390fd5b600c5463ffffffff90811690600090610ab590610a979086908590611d9d16565b610aa9886103e863ffffffff611d9d16565b9063ffffffff611e0016565b90506000610acc610a97858563ffffffff611d9d16565b9050610afd620f4240610af16001600160701b038c8116908c1663ffffffff611d9d16565b9063ffffffff611d9d16565b610b0d838363ffffffff611d9d16565b1015610b4c576040805162461bcd60e51b81526020600482015260096024820152684269737761703a204b60b81b604482015290519081900360640190fd5b505050610b5b84848888611e50565b60408051838152602081018390528082018d9052606081018c905290516001600160a01b038b169133917fd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d8229181900360800190a350506001600d55505050505050505050565b60008163ffffffff1611610c17576040805162461bcd60e51b81526020600482015260186024820152770426973776170506169723a206c6f776572207468656e20360441b604482015290519081900360640190fd5b6005546001600160a01b03163314610c6e576040805162461bcd60e51b81526020600482015260156024820152742134b9bbb0b82830b4b91d102327a92124a22222a760591b604482015290519081900360640190fd5b6101f48163ffffffff161115610cc7576040805162461bcd60e51b8152602060048201526019602482015278426973776170506169723a20464f5242494444454e5f46454560381b604482015290519081900360640190fd5b600c805463ffffffff9092166401000000000267ffffffff0000000019909216919091179055565b6040518060400160405280600a815260200169426973776170204c507360b01b81525081565b6008546001600160701b0380821692600160701b830490911691600160e01b900463ffffffff1690565b6000610d4c338484612012565b5060015b92915050565b6006546001600160a01b031681565b60005481565b6001600160a01b038316600090815260026020908152604080832033845290915281205460001914610df0576001600160a01b0384166000908152600260209081526040808320338452909152902054610dcb908363ffffffff611e0016565b6001600160a01b03851660009081526002602090815260408083203384529091529020555b610dfb848484612074565b5060019392505050565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b601281565b60035481565b6005546001600160a01b03163314610e87576040805162461bcd60e51b81526020600482015260116024820152702134b9bbb0b81d102327a92124a22222a760791b604482015290519081900360640190fd5b600680546001600160a01b039384166001600160a01b03199182161790915560078054929093169116179055565b600c5463ffffffff1681565b60095481565b600a5481565b600c54640100000000900463ffffffff1681565b6000600d54600114610f2b576040805162461bcd60e51b815260206004820152600e60248201526d109a5cddd85c0e881313d0d2d15160921b604482015290519081900360640190fd5b6000600d81905580610f3b610d15565b50600654604080516370a0823160e01b815230600482015290519395509193506000926001600160a01b03909116916370a08231916024808301926020929190829003018186803b158015610f8f57600080fd5b505afa158015610fa3573d6000803e3d6000fd5b505050506040513d6020811015610fb957600080fd5b5051600754604080516370a0823160e01b815230600482015290519293506000926001600160a01b03909216916370a0823191602480820192602092909190829003018186803b15801561100c57600080fd5b505afa158015611020573d6000803e3d6000fd5b505050506040513d602081101561103657600080fd5b505190506000611055836001600160701b03871663ffffffff611e0016565b90506000611072836001600160701b03871663ffffffff611e0016565b90506000611080878761212e565b600054909150806110bd576110a96103e8610aa96110a4878763ffffffff611d9d16565b61229f565b98506110b860006103e86122f1565b61110c565b6111096001600160701b0389166110da868463ffffffff611d9d16565b816110e157fe5b046001600160701b0389166110fc868563ffffffff611d9d16565b8161110357fe5b04612387565b98505b6000891161114b5760405162461bcd60e51b81526004018080602001828103825260258152602001806124c46025913960400191505060405180910390fd5b6111558a8a6122f1565b61116186868a8a611e50565b81156111915760085461118d906001600160701b0380821691600160701b90041663ffffffff611d9d16565b600b555b6040805185815260208101859052815133927f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f928290030190a250506001600d5550949695505050505050565b60016020526000908152604090205481565b600b5481565b60046020526000908152604090205481565b600080600d54600114611253576040805162461bcd60e51b815260206004820152600e60248201526d109a5cddd85c0e881313d0d2d15160921b604482015290519081900360640190fd5b6000600d81905580611263610d15565b50600654600754604080516370a0823160e01b815230600482015290519496509294506001600160a01b039182169391169160009184916370a08231916024808301926020929190829003018186803b1580156112bf57600080fd5b505afa1580156112d3573d6000803e3d6000fd5b505050506040513d60208110156112e957600080fd5b5051604080516370a0823160e01b815230600482015290519192506000916001600160a01b038516916370a08231916024808301926020929190829003018186803b15801561133757600080fd5b505afa15801561134b573d6000803e3d6000fd5b505050506040513d602081101561136157600080fd5b505130600090815260016020526040812054919250611380888861212e565b60005490915080611397848763ffffffff611d9d16565b8161139e57fe5b049a50806113b2848663ffffffff611d9d16565b816113b957fe5b04995060008b1180156113cc575060008a115b6114075760405162461bcd60e51b815260040180806020018281038252602581526020018061250b6025913960400191505060405180910390fd5b611411308461239f565b61141c878d8d611c03565b611427868d8c611c03565b604080516370a0823160e01b815230600482015290516001600160a01b038916916370a08231916024808301926020929190829003018186803b15801561146d57600080fd5b505afa158015611481573d6000803e3d6000fd5b505050506040513d602081101561149757600080fd5b5051604080516370a0823160e01b815230600482015290519196506001600160a01b038816916370a0823191602480820192602092909190829003018186803b1580156114e357600080fd5b505afa1580156114f7573d6000803e3d6000fd5b505050506040513d602081101561150d57600080fd5b5051935061151d85858b8b611e50565b811561154d57600854611549906001600160701b0380821691600160701b90041663ffffffff611d9d16565b600b555b604080518c8152602081018c905281516001600160a01b038f169233927fdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496929081900390910190a35050505050505050506001600d81905550915091565b6040518060400160405280600681526020016504253572d4c560d41b81525081565b6000610d4c338484612074565b6103e881565b600d54600114611628576040805162461bcd60e51b815260206004820152600e60248201526d109a5cddd85c0e881313d0d2d15160921b604482015290519081900360640190fd5b6000600d55600654600754600854604080516370a0823160e01b815230600482015290516001600160a01b0394851694909316926116d792859287926116d2926001600160701b03169185916370a0823191602480820192602092909190829003018186803b15801561169a57600080fd5b505afa1580156116ae573d6000803e3d6000fd5b505050506040513d60208110156116c457600080fd5b50519063ffffffff611e0016565b611c03565b600854604080516370a0823160e01b8152306004820152905161173e92849287926116d292600160701b90046001600160701b0316916001600160a01b038616916370a0823191602480820192602092909190829003018186803b15801561169a57600080fd5b50506001600d5550565b6005546001600160a01b031681565b6007546001600160a01b031681565b428410156117ad576040805162461bcd60e51b815260206004820152600f60248201526e109a5cddd85c0e8811561412549151608a1b604482015290519081900360640190fd5b6003546001600160a01b0380891660008181526004602090815260408083208054600180820190925582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98186015280840196909652958d166060860152608085018c905260a085019590955260c08085018b90528151808603909101815260e08501825280519083012061190160f01b6101008601526101028501969096526101228085019690965280518085039096018652610142840180825286519683019690962095839052610162840180825286905260ff89166101828501526101a284018890526101c28401879052519193926101e280820193601f1981019281900390910190855afa1580156118c8573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906118fe5750886001600160a01b0316816001600160a01b0316145b61194f576040805162461bcd60e51b815260206004820152601960248201527f4269737761703a20494e56414c49445f5349474e415455524500000000000000604482015290519081900360640190fd5b61195a898989612012565b505050505050505050565b60008163ffffffff16116119bb576040805162461bcd60e51b81526020600482015260186024820152770426973776170506169723a206c6f776572207468656e20360441b604482015290519081900360640190fd5b6005546001600160a01b03163314611a12576040805162461bcd60e51b81526020600482015260156024820152742134b9bbb0b82830b4b91d102327a92124a22222a760591b604482015290519081900360640190fd5b6103e88163ffffffff161115611a6b576040805162461bcd60e51b8152602060048201526019602482015278426973776170506169723a20464f5242494444454e5f46454560381b604482015290519081900360640190fd5b600c805463ffffffff191663ffffffff92909216919091179055565b600260209081526000928352604080842090915290825290205481565b600d54600114611aec576040805162461bcd60e51b815260206004820152600e60248201526d109a5cddd85c0e881313d0d2d15160921b604482015290519081900360640190fd5b6000600d55600654604080516370a0823160e01b81523060048201529051611bfc926001600160a01b0316916370a08231916024808301926020929190829003018186803b158015611b3d57600080fd5b505afa158015611b51573d6000803e3d6000fd5b505050506040513d6020811015611b6757600080fd5b5051600754604080516370a0823160e01b815230600482015290516001600160a01b03909216916370a0823191602480820192602092909190829003018186803b158015611bb457600080fd5b505afa158015611bc8573d6000803e3d6000fd5b505050506040513d6020811015611bde57600080fd5b50516008546001600160701b0380821691600160701b900416611e50565b6001600d55565b604080518082018252601981527f7472616e7366657228616464726573732c75696e74323536290000000000000060209182015281516001600160a01b0385811660248301526044808301869052845180840390910181526064909201845291810180516001600160e01b031663a9059cbb60e01b1781529251815160009460609489169392918291908083835b60208310611cb05780518252601f199092019160209182019101611c91565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114611d12576040519150601f19603f3d011682016040523d82523d6000602084013e611d17565b606091505b5091509150818015611d45575080511580611d455750808060200190516020811015611d4257600080fd5b50515b611d96576040805162461bcd60e51b815260206004820152601760248201527f4269737761703a205452414e534645525f4641494c4544000000000000000000604482015290519081900360640190fd5b5050505050565b6000811580611db857505080820282828281611db557fe5b04145b610d50576040805162461bcd60e51b815260206004820152601460248201527364732d6d6174682d6d756c2d6f766572666c6f7760601b604482015290519081900360640190fd5b80820382811115610d50576040805162461bcd60e51b815260206004820152601560248201527464732d6d6174682d7375622d756e646572666c6f7760581b604482015290519081900360640190fd5b6001600160701b038411801590611e6e57506001600160701b038311155b611eb2576040805162461bcd60e51b815260206004820152601060248201526f4269737761703a204f564552464c4f5760801b604482015290519081900360640190fd5b60085463ffffffff42811691600160e01b90048116820390811615801590611ee257506001600160701b03841615155b8015611ef657506001600160701b03831615155b15611f67578063ffffffff16611f2485611f0f8661243d565b6001600160e01b03169063ffffffff61244f16565b600980546001600160e01b03929092169290920201905563ffffffff8116611f4f84611f0f8761243d565b600a80546001600160e01b0392909216929092020190555b600880546dffffffffffffffffffffffffffff19166001600160701b03888116919091176dffffffffffffffffffffffffffff60701b1916600160701b8883168102919091176001600160e01b0316600160e01b63ffffffff871602179283905560408051848416815291909304909116602082015281517f1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1929181900390910190a1505050505050565b6001600160a01b03808416600081815260026020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b03831660009081526001602052604090205461209d908263ffffffff611e0016565b6001600160a01b0380851660009081526001602052604080822093909355908416815220546120d2908263ffffffff61247416565b6001600160a01b0380841660008181526001602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600080600560009054906101000a90046001600160a01b03166001600160a01b031663017e7e586040518163ffffffff1660e01b815260040160206040518083038186803b15801561217f57600080fd5b505afa158015612193573d6000803e3d6000fd5b505050506040513d60208110156121a957600080fd5b5051600b546001600160a01b03821615801594509192509061228b5780156122865760006121ec6110a46001600160701b0388811690881663ffffffff611d9d16565b905060006121f98361229f565b905080821115612283576000612227612218848463ffffffff611e0016565b6000549063ffffffff611d9d16565b600c5490915060009061225f90849061225390879063ffffffff640100000000909104811690611d9d16565b9063ffffffff61247416565b9050600081838161226c57fe5b049050801561227f5761227f87826122f1565b5050505b50505b612297565b8015612297576000600b555b505092915050565b600060038211156122e2575080600160028204015b818110156122dc578091506002818285816122cb57fe5b0401816122d457fe5b0490506122b4565b506122ec565b81156122ec575060015b919050565b600054612304908263ffffffff61247416565b60009081556001600160a01b03831681526001602052604090205461232f908263ffffffff61247416565b6001600160a01b03831660008181526001602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b60008183106123965781612398565b825b9392505050565b6001600160a01b0382166000908152600160205260409020546123c8908263ffffffff611e0016565b6001600160a01b038316600090815260016020526040812091909155546123f5908263ffffffff611e0016565b60009081556040805183815290516001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef919081900360200190a35050565b6001600160701b0316600160701b0290565b60006001600160701b0382166001600160e01b0384168161246c57fe5b049392505050565b80820182811015610d50576040805162461bcd60e51b815260206004820152601460248201527364732d6d6174682d6164642d6f766572666c6f7760601b604482015290519081900360640190fdfe4269737761703a20494e53554646494349454e545f4c49515549444954595f4d494e5445444269737761703a20494e53554646494349454e545f4f55545055545f414d4f554e544269737761703a20494e53554646494349454e545f4c49515549444954595f4255524e45444269737761703a20494e53554646494349454e545f494e5055545f414d4f554e54a265627a7a72315820403558e6bfa23a98e388f52386e6d6e68bf17c8632de5a955fc14b95367bcfbb64736f6c63430005100032454950373132446f6d61696e28737472696e67206e616d652c737472696e672076657273696f6e2c75696e7432353620636861696e49642c6164647265737320766572696679696e67436f6e747261637429";

type BiswapPairConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BiswapPairConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BiswapPair__factory extends ContractFactory {
  constructor(...args: BiswapPairConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "BiswapPair";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BiswapPair> {
    return super.deploy(overrides || {}) as Promise<BiswapPair>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BiswapPair {
    return super.attach(address) as BiswapPair;
  }
  connect(signer: Signer): BiswapPair__factory {
    return super.connect(signer) as BiswapPair__factory;
  }
  static readonly contractName: "BiswapPair";
  public readonly contractName: "BiswapPair";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BiswapPairInterface {
    return new utils.Interface(_abi) as BiswapPairInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BiswapPair {
    return new Contract(address, _abi, signerOrProvider) as BiswapPair;
  }
}
