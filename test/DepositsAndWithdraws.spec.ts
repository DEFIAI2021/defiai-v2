import { expect } from "chai";
import { BigNumberish, Signer } from "ethers";
import { parseEther, formatEther} from "ethers/lib/utils";
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
import { parse } from "path";

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
			const peter = ethers.provider.getSigner(others[2]);
			const dev = ethers.provider.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
			const newdev = ethers.provider.getSigner(others[3]);

			await BUSD.connect(alice).devMint(parseEther("2500000"));
			await BUSD.connect(bob).devMint(parseEther("2500000"));
			await BUSD.connect(dev).devMint(parseEther("2500000"));
			await BUSD.connect(peter).devMint(parseEther("2500000"));
			await BUSD.connect(newdev).devMint(parseEther("2500000"));
			await BUSD.connect(alice).approve(DEFIAIFarm.address, CONSTANTS.MAX_VALUE);
			await BUSD.connect(bob).approve(DEFIAIFarm.address, CONSTANTS.MAX_VALUE);
			await BUSD.connect(dev).approve(DEFIAIFarm.address, CONSTANTS.MAX_VALUE);
			await BUSD.connect(newdev).approve(DEFIAIFarm.address, CONSTANTS.MAX_VALUE);
			await DEFIAIFarm.connect(dev).initialize(BUSD.address, BUSDStrat.address);


			return {
				alice,
				bob,
				peter,
				DEFIAIFarm,
				BUSDStrat,
				BUSD,
				USDT,
				CAKE,
				dev,
        		newdev
			};
		}
	);
	describe("Deposits", async () => {
		it("should approve contract before farm", async () => {
			const { peter, DEFIAIFarm, BUSDStrat, BUSD } = await setup();

			await expect(DEFIAIFarm.connect(peter).deposit(parseEther("10000"))).to.be.reverted;
			await BUSD.connect(peter).approve(DEFIAIFarm.address, CONSTANTS.MAX_VALUE);

			await BUSD.connect(peter).approve(DEFIAIFarm.address, CONSTANTS.MAX_VALUE);
			await DEFIAIFarm.connect(peter).deposit(parseEther("10000"));
			expect((await BUSDStrat.userInfo(peter._address, 0)).balance).to.be.eq(parseEther("10000"))
			expect((await BUSDStrat.farmInfo(0)).totalShare).to.be.eq(parseEther("10000"));
			expect((await BUSDStrat.farmInfo(1)).totalShare).to.be.eq(parseEther("0"));
			expect((await BUSDStrat.farmInfo(2)).totalShare).to.be.eq(parseEther("0"));


		});
	});


	describe("Deposits", async () => {
		it("should not deposit zero or negative value into farm", async () => {
			const { alice, DEFIAIFarm, BUSDStrat } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));

			await expect(DEFIAIFarm.connect(alice).deposit(parseEther("0"))).to.be.reverted;
			await expect(DEFIAIFarm.connect(alice).deposit(parseEther("-1"))).to.be.reverted;
			await expect(DEFIAIFarm.connect(alice).deposit(CONSTANTS.MAX_VALUE)).to.be.reverted;
			await expect(DEFIAIFarm.connect(alice).deposit(("0.1"))).to.be.reverted;
			await expect(DEFIAIFarm.connect(alice).deposit(("-0.1"))).to.be.reverted;
		});
	});

	describe("Withdraws", async () => {
		it("should not withdraw invalid amount from farm", async () => {
			const { alice, DEFIAIFarm, BUSDStrat, BUSD } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("2000"));
			const oldBalance = await BUSD.balanceOf(alice._address);
			expect((await BUSDStrat.userInfo(alice._address, 0)).balance).to.be.eq(parseEther("2000"))
			expect((await BUSDStrat.farmInfo(0)).totalShare).to.be.eq(parseEther("2000"));
			expect((await BUSDStrat.farmInfo(1)).totalShare).to.be.eq(parseEther("0"));
			expect((await BUSDStrat.farmInfo(2)).totalShare).to.be.eq(parseEther("0"));

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 10);

			await expect(DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 0)).to.be.reverted;
			await expect(DEFIAIFarm.connect(alice).withdraw(parseEther("-1"), 0)).to.be.reverted;

			await DEFIAIFarm.connect(alice).withdraw(parseEther("2000"), 0)
			const newBalance = await BUSD.balanceOf(alice._address);
			expect(newBalance.sub(oldBalance)).to.be.below(parseEther("2000"));
			expect(newBalance.sub(oldBalance)).to.be.above(parseEther("1991"));
			expect((await BUSDStrat.farmInfo(0)).totalShare).to.be.below(parseEther("2000"));
			expect((await BUSDStrat.farmInfo(1)).totalShare).to.be.eq(parseEther("0"));
			expect((await BUSDStrat.farmInfo(2)).totalShare).to.be.eq(parseEther("0"));


		});
	})

	describe("Deposits", async () => {
		it("should deposit from farm, single user", async () => {
			const { alice, DEFIAIFarm, BUSDStrat } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			expect((await BUSDStrat.userInfo(alice._address, 0)).balance).to.be.eq(parseEther("10000"))
			expect((await BUSDStrat.farmInfo(0)).totalShare).to.be.eq(parseEther("10000"));
			expect((await BUSDStrat.farmInfo(1)).totalShare).to.be.eq(parseEther("0"));
			expect((await BUSDStrat.farmInfo(2)).totalShare).to.be.eq(parseEther("0"));

			await DEFIAIFarm.connect(alice).deposit(parseEther("2000"));
			expect((await BUSDStrat.userInfo(alice._address, 0)).balance).to.be.eq(parseEther("12000"))
			expect((await BUSDStrat.farmInfo(0)).totalShare).to.be.eq(parseEther("12000"));
			expect((await BUSDStrat.farmInfo(1)).totalShare).to.be.eq(parseEther("0"));
			expect((await BUSDStrat.farmInfo(2)).totalShare).to.be.eq(parseEther("0"));


		});
	});

	describe("Withdraws", async () => {
		it("should withdraw from farm and get reward, single user", async () => {
			const { alice, DEFIAIFarm, BUSD, CAKE, BUSDStrat } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			const oldBalance = await BUSD.balanceOf(alice._address);
			expect((await BUSDStrat.farmInfo(0)).totalShare).to.be.eq(parseEther("10000"));
			expect((await BUSDStrat.farmInfo(1)).totalShare).to.be.eq(parseEther("0"));
			expect((await BUSDStrat.farmInfo(2)).totalShare).to.be.eq(parseEther("0"));


			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 200);
			await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 0);
			const newBalance = await BUSD.balanceOf(alice._address);
			const reward = await CAKE.balanceOf(alice._address);
			expect((await BUSDStrat.farmInfo(0)).totalShare).to.be.below(parseEther("10000"));
			expect((await BUSDStrat.farmInfo(1)).totalShare).to.be.eq(parseEther("0"));
			expect((await BUSDStrat.farmInfo(2)).totalShare).to.be.eq(parseEther("0"));
			expect(newBalance.sub(oldBalance)).to.be.below(parseEther("10000"));
			expect(newBalance.sub(oldBalance)).to.be.above(parseEther("9979"));
			expect(reward).to.be.above(parseEther("3507"));
		});
	});

	describe("Deposits", async () => {
		it("should deposit from farm, mutiple user", async () => {
			const { alice, bob, DEFIAIFarm, BUSDStrat } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			expect((await BUSDStrat.userInfo(alice._address, 0)).balance).to.be.eq(parseEther("10000"))
			expect((await BUSDStrat.farmInfo(0)).totalShare).to.be.eq(parseEther("10000"));
			expect((await BUSDStrat.farmInfo(1)).totalShare).to.be.eq(parseEther("0"));
			expect((await BUSDStrat.farmInfo(2)).totalShare).to.be.eq(parseEther("0"));
			await DEFIAIFarm.connect(bob).deposit(parseEther("10000"));
			expect((await BUSDStrat.userInfo(bob._address, 0)).balance).to.be.eq(parseEther("10000"))
			expect((await BUSDStrat.farmInfo(0)).totalShare).to.be.eq(parseEther("20000"));
			expect((await BUSDStrat.farmInfo(1)).totalShare).to.be.eq(parseEther("0"));
			expect((await BUSDStrat.farmInfo(2)).totalShare).to.be.eq(parseEther("0"));


			await DEFIAIFarm.connect(bob).deposit(parseEther("10000"));
			expect((await BUSDStrat.userInfo(bob._address, 0)).balance).to.be.eq(parseEther("20000"))
			expect((await BUSDStrat.farmInfo(0)).totalShare).to.be.eq(parseEther("30000"));
			expect((await BUSDStrat.farmInfo(1)).totalShare).to.be.eq(parseEther("0"));
			expect((await BUSDStrat.farmInfo(2)).totalShare).to.be.eq(parseEther("0"));
			await DEFIAIFarm.connect(alice).deposit(parseEther("2000"));
			expect((await BUSDStrat.userInfo(alice._address, 0)).balance).to.be.eq(parseEther("12000"))
			expect((await BUSDStrat.farmInfo(0)).totalShare).to.be.eq(parseEther("32000"));
			expect((await BUSDStrat.farmInfo(1)).totalShare).to.be.eq(parseEther("0"));
			expect((await BUSDStrat.farmInfo(2)).totalShare).to.be.eq(parseEther("0"));



		});
	});


	describe("Withdraws", async () => {
		it("should withdraw from farm,multiple user (Case1)", async () => {
			const { alice, bob, DEFIAIFarm, BUSD, CAKE } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			await DEFIAIFarm.connect(bob).deposit(parseEther("10000"));
			const oldBalance_alice = await BUSD.balanceOf(alice._address);
			const oldBalance_bob = await BUSD.balanceOf(alice._address);

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 100);

			await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 0);
			await DEFIAIFarm.connect(bob).withdraw(parseEther("10000"), 0);

			const newBalance_alice = await BUSD.balanceOf(alice._address);
			const newBalance_bob = await BUSD.balanceOf(bob._address);

			expect(newBalance_bob.sub(oldBalance_bob)).to.be.below(parseEther("10000"));
			expect(newBalance_bob.sub(oldBalance_bob)).to.be.above(parseEther("9979"));
			expect(newBalance_alice.sub(oldBalance_alice)).to.be.eq(parseEther("10000"));
			expect(newBalance_alice.sub(oldBalance_alice)).to.be.above(parseEther("9979"));

			const alice_reward = await CAKE.balanceOf(alice._address);
			console.log("ALICE REWARD:",formatEther(alice_reward));
			expect(alice_reward).to.be.above(parseEther("700"));
			const bob_reward = await CAKE.balanceOf(bob._address);
			console.log("BOB REWARD:",formatEther(bob_reward));
			expect(bob_reward).to.be.above(parseEther("700"));

		});

		it("should withdraw from farm,multiple user (Case2)", async () => {
			const { alice, bob, DEFIAIFarm, BUSD, CAKE } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			await DEFIAIFarm.connect(bob).deposit(parseEther("10000"));
			const oldBalance_alice = await BUSD.balanceOf(alice._address);
			const oldBalance_bob = await BUSD.balanceOf(alice._address);

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 100);

			await DEFIAIFarm.connect(bob).withdraw(parseEther("10000"), 0);
			await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 0);
			const newBalance_alice = await BUSD.balanceOf(alice._address);
			const newBalance_bob = await BUSD.balanceOf(bob._address);

			expect(newBalance_bob.sub(oldBalance_bob)).to.be.eq(parseEther("10000"));
			expect(newBalance_bob.sub(oldBalance_bob)).to.be.above(parseEther("9979"));
			expect(newBalance_alice.sub(oldBalance_alice)).to.be.below(parseEther("10000"));
			expect(newBalance_alice.sub(oldBalance_alice)).to.be.above(parseEther("9979"));

			const alice_reward = await CAKE.balanceOf(alice._address);
			expect(alice_reward).to.be.above(parseEther("700"));
			const bob_reward = await CAKE.balanceOf(bob._address);
			expect(bob_reward).to.be.above(parseEther("700"));
		});

		it("should withdraw from farm,multiple user (Case3)", async () => {
			const { alice, bob, DEFIAIFarm, BUSD, CAKE } = await setup();

			await DEFIAIFarm.connect(bob).deposit(parseEther("10000"));
			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			const oldBalance_alice = await BUSD.balanceOf(alice._address);
			const oldBalance_bob = await BUSD.balanceOf(alice._address);

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 100);

			await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 0);
			await DEFIAIFarm.connect(bob).withdraw(parseEther("10000"), 0);
			const newBalance_alice = await BUSD.balanceOf(alice._address);
			const newBalance_bob = await BUSD.balanceOf(bob._address);

			expect(newBalance_bob.sub(oldBalance_bob)).to.be.below(parseEther("10000"));
			expect(newBalance_bob.sub(oldBalance_bob)).to.be.above(parseEther("9979"));
			expect(newBalance_alice.sub(oldBalance_alice)).to.be.eq(parseEther("10000"));
			expect(newBalance_alice.sub(oldBalance_alice)).to.be.above(parseEther("9979"));

			const alice_reward = await CAKE.balanceOf(alice._address);
			expect(alice_reward).to.be.above(parseEther("700"));
			const bob_reward = await CAKE.balanceOf(bob._address);
			expect(bob_reward).to.be.above(parseEther("700"));
		});

		it("should withdraw from farm,multiple user (Case3)", async () => {
			const { alice, bob, DEFIAIFarm, BUSD, CAKE } = await setup();

			await DEFIAIFarm.connect(bob).deposit(parseEther("10000"));
			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			const oldBalance_alice = await BUSD.balanceOf(alice._address);
			const oldBalance_bob = await BUSD.balanceOf(alice._address);

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 100);

			await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 0);
			await DEFIAIFarm.connect(bob).withdraw(parseEther("10000"), 0);
			const newBalance_alice = await BUSD.balanceOf(alice._address);
			const newBalance_bob = await BUSD.balanceOf(bob._address);

			expect(newBalance_bob.sub(oldBalance_bob)).to.be.below(parseEther("10000"));
			expect(newBalance_bob.sub(oldBalance_bob)).to.be.above(parseEther("9979"));
			expect(newBalance_alice.sub(oldBalance_alice)).to.be.eq(parseEther("10000"));
			expect(newBalance_alice.sub(oldBalance_alice)).to.be.above(parseEther("9979"));

			const alice_reward = await CAKE.balanceOf(alice._address);
			expect(alice_reward).to.be.above(parseEther("700"));
			const bob_reward = await CAKE.balanceOf(bob._address);
			expect(bob_reward).to.be.above(parseEther("700"));
		});

	});

	describe("Withdraws", async () => {
		it("dev should reward when withdraw", async () => {
			const { alice, DEFIAIFarm, BUSD, CAKE, BUSDStrat } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			const oldBalance = await BUSD.balanceOf(alice._address);
			expect((await BUSDStrat.farmInfo(0)).totalShare).to.be.eq(parseEther("10000"));
			expect((await BUSDStrat.farmInfo(1)).totalShare).to.be.eq(parseEther("0"));
			expect((await BUSDStrat.farmInfo(2)).totalShare).to.be.eq(parseEther("0"));

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 200);
			await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 0);
			const newBalance = await BUSD.balanceOf(alice._address);
			const reward = await CAKE.balanceOf(alice._address);
			const dev_reward = await CAKE.balanceOf("0x0dd58549666bbafae53589878863ff85a28fb0ed");
			expect((await BUSDStrat.farmInfo(0)).totalShare).to.be.below(parseEther("10000"));
			expect((await BUSDStrat.farmInfo(1)).totalShare).to.be.eq(parseEther("0"));
			expect((await BUSDStrat.farmInfo(2)).totalShare).to.be.eq(parseEther("0"));
			expect(newBalance.sub(oldBalance)).to.be.below(parseEther("10000"));
			expect(newBalance.sub(oldBalance)).to.be.above(parseEther("9979"));
			expect(reward).to.be.above(parseEther("3507"));
			expect(dev_reward).to.be.below(reward);
			expect(dev_reward).to.be.above(parseEther("1503"));
		});
	});

	describe("Prevent flashloan attack", async () => {
		it("do not allow to withdraw when withdraw is in the same block as deposit", async () => {
			const { alice, DEFIAIFarm, } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			await expect(DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 0)).to.be.revertedWith('DeFiAIMultiStrat::withdraw: cannot deposit and withdraw in same block');


		});
	});

	describe("Deposits", async () => {
		it("should get reward for previous deposit", async () => {
			const { alice, DEFIAIFarm, CAKE, BUSDStrat } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			expect((await BUSDStrat.farmInfo(0)).totalShare).to.be.eq(parseEther("10000"));
			expect((await BUSDStrat.farmInfo(1)).totalShare).to.be.eq(parseEther("0"));
			expect((await BUSDStrat.farmInfo(2)).totalShare).to.be.eq(parseEther("0"));

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 200);

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			expect((await BUSDStrat.farmInfo(0)).totalShare).to.be.eq(parseEther("20000"));
			expect((await BUSDStrat.farmInfo(1)).totalShare).to.be.eq(parseEther("0"));
			expect((await BUSDStrat.farmInfo(2)).totalShare).to.be.eq(parseEther("0"));

			const reward = await CAKE.balanceOf(alice._address);
			const dev_reward = await CAKE.balanceOf("0x0dd58549666bbafae53589878863ff85a28fb0ed");
			expect(reward).to.be.above(parseEther("3507"));
			expect(dev_reward).to.be.below(reward);
			expect(dev_reward).to.be.above(parseEther("1503"));
		});
  });

  describe("Change of dev", async () => { 
    it("only dev can emergency withdraw", async () => {
			const { alice, DEFIAIFarm, CAKE, BUSDStrat, dev, newdev,BUSD,USDT } = await setup();
      await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));

			await expect(BUSDStrat.connect(alice).emergencyWithdraw(BUSD.address, USDT.address)).to.be.revertedWith('Not gov');
      const oldBUSDBalance = BUSD.balanceOf(dev._address);
      const oldUSDTBalance = USDT.balanceOf(dev._address);
			await BUSDStrat.connect(dev).emergencyWithdraw(BUSD.address, USDT.address);
		});
    it("only governance can change dev", async () => {
			const { alice, DEFIAIFarm, CAKE, BUSDStrat, dev, newdev } = await setup();

			await expect(BUSDStrat.connect(alice).setDevAddress(newdev._address)).to.be.revertedWith('Not gov');
      await BUSDStrat.connect(dev).setDevAddress(newdev._address);
      expect(await BUSDStrat.devAddress()).to.be.eq(newdev._address);
		});
    it("new dev should get reward", async () => {
			const { alice, DEFIAIFarm, CAKE, BUSDStrat, dev, newdev } = await setup();
      
			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			expect((await BUSDStrat.farmInfo(0)).totalShare).to.be.eq(parseEther("10000"));
			expect((await BUSDStrat.farmInfo(1)).totalShare).to.be.eq(parseEther("0"));
			expect((await BUSDStrat.farmInfo(2)).totalShare).to.be.eq(parseEther("0"));

      expect(await CAKE.balanceOf(dev._address)).to.be.eq(parseEther("0"));
      expect(await CAKE.balanceOf(newdev._address)).to.be.eq(parseEther("0"));

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 200);

      await BUSDStrat.connect(dev).setDevAddress(newdev._address);

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			expect((await BUSDStrat.farmInfo(0)).totalShare).to.be.eq(parseEther("20000"));
			expect((await BUSDStrat.farmInfo(1)).totalShare).to.be.eq(parseEther("0"));
			expect((await BUSDStrat.farmInfo(2)).totalShare).to.be.eq(parseEther("0"));

			const reward = await CAKE.balanceOf(alice._address);
			const dev_reward = await CAKE.balanceOf(dev._address);
			const new_dev_reward = await CAKE.balanceOf(newdev._address);
			expect(reward).to.be.above(parseEther("3507"));
			expect(dev_reward).to.be.eq(0);
			expect(new_dev_reward).to.be.below(reward);
			expect(new_dev_reward).to.be.above(parseEther("1503"));
		});
	});

});