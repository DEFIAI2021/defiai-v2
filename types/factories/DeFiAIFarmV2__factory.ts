/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { DeFiAIFarmV2, DeFiAIFarmV2Interface } from "../DeFiAIFarmV2";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_devAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "wantAddress",
        type: "address",
      },
    ],
    name: "Deposit",
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
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "wantAddress",
        type: "address",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "FEE_DENOM",
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
        name: "_wantAmt",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "devAddress",
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
    name: "getDevAddress",
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
    name: "getPoolInfo",
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
        name: "_user",
        type: "address",
      },
    ],
    name: "getTotalBalance",
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
        internalType: "contract IERC20",
        name: "_want",
        type: "address",
      },
      {
        internalType: "address",
        name: "_strat",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isInit",
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
    name: "poolInfo",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "want",
        type: "address",
      },
      {
        internalType: "address",
        name: "strat",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_wantAmt",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_pid",
        type: "uint8",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b5060405161103938038061103983398101604081905261002f91610106565b610038336100b6565b6001600160a01b0381166100a15760405162461bcd60e51b815260206004820152602660248201527f64657620616464726573732063616e6e6f7420626520746865207a65726f206160448201526564647265737360d01b606482015260840160405180910390fd5b60601b6001600160601b031916608052610134565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600060208284031215610117578081fd5b81516001600160a01b038116811461012d578182fd5b9392505050565b60805160601c610eda61015f6000396000818160d90152818161020001526102420152610eda6000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80638da5cb5b1161008c578063b6b55f2511610066578063b6b55f25146101d8578063d3d38193146101eb578063e34d99bf146101fe578063f2fde38b1461022457600080fd5b80638da5cb5b14610197578063903d4296146101a8578063b145a5b8146101bb57600080fd5b80633ad10ef6146100d4578063485cc955146101185780634886c6751461012d5780635a2f3d091461014457806360246c881461017e578063715018a61461018f575b600080fd5b6100fb7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020015b60405180910390f35b61012b610126366004610d5f565b610237565b005b61013661271081565b60405190815260200161010f565b60015460025461015e916001600160a01b03908116911682565b604080516001600160a01b0393841681529290911660208301520161010f565b6002546001600160a01b03166100fb565b61012b61040f565b6000546001600160a01b03166100fb565b61012b6101b6366004610dc7565b610475565b6003546101c89060ff1681565b604051901515815260200161010f565b61012b6101e6366004610d97565b6105b6565b6101366101f9366004610d23565b6107c8565b7f00000000000000000000000000000000000000000000000000000000000000006100fb565b61012b610232366004610d23565b61084c565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016148061027857506000546001600160a01b031633145b6102d75760405162461bcd60e51b815260206004820152602560248201527f4465466941494661726d56323a3a6f6e6c79476f7665726e616e63653a204e6f6044820152643a1033b7bb60d91b60648201526084015b60405180910390fd5b60035460ff161561033f5760405162461bcd60e51b815260206004820152602c60248201527f4465466941494661726d56323a3a7365745374726174733a20416c726561647960448201526b081a5b9a5d1a585b1a5e995960a21b60648201526084016102ce565b6001600160a01b0381166103bb5760405162461bcd60e51b815260206004820152603760248201527f4465466941494661726d56323a3a7365745374726174733a205374726174206360448201527f616e206e6f74206265207a65726f20616464726573732e00000000000000000060648201526084016102ce565b604080518082019091526001600160a01b03928316808252919092166020909201829052600180546001600160a01b031990811690921781556002805490921690921790556003805460ff19169091179055565b6000546001600160a01b031633146104695760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102ce565b6104736000610917565b565b600082116104ba5760405162461bcd60e51b8152602060048201526012602482015271616d6f756e74206973206e6567617469766560701b60448201526064016102ce565b600254600154604051636169f00160e01b815260ff84166004820152336024820152604481018590526001600160a01b039182166064820152911690636169f00190608401602060405180830381600087803b15801561051957600080fd5b505af115801561052d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105519190610daf565b60015490925061056b906001600160a01b03163384610967565b600154604080518481526001600160a01b03909216602083015233917f56c54ba9bd38d8fd62012e42c7ee564519b09763c426d331b3661b537ead19b2910160405180910390a25050565b600081116105fb5760405162461bcd60e51b8152602060048201526012602482015271616d6f756e74206973206e6567617469766560701b60448201526064016102ce565b600154604051636eb1769f60e11b815233600482015230602482015282916001600160a01b03169063dd62ed3e9060440160206040518083038186803b15801561064457600080fd5b505afa158015610658573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061067c9190610daf565b10156106ba5760405162461bcd60e51b815260206004820152600d60248201526c4e6f20616c6c6f77616e63657360981b60448201526064016102ce565b6001546106d2906001600160a01b03163330846109cf565b6002546001546106ef916001600160a01b03918216911683610a0d565b600254600154604051633d14d1b760e21b8152336004820152602481018490526001600160a01b03918216604482015291169063f45346dc90606401602060405180830381600087803b15801561074557600080fd5b505af1158015610759573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061077d9190610daf565b50600154604080518381526001600160a01b03909216602083015233917fe31c7b8d08ee7db0afa68782e1028ef92305caeea8626633ad44d413e30f6b2f910160405180910390a250565b6002546040516327e235e360e01b81526001600160a01b03838116600483015260009216906327e235e39060240160206040518083038186803b15801561080e57600080fd5b505afa158015610822573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108469190610daf565b92915050565b6000546001600160a01b031633146108a65760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102ce565b6001600160a01b03811661090b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016102ce565b61091481610917565b50565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6040516001600160a01b0383166024820152604481018290526109ca90849063a9059cbb60e01b906064015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152610ace565b505050565b6040516001600160a01b0380851660248301528316604482015260648101829052610a079085906323b872dd60e01b90608401610993565b50505050565b604051636eb1769f60e11b81523060048201526001600160a01b038381166024830152600091839186169063dd62ed3e9060440160206040518083038186803b158015610a5957600080fd5b505afa158015610a6d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a919190610daf565b610a9b9190610e3f565b6040516001600160a01b038516602482015260448101829052909150610a0790859063095ea7b360e01b90606401610993565b6000610b23826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316610ba09092919063ffffffff16565b8051909150156109ca5780806020019051810190610b419190610d3f565b6109ca5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016102ce565b6060610baf8484600085610bb9565b90505b9392505050565b606082471015610c1a5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b60648201526084016102ce565b6001600160a01b0385163b610c715760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016102ce565b600080866001600160a01b03168587604051610c8d9190610df0565b60006040518083038185875af1925050503d8060008114610cca576040519150601f19603f3d011682016040523d82523d6000602084013e610ccf565b606091505b5091509150610cdf828286610cea565b979650505050505050565b60608315610cf9575081610bb2565b825115610d095782518084602001fd5b8160405162461bcd60e51b81526004016102ce9190610e0c565b600060208284031215610d34578081fd5b8135610bb281610e8f565b600060208284031215610d50578081fd5b81518015158114610bb2578182fd5b60008060408385031215610d71578081fd5b8235610d7c81610e8f565b91506020830135610d8c81610e8f565b809150509250929050565b600060208284031215610da8578081fd5b5035919050565b600060208284031215610dc0578081fd5b5051919050565b60008060408385031215610dd9578182fd5b82359150602083013560ff81168114610d8c578182fd5b60008251610e02818460208701610e63565b9190910192915050565b6020815260008251806020840152610e2b816040850160208701610e63565b601f01601f19169190910160400192915050565b60008219821115610e5e57634e487b7160e01b81526011600452602481fd5b500190565b60005b83811015610e7e578181015183820152602001610e66565b83811115610a075750506000910152565b6001600160a01b038116811461091457600080fdfea26469706673582212207b25a4372d80a7e60725ce759e189f9aa4d726554e380263b18d752bcd85911064736f6c63430008040033";

type DeFiAIFarmV2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DeFiAIFarmV2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DeFiAIFarmV2__factory extends ContractFactory {
  constructor(...args: DeFiAIFarmV2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "DeFiAIFarmV2";
  }

  deploy(
    _devAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DeFiAIFarmV2> {
    return super.deploy(_devAddress, overrides || {}) as Promise<DeFiAIFarmV2>;
  }
  getDeployTransaction(
    _devAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_devAddress, overrides || {});
  }
  attach(address: string): DeFiAIFarmV2 {
    return super.attach(address) as DeFiAIFarmV2;
  }
  connect(signer: Signer): DeFiAIFarmV2__factory {
    return super.connect(signer) as DeFiAIFarmV2__factory;
  }
  static readonly contractName: "DeFiAIFarmV2";
  public readonly contractName: "DeFiAIFarmV2";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DeFiAIFarmV2Interface {
    return new utils.Interface(_abi) as DeFiAIFarmV2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DeFiAIFarmV2 {
    return new Contract(address, _abi, signerOrProvider) as DeFiAIFarmV2;
  }
}
