import { deployments } from "hardhat";
import {
  CakeToken,
  FakeStrat,
  FakeToken,
  MasterChef,
  MinoFarm,
  PancakeFactory,
  PancakeRouter,
} from "../../types";

export const pcsFixture = deployments.createFixture(
  async ({ deployments, getNamedAccounts, ethers }, options) => {
    await deployments.fixture("PCS");
    const Cake = (await ethers.getContract("CakeToken")) as CakeToken;
    const PancakeFactory = (await ethers.getContract(
      "PancakeFactory"
    )) as PancakeFactory;
    const PancakeRouter = (await ethers.getContract(
      "PancakeRouter"
    )) as PancakeRouter;
    const MasterChef = (await ethers.getContract("MasterChef")) as MasterChef;

    return {
      Cake,
      PancakeFactory,
      PancakeRouter,
      MasterChef,
    };
  }
);

export const farmFixture = deployments.createFixture(
  async ({ deployments, getNamedAccounts, ethers }, options) => {
    await deployments.fixture(["FakeStrategy_deploy", "MinoFarm_deploy"]);
    const MinoFarm = (await ethers.getContract("MinoFarm")) as MinoFarm;
    const FakeToken = (await ethers.getContract("FAKE")) as FakeToken;
    const FakeStrat = (await ethers.getContract("FakeStrat")) as FakeStrat;
    return {
      MinoFarm,
      FakeToken,
      FakeStrat,
    };
  }
);
