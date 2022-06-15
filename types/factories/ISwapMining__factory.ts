/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ISwapMining, ISwapMiningInterface } from "../ISwapMining";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "input",
        type: "address",
      },
      {
        internalType: "address",
        name: "output",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "swap",
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

export class ISwapMining__factory {
  static readonly abi = _abi;
  static createInterface(): ISwapMiningInterface {
    return new utils.Interface(_abi) as ISwapMiningInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ISwapMining {
    return new Contract(address, _abi, signerOrProvider) as ISwapMining;
  }
}
