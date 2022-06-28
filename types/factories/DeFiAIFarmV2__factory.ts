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
        internalType: "uint8",
        name: "_pid",
        type: "uint8",
      },
    ],
    name: "claim",
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
  "0x60a060405234801561001057600080fd5b5060405161110238038061110283398101604081905261002f91610106565b610038336100b6565b6001600160a01b0381166100a15760405162461bcd60e51b815260206004820152602660248201527f64657620616464726573732063616e6e6f7420626520746865207a65726f206160448201526564647265737360d01b606482015260840160405180910390fd5b60601b6001600160601b031916608052610134565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600060208284031215610117578081fd5b81516001600160a01b038116811461012d578182fd5b9392505050565b60805160601c610fa361015f6000396000818160f40152818161022e01526102700152610fa36000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063903d42961161008c578063b6b55f2511610066578063b6b55f2514610206578063d3d3819314610219578063e34d99bf1461022c578063f2fde38b1461025257600080fd5b8063903d4296146101c357806395d4063f146101d6578063b145a5b8146101e957600080fd5b80635a2f3d09116100c85780635a2f3d091461015f57806360246c8814610199578063715018a6146101aa5780638da5cb5b146101b257600080fd5b80633ad10ef6146100ef578063485cc955146101335780634886c67514610148575b600080fd5b6101167f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020015b60405180910390f35b610146610141366004610e0c565b610265565b005b61015161271081565b60405190815260200161012a565b600154600254610179916001600160a01b03908116911682565b604080516001600160a01b0393841681529290911660208301520161012a565b6002546001600160a01b0316610116565b61014661043d565b6000546001600160a01b0316610116565b6101466101d1366004610e74565b6104a3565b6101466101e4366004610e9f565b6105e4565b6003546101f69060ff1681565b604051901515815260200161012a565b610146610214366004610e44565b61064d565b610151610227366004610dd0565b61085f565b7f0000000000000000000000000000000000000000000000000000000000000000610116565b610146610260366004610dd0565b6108e3565b336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614806102a657506000546001600160a01b031633145b6103055760405162461bcd60e51b815260206004820152602560248201527f4465466941494661726d56323a3a6f6e6c79476f7665726e616e63653a204e6f6044820152643a1033b7bb60d91b60648201526084015b60405180910390fd5b60035460ff161561036d5760405162461bcd60e51b815260206004820152602c60248201527f4465466941494661726d56323a3a7365745374726174733a20416c726561647960448201526b081a5b9a5d1a585b1a5e995960a21b60648201526084016102fc565b6001600160a01b0381166103e95760405162461bcd60e51b815260206004820152603760248201527f4465466941494661726d56323a3a7365745374726174733a205374726174206360448201527f616e206e6f74206265207a65726f20616464726573732e00000000000000000060648201526084016102fc565b604080518082019091526001600160a01b03928316808252919092166020909201829052600180546001600160a01b031990811690921781556002805490921690921790556003805460ff19169091179055565b6000546001600160a01b031633146104975760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102fc565b6104a160006109ae565b565b600082116104e85760405162461bcd60e51b8152602060048201526012602482015271616d6f756e74206973206e6567617469766560701b60448201526064016102fc565b600254600154604051636169f00160e01b815260ff84166004820152336024820152604481018590526001600160a01b039182166064820152911690636169f00190608401602060405180830381600087803b15801561054757600080fd5b505af115801561055b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061057f9190610e5c565b600154909250610599906001600160a01b031633846109fe565b600154604080518481526001600160a01b03909216602083015233917f56c54ba9bd38d8fd62012e42c7ee564519b09763c426d331b3661b537ead19b2910160405180910390a25050565b600254604051630952c56360e01b815260ff831660048201523360248201526001600160a01b0390911690630952c56390604401600060405180830381600087803b15801561063257600080fd5b505af1158015610646573d6000803e3d6000fd5b5050505050565b600081116106925760405162461bcd60e51b8152602060048201526012602482015271616d6f756e74206973206e6567617469766560701b60448201526064016102fc565b600154604051636eb1769f60e11b815233600482015230602482015282916001600160a01b03169063dd62ed3e9060440160206040518083038186803b1580156106db57600080fd5b505afa1580156106ef573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107139190610e5c565b10156107515760405162461bcd60e51b815260206004820152600d60248201526c4e6f20616c6c6f77616e63657360981b60448201526064016102fc565b600154610769906001600160a01b0316333084610a66565b600254600154610786916001600160a01b03918216911683610aa4565b600254600154604051633d14d1b760e21b8152336004820152602481018490526001600160a01b03918216604482015291169063f45346dc90606401602060405180830381600087803b1580156107dc57600080fd5b505af11580156107f0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108149190610e5c565b50600154604080518381526001600160a01b03909216602083015233917fe31c7b8d08ee7db0afa68782e1028ef92305caeea8626633ad44d413e30f6b2f910160405180910390a250565b6002546040516327e235e360e01b81526001600160a01b03838116600483015260009216906327e235e39060240160206040518083038186803b1580156108a557600080fd5b505afa1580156108b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108dd9190610e5c565b92915050565b6000546001600160a01b0316331461093d5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016102fc565b6001600160a01b0381166109a25760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016102fc565b6109ab816109ae565b50565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6040516001600160a01b038316602482015260448101829052610a6190849063a9059cbb60e01b906064015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152610b65565b505050565b6040516001600160a01b0380851660248301528316604482015260648101829052610a9e9085906323b872dd60e01b90608401610a2a565b50505050565b604051636eb1769f60e11b81523060048201526001600160a01b038381166024830152600091839186169063dd62ed3e9060440160206040518083038186803b158015610af057600080fd5b505afa158015610b04573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b289190610e5c565b610b329190610f08565b6040516001600160a01b038516602482015260448101829052909150610a9e90859063095ea7b360e01b90606401610a2a565b6000610bba826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316610c379092919063ffffffff16565b805190915015610a615780806020019051810190610bd89190610dec565b610a615760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016102fc565b6060610c468484600085610c50565b90505b9392505050565b606082471015610cb15760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b60648201526084016102fc565b6001600160a01b0385163b610d085760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016102fc565b600080866001600160a01b03168587604051610d249190610eb9565b60006040518083038185875af1925050503d8060008114610d61576040519150601f19603f3d011682016040523d82523d6000602084013e610d66565b606091505b5091509150610d76828286610d81565b979650505050505050565b60608315610d90575081610c49565b825115610da05782518084602001fd5b8160405162461bcd60e51b81526004016102fc9190610ed5565b803560ff81168114610dcb57600080fd5b919050565b600060208284031215610de1578081fd5b8135610c4981610f58565b600060208284031215610dfd578081fd5b81518015158114610c49578182fd5b60008060408385031215610e1e578081fd5b8235610e2981610f58565b91506020830135610e3981610f58565b809150509250929050565b600060208284031215610e55578081fd5b5035919050565b600060208284031215610e6d578081fd5b5051919050565b60008060408385031215610e86578182fd5b82359150610e9660208401610dba565b90509250929050565b600060208284031215610eb0578081fd5b610c4982610dba565b60008251610ecb818460208701610f2c565b9190910192915050565b6020815260008251806020840152610ef4816040850160208701610f2c565b601f01601f19169190910160400192915050565b60008219821115610f2757634e487b7160e01b81526011600452602481fd5b500190565b60005b83811015610f47578181015183820152602001610f2f565b83811115610a9e5750506000910152565b6001600160a01b03811681146109ab57600080fdfea2646970667358221220451aeaae3dab7fd41d440021b177ca2231995d8903ad0c8a99af4a815348584d64736f6c63430008040033";

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
