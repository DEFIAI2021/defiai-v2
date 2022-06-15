import { parseEther } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumberish, ContractTransaction } from "ethers";
import { ethers } from "hardhat";
import {
  CakeToken__factory,
  IBEP20,
  IPancakeFactory,
  IPancakePair,
  IPancakeRouter02,
  MasterChef,
  MasterChef__factory,
  PancakeFactory,
  PancakeFactory__factory,
  PancakeRouter__factory,
  SyrupBar__factory,
} from "../../types";

export const deployPCSFixture = async (
  ownerAddress: string,
  devAddress: string,
  wbnbAddress: string,
  premintAccounts: string[]
): Promise<any> => {
  const [
    CakeTokenFactory,
    SyrupBarFactory,
    MasterChefFactory,
    PancakeFactoryFactory,
    PancakeRouterFactory,
  ] = await Promise.all([
    (await ethers.getContractFactory("CakeToken")) as CakeToken__factory,
    (await ethers.getContractFactory("SyrupBar")) as SyrupBar__factory,
    (await ethers.getContractFactory("MasterChef")) as MasterChef__factory,
    (await ethers.getContractFactory(
      "PancakeFactory"
    )) as PancakeFactory__factory,
    (await ethers.getContractFactory(
      "PancakeRouter"
    )) as PancakeRouter__factory,
  ]);

  const cake = await CakeTokenFactory.deploy();
  const syrupBar = await SyrupBarFactory.deploy(cake.address);
  const masterChef = await MasterChefFactory.deploy(
    cake.address,
    syrupBar.address,
    devAddress,
    // parseEther("1000"),
    parseEther("40"),
    100
  );
  const factory = await PancakeFactoryFactory.deploy(ownerAddress);
  const routerV2 = await PancakeRouterFactory.deploy(
    factory.address,
    wbnbAddress
  );
  const premints: Promise<ContractTransaction>[] = [];
  premintAccounts.forEach((account) => {
    premints.push(
      cake["mint(address,uint256)"](account, parseEther("1000000"))
    );
  });

  await Promise.all(premints);

  await Promise.all([
    cake.transferOwnership(masterChef.address),
    syrupBar.transferOwnership(masterChef.address),
  ]);

  return { cake, syrupBar, masterChef, factory, routerV2 };
};

export const createPCSPair = async (
  signer: SignerWithAddress,
  token0: IBEP20,
  token1: IBEP20,
  token0Amount: BigNumberish,
  token1Amount: BigNumberish,
  routerV2: IPancakeRouter02,
  factory: PancakeFactory,
  masterChef?: MasterChef,
  allocPoint: BigNumberish = 0
): Promise<IPancakePair> => {
  await Promise.all([
    factory.createPair(token0.address, token1.address),
    token0.approve(routerV2.address, token0Amount),
    token1.approve(routerV2.address, token1Amount),
  ]);

  await routerV2.addLiquidity(
    token0.address,
    token1.address,
    token0Amount,
    token1Amount,
    "0",
    "0",
    signer.address,
    "1666029098"
  );
  const pair = (await ethers.getContractAt(
    "PancakePair",
    await factory.getPair(token0.address, token1.address)
  )) as IPancakePair;

  if (masterChef) {
    await masterChef.add(allocPoint, pair.address, false);
  }
  return pair;
};

export const addLiquidity = async (
  signer: SignerWithAddress,
  token0: IBEP20,
  token1: IBEP20,
  routerV2: IPancakeRouter02,
  token0Amount: string,
  token1Amount: string
): Promise<void> => {
  await Promise.all([
    token0.connect(signer).approve(routerV2.address, parseEther(token0Amount)),
    token1.connect(signer).approve(routerV2.address, parseEther(token1Amount)),
  ]);

  await routerV2
    .connect(signer)
    .addLiquidity(
      token0.address,
      token1.address,
      parseEther(token0Amount),
      parseEther(token1Amount),
      "0",
      "0",
      signer.address,
      "1666029098"
    );
};
