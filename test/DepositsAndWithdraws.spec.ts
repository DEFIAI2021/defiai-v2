import { expect } from "chai";
import { BigNumberish, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import hre, { deployments } from "hardhat";
import {
  DeFiAIFarmV2,
  DeFiAIStableStrat,
  FakeToken,
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

      const others = await getUnnamedAccounts();
      const alice = ethers.provider.getSigner(others[0]);
      const bob = ethers.provider.getSigner(others[1]);

      await BUSD.connect(alice).devMint(parseEther("2500000"));
      await BUSD.connect(bob).devMint(parseEther("2500000"));
      await BUSD.connect(alice).approve(
        DEFIAIFarm.address,
        CONSTANTS.MAX_VALUE
      );
      await BUSD.connect(bob).approve(DEFIAIFarm.address, CONSTANTS.MAX_VALUE);
      return {
        alice,
        bob,
        DEFIAIFarm,
        BUSDStrat,
        BUSD,
        USDT,
      };
    }
  );
  describe("Deposits", async () => {
    it("should deposit into farm", async () => {
      const { alice, DEFIAIFarm, BUSDStrat, BUSD, USDT } = await setup();

      await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));

      // expect(await BUSDStrat.balances(alice._address)).to.eq(
      //   parseEther("10000")
      // );
    });
  });

  describe("Withdraws", async () => {
    it("should charge the withdrawal fee for early withdrawals");
    it("should charge the min fee for early withdrawals");

    it("should withdraw from farm, single user", async () => {
      const { alice, bob, DEFIAIFarm, BUSDStrat, BUSD, USDT } = await setup();

      // await DEFIAIFarm.connect(bob).deposit(0, parseEther("10000"));
      await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
      const oldBalance = await BUSD.balanceOf(alice._address);
      await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"));
      const newBalance = await BUSD.balanceOf(alice._address);

      await provider.request({
        method: "evm_increaseTime",
        params: [86400 * 3],
      });

      await mineBlocks(provider, 1);

      // expect(newBalance.sub(oldBalance)).to.be.below(parseEther("10000"));
      // expect(newBalance.sub(oldBalance)).to.be.above(parseEther("9979"));
    });

    it("should withdraw from farm, multiple users");
    it("should withdraw all from farm, multiple users, last user");
  });
});
