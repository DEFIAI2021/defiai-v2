import { expect } from "chai";
import { BigNumberish, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { deployments } from "hardhat";
import {
  DeFiAIFarmV2, DeFiAIStableStrat, FakeToken,
} from "../types";
import CONSTANTS from "../shared/constants";
import { mineBlocks } from "../shared/util";

describe("Farm Deposit", async () => {
  describe("BUSD", async () => {
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
        await BUSD.connect(bob).approve(
          DEFIAIFarm.address,
          CONSTANTS.MAX_VALUE
        );
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

    it("should deposit into farm", async () => {
      const { alice, DEFIAIFarm, BUSDStrat, BUSD, USDT } = await setup();

      await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));

      // expect(await BUSDStrat.balances(alice._address)).to.eq(
      //   parseEther("10000")
      // );
    });
  });
});
