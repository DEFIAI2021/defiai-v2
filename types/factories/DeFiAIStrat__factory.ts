/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { DeFiAIStrat, DeFiAIStratInterface } from "../DeFiAIStrat";

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
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_wantAmt",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
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
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getLastBlock",
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
        name: "user",
        type: "address",
      },
    ],
    name: "getUserWant",
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
    inputs: [
      {
        internalType: "address",
        name: "_devAddress",
        type: "address",
      },
    ],
    name: "setDevAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_stratAddress",
        type: "address",
      },
    ],
    name: "setStratAddress",
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
        internalType: "address[]",
        name: "_users",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_balances",
        type: "uint256[]",
      },
    ],
    name: "updateBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_wantAmt",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161095f38038061095f83398101604081905261002f916100ad565b6100383361005d565b600380546001600160a01b0319166001600160a01b03929092169190911790556100db565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100be578081fd5b81516001600160a01b03811681146100d4578182fd5b9392505050565b610875806100ea6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80634929dfa1116100715780634929dfa114610150578063715018a61461017d5780638da5cb5b14610185578063d0d41fe114610196578063f2fde38b146101a9578063f3fef3a3146101bc57600080fd5b80630c9c0bcc146100ae5780632408b262146100c35780633a5fd572146100d65780633ad10ef61461011257806347e7ef241461013d575b600080fd5b6100c16100bc3660046106f7565b6101cf565b005b6100c16100d1366004610741565b610224565b6100ff6100e43660046106f7565b6001600160a01b031660009081526001602052604090205490565b6040519081526020015b60405180910390f35b600354610125906001600160a01b031681565b6040516001600160a01b039091168152602001610109565b6100ff61014b366004610718565b6103b2565b6100ff61015e3660046106f7565b6001600160a01b03166000908152600160208190526040909120015490565b6100c1610459565b6000546001600160a01b0316610125565b6100c16101a43660046106f7565b61048f565b6100c16101b73660046106f7565b6104db565b6100ff6101ca366004610718565b610576565b6000546001600160a01b031633146102025760405162461bcd60e51b81526004016101f9906107aa565b60405180910390fd5b600280546001600160a01b0319166001600160a01b0392909216919091179055565b6003546001600160a01b031633148061024757506000546001600160a01b031633145b61029f5760405162461bcd60e51b8152602060048201526024808201527f44654669414953747261743a3a6f6e6c79476f7665726e616e63653a204e6f746044820152631033b7bb60e11b60648201526084016101f9565b8281146103145760405162461bcd60e51b815260206004820152603d60248201527f44654669414953747261743a3a75706461746542616c616e63653a205f75736560448201527f72732e6c656e67746820213d205f62616c616e6365732e6c656e67746800000060648201526084016101f9565b60005b838110156103ab5782828281811061033f57634e487b7160e01b600052603260045260246000fd5b905060200201356001600087878581811061036a57634e487b7160e01b600052603260045260246000fd5b905060200201602081019061037f91906106f7565b6001600160a01b03168152602081019190915260400160002055806103a38161080e565b915050610317565b5050505050565b6002546000906001600160a01b0316331461040f5760405162461bcd60e51b815260206004820152601e60248201527f44654669414953747261743a3a6f6e6c794661726d3a204e6f7420676f76000060448201526064016101f9565b6001600160a01b038316600090815260016020526040812080549091849183919061043b9084906107df565b9091555061044c90504360056107df565b6001919091015550919050565b6000546001600160a01b031633146104835760405162461bcd60e51b81526004016101f9906107aa565b61048d6000610641565b565b6000546001600160a01b031633146104b95760405162461bcd60e51b81526004016101f9906107aa565b600380546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b031633146105055760405162461bcd60e51b81526004016101f9906107aa565b6001600160a01b03811661056a5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016101f9565b61057381610641565b50565b6002546000906001600160a01b031633146105d35760405162461bcd60e51b815260206004820152601e60248201527f44654669414953747261743a3a6f6e6c794661726d3a204e6f7420676f76000060448201526064016101f9565b6001600160a01b038316600090815260016020819052604090912090810154431161062d5760405162461bcd60e51b815260206004820152600a60248201526953616d6520626c6f636b60b01b60448201526064016101f9565b8281600001600082825461043b91906107f7565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b80356001600160a01b03811681146106a857600080fd5b919050565b60008083601f8401126106be578182fd5b50813567ffffffffffffffff8111156106d5578182fd5b6020830191508360208260051b85010111156106f057600080fd5b9250929050565b600060208284031215610708578081fd5b61071182610691565b9392505050565b6000806040838503121561072a578081fd5b61073383610691565b946020939093013593505050565b60008060008060408587031215610756578182fd5b843567ffffffffffffffff8082111561076d578384fd5b610779888389016106ad565b90965094506020870135915080821115610791578384fd5b5061079e878288016106ad565b95989497509550505050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b600082198211156107f2576107f2610829565b500190565b60008282101561080957610809610829565b500390565b600060001982141561082257610822610829565b5060010190565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220a876e0e4b497f8f38874efc4f133af0e0ac9e11548cdc30c6e9346b4ffd5c19164736f6c63430008040033";

type DeFiAIStratConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DeFiAIStratConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DeFiAIStrat__factory extends ContractFactory {
  constructor(...args: DeFiAIStratConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "DeFiAIStrat";
  }

  deploy(
    _devAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DeFiAIStrat> {
    return super.deploy(_devAddress, overrides || {}) as Promise<DeFiAIStrat>;
  }
  getDeployTransaction(
    _devAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_devAddress, overrides || {});
  }
  attach(address: string): DeFiAIStrat {
    return super.attach(address) as DeFiAIStrat;
  }
  connect(signer: Signer): DeFiAIStrat__factory {
    return super.connect(signer) as DeFiAIStrat__factory;
  }
  static readonly contractName: "DeFiAIStrat";
  public readonly contractName: "DeFiAIStrat";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DeFiAIStratInterface {
    return new utils.Interface(_abi) as DeFiAIStratInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DeFiAIStrat {
    return new Contract(address, _abi, signerOrProvider) as DeFiAIStrat;
  }
}
