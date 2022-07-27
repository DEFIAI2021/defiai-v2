/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IDeFiAIStableStrat,
  IDeFiAIStableStratInterface,
} from "../IDeFiAIStableStrat";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "balances",
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
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "claimReward",
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
      {
        internalType: "address",
        name: "_wantAddress",
        type: "address",
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
    inputs: [
      {
        internalType: "uint8",
        name: "_pid",
        type: "uint8",
      },
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
      {
        internalType: "address",
        name: "_wantAddress",
        type: "address",
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

export class IDeFiAIStableStrat__factory {
  static readonly abi = _abi;
  static createInterface(): IDeFiAIStableStratInterface {
    return new utils.Interface(_abi) as IDeFiAIStableStratInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IDeFiAIStableStrat {
    return new Contract(address, _abi, signerOrProvider) as IDeFiAIStableStrat;
  }
}