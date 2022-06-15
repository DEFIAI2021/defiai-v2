import { parseEther } from "@ethersproject/units";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import CONSTANTS from "./constants";
import {
  CakeToken,
  SyrupBar,
  IPancakePair,
  MasterChef,
  PancakeFactory,
  PancakeRouter,
  BEP20__factory,
  WBNB__factory,
  DeFiAIFarm__factory,
  DeFiAIStratX2PCS__factory,
  Core__factory,
  VestingMaster__factory,
  USDMToken__factory,
  DeFiAiToken__factory,
  LiquidityMiningMaster__factory,
  Distributor__factory,
  Distributor,
} from "../../types";
import { createPCSPair, deployPCSFixture } from "./pancake";

let cake: CakeToken;
let syrupBar: SyrupBar;
let cakeBnb: IPancakePair;
let masterChef: MasterChef;
let factory: PancakeFactory;
let routerV2: PancakeRouter;

export const deployMarsFixture = async (
  owner: SignerWithAddress,
  devAddress: string,
  premintAccounts: string[]
): Promise<any> => {
  const [Bep20Factory, WBnbFactory] = await Promise.all([
    (await ethers.getContractFactory("BEP20")) as BEP20__factory,
    (await ethers.getContractFactory("WBNB")) as WBNB__factory,
  ]);

  const [wbnb, eth, btc] = await Promise.all([
    WBnbFactory.deploy(),
    Bep20Factory.deploy("Pegged Ether", "ETH"),
    Bep20Factory.deploy("Pegged Bitcoim", "BTCB"),
  ]);

  await Promise.all([
    await wbnb.devMint(parseEther("1000000000")),
    await eth.devMint(parseEther("1000000000")),
    await btc.devMint(parseEther("1000000000")),
  ]);

  ({ cake, syrupBar, masterChef, factory, routerV2 } = await deployPCSFixture(
    owner.address,
    devAddress,
    wbnb.address,
    premintAccounts
  ));

  await cake.devMint(parseEther("1000000000"));

  const [
    MarsFarmFactory,
    DeFiAIStratX2PCSFactory,
    CoreFactory,
    VestingMasterFactory,
    USDMTokenFactory,
    DeFiAiTokenFactory,
    LiquidityMiningMasterFactory,
    Distributor,
  ] = await Promise.all([
    (await ethers.getContractFactory("DeFiAIFarm")) as DeFiAIFarm__factory,
    (await ethers.getContractFactory(
      "DeFiAIStratX2_PCS"
    )) as DeFiAIStratX2PCS__factory,
    (await ethers.getContractFactory("Core")) as Core__factory,
    (await ethers.getContractFactory(
      "VestingMaster"
    )) as VestingMaster__factory,
    (await ethers.getContractFactory("USDMToken")) as USDMToken__factory,
    (await ethers.getContractFactory("DeFiAiToken")) as DeFiAiToken__factory,
    (await ethers.getContractFactory(
      "LiquidityMiningMaster"
    )) as LiquidityMiningMaster__factory,
    (await ethers.getContractFactory("Distributor")) as Distributor__factory,
  ]);

  // const core = await CoreFactory.deploy();
  const defiai = await DeFiAiTokenFactory.deploy();
  const vestingMaster = await VestingMasterFactory.deploy(
    172800,
    44,
    defiai.address,
    devAddress
  );
  const defiaiFarm = await MarsFarmFactory.deploy(
    vestingMaster.address,
    defiai.address,
    parseEther("12"),
    "120",
    "10000",
    devAddress,
    "10",
    "9900",
    "259200"
  );
  const ethLMMaster = await LiquidityMiningMasterFactory.deploy(
    defiai.address,
    vestingMaster.address,
    eth.address,
    parseEther("0.00009296"),
    "100",
    "10000"
  );

  const btcLMMaster = await LiquidityMiningMasterFactory.deploy(
    defiai.address,
    vestingMaster.address,
    btc.address,
    parseEther("0.000002811"),
    "100",
    "10000"
  );

  const defiaiLMMaster = await LiquidityMiningMasterFactory.deploy(
    defiai.address,
    vestingMaster.address,
    defiai.address,
    parseEther("37.84"),
    "100",
    "10000"
  );

  const distributor = await Distributor.deploy(
    [
      defiai.address,
      wbnb.address,
      routerV2.address,
      defiaiLMMaster.address,
      devAddress,
    ],
    [defiai.address, wbnb.address],
    "300",
    "10000000000",
    "9950",
    "300"
  );

  await Promise.all([
    // distributor.add(defiai.address, "10000", defiaiLMMaster.address, [
    //   wbnb.address,
    //   btc.address,
    // ]),
    distributor.add(eth.address, "10000", ethLMMaster.address, [
      wbnb.address,
      eth.address,
    ]),
  ]);

  await Promise.all([
    vestingMaster.setFarm(defiaiFarm.address),
    defiai.transfer(defiaiFarm.address, parseEther("100000")),
    // eth.transfer(eth.address, parseEther("100000")),
  ]);

  cakeBnb = await createPCSPair(
    owner,
    cake,
    <never>wbnb,
    parseEther("130700000"),
    parseEther("302960"),
    routerV2,
    factory,
    masterChef,
    1000
  );

  await createPCSPair(
    owner,
    <never>defiai,
    <never>wbnb,
    parseEther("40000000"),
    parseEther("80"),
    routerV2,
    factory
  );

  await createPCSPair(
    owner,
    eth,
    <never>wbnb,
    parseEther("15590"),
    parseEther("112260"),
    routerV2,
    factory
  );

  // await createPCSPair(
  //   owner,
  //   <never>defiai,
  //   <never>wbnb,
  //   routerV2,
  //   factory,
  //   masterChef,
  //   0
  // );

  const cakeStrat = await DeFiAIStratX2PCSFactory.deploy(
    [
      wbnb.address,
      defiaiFarm.address,
      cake.address,
      cake.address,
      masterChef.address,
      distributor.address,
      devAddress,
      routerV2.address,
      defiai.address,
    ],
    0,
    [cake.address, wbnb.address, defiai.address],
    [cake.address, wbnb.address],
    500,
    true
  );
  const cakeBnbStrat = await DeFiAIStratX2PCSFactory.deploy(
    [
      wbnb.address,
      defiaiFarm.address,
      cakeBnb.address,
      cake.address,
      masterChef.address,
      distributor.address,
      devAddress,
      routerV2.address,
      defiai.address,
    ],
    1,
    [cake.address, wbnb.address, defiai.address],
    [cake.address, wbnb.address],
    500,
    false
  );

  await defiaiFarm.add("1000", cake.address, false, cakeStrat.address);
  await defiaiFarm.add("1000", cakeBnb.address, false, cakeBnbStrat.address);

  console.log("================= Deployed Addresses =================");
  console.log(`
  INIT_CODE_HASH: ${await factory.INIT_CODE_PAIR_HASH()}
  WBNB: ${wbnb.address}
  Cake: ${cake.address}
  ETH: ${eth.address}
  MasterChef: ${masterChef.address}
  CAKEBNB: ${cakeBnb.address}
  DeFiAI: ${defiai.address}
  DeFiAIFarm: ${defiaiFarm.address}
  LiquidityMiningMaster (BTC): ${btc.address}
  LiquidityMiningMaster (DeFiAI): ${defiai.address}
  LiquidityMiningMaster (ETH): ${ethLMMaster.address}
  VestingMaster: ${vestingMaster.address}
  CakeStrategy: ${cakeStrat.address}
  Cake-BNBStrategy: ${cakeBnbStrat.address}
  `);
  // USDM: ${usdM.address}
  console.log("=================================");

  return {
    wbnb,
    defiai,
    vestingMaster,
    defiaiLMMaster,
    ethLMMaster,
    btcLMMaster,
    defiaiFarm,
    cake,
    cakeBnb,
    cakeStrat,
    cakeBnbStrat,
    routerV2,
    factory,
    eth,
    btc,
    distributor,
  };
};
