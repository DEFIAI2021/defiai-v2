import { expect } from "chai";
import { BigNumberish, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { deployments } from "hardhat";
import {
  DeFiAIFarmV2, DeFiAIStableStrat, FakeToken,
} from "../types";
import CONSTANTS from "../shared/constants";
import { mineBlocks } from "../shared/util";
import { parse } from "path";

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
        const gov = ethers.provider.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

        await BUSD.connect(alice).devMint(parseEther("2500000"));
        await BUSD.connect(bob).devMint(parseEther("2500000"));
        await BUSD.connect(gov).devMint(parseEther("2500000"));

        await BUSD.connect(alice).approve(
          DEFIAIFarm.address,
          CONSTANTS.MAX_VALUE
        );
        await BUSD.connect(alice).approve(
          BUSDStrat.address,
          CONSTANTS.MAX_VALUE
        );
        await BUSD.connect(bob).approve(
          DEFIAIFarm.address,
          CONSTANTS.MAX_VALUE
        );
        await BUSD.connect(gov).approve(
          DEFIAIFarm.address,
          CONSTANTS.MAX_VALUE
        );
        await DEFIAIFarm.connect(gov).initialize(BUSD.address, BUSDStrat.address);


        console.log("alice", alice._address);
        console.log("bob", bob._address);
        console.log("DEFIAIFarm", DEFIAIFarm.address);
        console.log("BUSDStrat", BUSDStrat.address);
        console.log("BUSD", BUSD.address);
        console.log("USDT", USDT.address);
        return {
          alice,
          bob,
          DEFIAIFarm,
          BUSDStrat,
          BUSD,
          USDT,
          gov
        };
      }
    );

    it("should deposit into farm1", async () => {
      const { alice, DEFIAIFarm, BUSDStrat, BUSD, USDT, gov } = await setup();
      await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));

      expect(await BUSDStrat.balances(alice._address)).to.eq(
        parseEther("10000")
      );
    });
  });
});
