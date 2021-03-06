/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC20, ERC20Interface } from "../ERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000bf838038062000bf88339810160408190526200003491620001b8565b81516200004990600390602085019062000075565b5080516200005f90600490602084019062000075565b50506005805460ff19166012179055506200021f565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620000b857805160ff1916838001178555620000e8565b82800160010185558215620000e8579182015b82811115620000e8578251825591602001919060010190620000cb565b50620000f6929150620000fa565b5090565b5b80821115620000f65760008155600101620000fb565b600082601f83011262000122578081fd5b81516001600160401b038082111562000139578283fd5b6040516020601f8401601f19168201810183811183821017156200015b578586fd5b806040525081945083825286818588010111156200017857600080fd5b600092505b838310156200019c57858301810151828401820152918201916200017d565b83831115620001ae5760008185840101525b5050505092915050565b60008060408385031215620001cb578182fd5b82516001600160401b0380821115620001e2578384fd5b620001f08683870162000111565b9350602085015191508082111562000206578283fd5b50620002158582860162000111565b9150509250929050565b6109c9806200022f6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461012957806370a082311461013c57806395d89b411461014f578063a457c2d714610157578063a9059cbb1461016a578063dd62ed3e1461017d576100a9565b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100ec57806323b872dd14610101578063313ce56714610114575b600080fd5b6100b6610190565b6040516100c39190610759565b60405180910390f35b6100df6100da366004610724565b610226565b6040516100c3919061074e565b6100f4610244565b6040516100c391906108f1565b6100df61010f3660046106e4565b61024a565b61011c6102d1565b6040516100c391906108fa565b6100df610137366004610724565b6102da565b6100f461014a366004610695565b610328565b6100b6610343565b6100df610165366004610724565b6103a4565b6100df610178366004610724565b61040c565b6100f461018b3660046106b0565b610420565b60038054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561021c5780601f106101f15761010080835404028352916020019161021c565b820191906000526020600020905b8154815290600101906020018083116101ff57829003601f168201915b5050505050905090565b600061023a61023361044b565b848461044f565b5060015b92915050565b60025490565b600061025784848461050c565b6102c78461026361044b565b6102c285604051806060016040528060288152602001610947602891396001600160a01b038a166000908152600160205260408120906102a161044b565b6001600160a01b031681526020810191909152604001600020549190610621565b61044f565b5060019392505050565b60055460ff1690565b600061023a6102e761044b565b846102c285600160006102f861044b565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549061064d565b6001600160a01b031660009081526020819052604090205490565b60048054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561021c5780601f106101f15761010080835404028352916020019161021c565b600061023a6103b161044b565b846102c28560405180606001604052806025815260200161096f60259139600160006103db61044b565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190610621565b600061023a61041961044b565b848461050c565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b3390565b6001600160a01b03831661047e5760405162461bcd60e51b8152600401610475906108ad565b60405180910390fd5b6001600160a01b0382166104a45760405162461bcd60e51b8152600401610475906107ef565b6001600160a01b0380841660008181526001602090815260408083209487168084529490915290819020849055517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906104ff9085906108f1565b60405180910390a3505050565b6001600160a01b0383166105325760405162461bcd60e51b815260040161047590610868565b6001600160a01b0382166105585760405162461bcd60e51b8152600401610475906107ac565b610563838383610679565b6105a081604051806060016040528060268152602001610921602691396001600160a01b0386166000908152602081905260409020549190610621565b6001600160a01b0380851660009081526020819052604080822093909355908416815220546105cf908261064d565b6001600160a01b0380841660008181526020819052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906104ff9085906108f1565b600081848411156106455760405162461bcd60e51b81526004016104759190610759565b505050900390565b6000828201838110156106725760405162461bcd60e51b815260040161047590610831565b9392505050565b505050565b80356001600160a01b038116811461023e57600080fd5b6000602082840312156106a6578081fd5b610672838361067e565b600080604083850312156106c2578081fd5b6106cc848461067e565b91506106db846020850161067e565b90509250929050565b6000806000606084860312156106f8578081fd5b833561070381610908565b9250602084013561071381610908565b929592945050506040919091013590565b60008060408385031215610736578182fd5b610740848461067e565b946020939093013593505050565b901515815260200190565b6000602080835283518082850152825b8181101561078557858101830151858201604001528201610769565b818111156107965783604083870101525b50601f01601f1916929092016040019392505050565b60208082526023908201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260408201526265737360e81b606082015260800190565b60208082526022908201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604082015261737360f01b606082015260800190565b6020808252601b908201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604082015260600190565b60208082526025908201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604082015264647265737360d81b606082015260800190565b60208082526024908201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646040820152637265737360e01b606082015260800190565b90815260200190565b60ff91909116815260200190565b6001600160a01b038116811461091d57600080fd5b5056fe45524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa264697066735822122074244e964818f9f1f06145069859809ebc5b8d0d28af652b5d68f5e495732b7164736f6c634300060c0033";

type ERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20__factory extends ContractFactory {
  constructor(...args: ERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "ERC20";
  }

  deploy(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC20> {
    return super.deploy(name, symbol, overrides || {}) as Promise<ERC20>;
  }
  getDeployTransaction(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  attach(address: string): ERC20 {
    return super.attach(address) as ERC20;
  }
  connect(signer: Signer): ERC20__factory {
    return super.connect(signer) as ERC20__factory;
  }
  static readonly contractName: "ERC20";
  public readonly contractName: "ERC20";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20Interface {
    return new utils.Interface(_abi) as ERC20Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC20 {
    return new Contract(address, _abi, signerOrProvider) as ERC20;
  }
}
