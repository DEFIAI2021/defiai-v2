/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SafeMath, SafeMathInterface } from "../SafeMath";

const _abi = [
  {
    inputs: [],
    name: "ray",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "wad",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x60b2610025600b82828239805160001a60731461001857fe5b30600052607381538281f3fe7300000000000000000000000000000000000000003014608060405260043610603d5760003560e01c8063416a8b201460425780637df38c5b14605a575b600080fd5b60486060565b60408051918252519081900360200190f35b60486070565b6b033b2e3c9fd0803ce800000090565b670de0b6b3a76400009056fea26469706673582212206bec0b179960d68c7a50d3f22a3f91e443217e60590f44abda601870d366a54764736f6c63430006060033";

type SafeMathConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SafeMathConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SafeMath__factory extends ContractFactory {
  constructor(...args: SafeMathConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "SafeMath";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SafeMath> {
    return super.deploy(overrides || {}) as Promise<SafeMath>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): SafeMath {
    return super.attach(address) as SafeMath;
  }
  connect(signer: Signer): SafeMath__factory {
    return super.connect(signer) as SafeMath__factory;
  }
  static readonly contractName: "SafeMath";
  public readonly contractName: "SafeMath";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SafeMathInterface {
    return new utils.Interface(_abi) as SafeMathInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SafeMath {
    return new Contract(address, _abi, signerOrProvider) as SafeMath;
  }
}
