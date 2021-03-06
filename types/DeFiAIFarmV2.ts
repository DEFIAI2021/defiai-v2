/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface DeFiAIFarmV2Interface extends utils.Interface {
  contractName: "DeFiAIFarmV2";
  functions: {
    "deposit(uint256)": FunctionFragment;
    "devAddress()": FunctionFragment;
    "getDevAddress()": FunctionFragment;
    "getPoolInfo()": FunctionFragment;
    "getTotalBalance(address)": FunctionFragment;
    "initialize(address,address)": FunctionFragment;
    "isInit()": FunctionFragment;
    "owner()": FunctionFragment;
    "poolInfo()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdraw(uint256,uint8)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "deposit",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "devAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getDevAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPoolInfo",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalBalance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "isInit", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "poolInfo", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "devAddress", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getDevAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPoolInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isInit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "poolInfo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Deposit(address,uint256,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Withdraw(address,uint256,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export type DepositEvent = TypedEvent<
  [string, BigNumber, string],
  { user: string; amount: BigNumber; wantAddress: string }
>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type WithdrawEvent = TypedEvent<
  [string, BigNumber, string],
  { user: string; amount: BigNumber; wantAddress: string }
>;

export type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;

export interface DeFiAIFarmV2 extends BaseContract {
  contractName: "DeFiAIFarmV2";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DeFiAIFarmV2Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    deposit(
      _wantAmt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    devAddress(overrides?: CallOverrides): Promise<[string]>;

    getDevAddress(overrides?: CallOverrides): Promise<[string]>;

    getPoolInfo(overrides?: CallOverrides): Promise<[string]>;

    getTotalBalance(
      _user: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    initialize(
      _want: string,
      _strat: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isInit(overrides?: CallOverrides): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    poolInfo(
      overrides?: CallOverrides
    ): Promise<[string, string] & { want: string; strat: string }>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      _wantAmt: BigNumberish,
      _pid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  deposit(
    _wantAmt: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  devAddress(overrides?: CallOverrides): Promise<string>;

  getDevAddress(overrides?: CallOverrides): Promise<string>;

  getPoolInfo(overrides?: CallOverrides): Promise<string>;

  getTotalBalance(_user: string, overrides?: CallOverrides): Promise<BigNumber>;

  initialize(
    _want: string,
    _strat: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isInit(overrides?: CallOverrides): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  poolInfo(
    overrides?: CallOverrides
  ): Promise<[string, string] & { want: string; strat: string }>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    _wantAmt: BigNumberish,
    _pid: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deposit(_wantAmt: BigNumberish, overrides?: CallOverrides): Promise<void>;

    devAddress(overrides?: CallOverrides): Promise<string>;

    getDevAddress(overrides?: CallOverrides): Promise<string>;

    getPoolInfo(overrides?: CallOverrides): Promise<string>;

    getTotalBalance(
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _want: string,
      _strat: string,
      overrides?: CallOverrides
    ): Promise<void>;

    isInit(overrides?: CallOverrides): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    poolInfo(
      overrides?: CallOverrides
    ): Promise<[string, string] & { want: string; strat: string }>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(
      _wantAmt: BigNumberish,
      _pid: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Deposit(address,uint256,address)"(
      user?: string | null,
      amount?: null,
      wantAddress?: null
    ): DepositEventFilter;
    Deposit(
      user?: string | null,
      amount?: null,
      wantAddress?: null
    ): DepositEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "Withdraw(address,uint256,address)"(
      user?: string | null,
      amount?: null,
      wantAddress?: null
    ): WithdrawEventFilter;
    Withdraw(
      user?: string | null,
      amount?: null,
      wantAddress?: null
    ): WithdrawEventFilter;
  };

  estimateGas: {
    deposit(
      _wantAmt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    devAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getDevAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getPoolInfo(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalBalance(
      _user: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _want: string,
      _strat: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isInit(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    poolInfo(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      _wantAmt: BigNumberish,
      _pid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deposit(
      _wantAmt: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    devAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getDevAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPoolInfo(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTotalBalance(
      _user: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _want: string,
      _strat: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isInit(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    poolInfo(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      _wantAmt: BigNumberish,
      _pid: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
