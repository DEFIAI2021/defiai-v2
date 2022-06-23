import { expect } from "chai";
import { BigNumberish, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import hre, { deployments } from "hardhat";
import {
  DeFiAIFarmV2,
  DeFiAIStableStrat,
  FakeToken,
  CakeToken,
  CakeToken__factory,
} from "../types";
import CONSTANTS from "../shared/constants";
import { mineBlocks } from "../shared/util";

const provider = hre.network.provider;

describe("Farm Withdraw", async () => {
  const setup = deployments.createFixture(
    async ({ deployments, getUnnamedAccounts, ethers }, options) => {
      await deployments.fixture("Strategy_set");

      const DEFIAIFarm = (await ethers.getContract(
        "DeFiAIFarmV2"
      )) as DeFiAIFarmV2;
      const BUSD = (await ethers.getContract("BUSD")) as FakeToken;
      const USDT = (await ethers.getContract("USDT")) as FakeToken;
      const BUSDStrat = (await ethers.getContract(
        "DeFiAIStableStrat"
      )) as DeFiAIStableStrat;
      const CAKE = (await ethers.getContract("CakeToken")) as CakeToken;

      const others = await getUnnamedAccounts();
      const alice = ethers.provider.getSigner(others[0]);
      const bob = ethers.provider.getSigner(others[1]);
      const dev = ethers.provider.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      
      await BUSD.connect(alice).devMint(parseEther("2500000"));
      await BUSD.connect(bob).devMint(parseEther("2500000"));
      await BUSD.connect(dev).devMint(parseEther("2500000"));
      await BUSD.connect(alice).approve(
        DEFIAIFarm.address,
        CONSTANTS.MAX_VALUE
      );
      await BUSD.connect(bob).approve(DEFIAIFarm.address, CONSTANTS.MAX_VALUE);
      await BUSD.connect(dev).approve(
        DEFIAIFarm.address,
        CONSTANTS.MAX_VALUE
      );
      await DEFIAIFarm.connect(dev).initialize(BUSD.address, BUSDStrat.address);

      return {
        alice,
        bob,
        DEFIAIFarm,
        BUSDStrat,
        BUSD,
        USDT,
        CAKE,
        dev,
      };
    }
  );
  describe("Deposits", async () => {
    it("should deposit into farm", async () => {
      const { alice, DEFIAIFarm, BUSDStrat } = await setup();

      await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));

      expect(await BUSDStrat.balances(alice._address)).to.eq(
        parseEther("10000")
      );
    });
  });

  describe("Withdraws", async () => {
    it("should withdraw from farm, single user", async () => {
      const { alice, DEFIAIFarm, BUSD ,CAKE,dev } = await setup();

      await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
      const oldBalance = await BUSD.balanceOf(alice._address);
     
      await provider.request({
        method: "evm_increaseTime",
        params: [86400 * 3],
      });

      await mineBlocks(provider, 100);

      await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"));
      const newBalance = await BUSD.balanceOf(alice._address);
      const reward = await CAKE.balanceOf(alice._address);

      
      expect(newBalance.sub(oldBalance)).to.be.below(parseEther("10000"));
      expect(newBalance.sub(oldBalance)).to.be.above(parseEther("9979"));
      expect(reward).to.be.above(parseEther("1"));
    });
  });
});
