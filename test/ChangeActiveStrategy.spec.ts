import { expect } from "chai";
import { BigNumberish, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import hre, { deployments } from "hardhat";
import {
	DeFiAIFarmV2,
	DeFiAIStableStrat,
	FakeToken,
	CakeToken,
	BSWToken,
	MdxToken,
	CakeToken__factory,
	MasterChef__factory,
	MasterChef,
	BSCPool
} from "../types";
import CONSTANTS from "../shared/constants";
import { mineBlocks } from "../shared/util";

const provider = hre.network.provider;

describe("Change active strategy", async () => {
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
			const BSW = (await ethers.getContract("BSWToken")) as BSWToken;
			const MDX = (await ethers.getContract("MdxToken")) as MdxToken;
			const masterChef = (await ethers.getContract("MasterChef")) as MasterChef;
			const bscPool = (await ethers.getContract("BSCPool")) as BSCPool;

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
				BSW,
				MDX,
				dev,
				masterChef,
				bscPool
			};
		}
	);
	describe("Change active strategy once, for one user", async () => {
		it("new pid cannot by active pid", async () => {
			const { alice, DEFIAIFarm, BUSDStrat, dev } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 100);

			await expect(BUSDStrat.connect(dev).changeActiveStrategy(0)).to.be.revertedWith('newPid is the same as activePid');
		});
		it("pcs balance zero", async () => {
			const { BUSDStrat, dev } = await setup();

			await expect(BUSDStrat.connect(dev).changeActiveStrategy(1)).to.be.revertedWith('Balance == 0');
		});
		it("single user claim success", async () => {
			const { alice, DEFIAIFarm, BUSDStrat, CAKE, dev } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 100);

			await BUSDStrat.connect(dev).changeActiveStrategy(1);
			await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 0);
			const devbalance = await CAKE.balanceOf(dev._address);
			const reward = await CAKE.balanceOf(alice._address);
			expect(reward).to.be.above(parseEther("47"));
			expect(devbalance).to.be.below(reward);
		});
		it("single user cannot withdraw wrong pid", async () => {
			const { alice, DEFIAIFarm, BUSDStrat, dev } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 100);

			await BUSDStrat.connect(dev).changeActiveStrategy(1);

			await expect(DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 1)).to.be.revertedWith('DeFiAIMultiStrat::withdraw: No Enough balance');
			await expect(DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 4)).to.be.reverted;
		});
		it("single user cannot double withdraw", async () => {
			const { alice, DEFIAIFarm, BUSDStrat, dev } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 100);

			await BUSDStrat.connect(dev).changeActiveStrategy(1);
			await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 0);

			await expect(DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 0)).to.be.revertedWith('DeFiAIMultiStrat::withdraw: No Enough balance');
		});
		it("dev cannot change to uninitialized pool", async () => {
			const { alice, DEFIAIFarm, BUSDStrat, dev } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 100);

			await expect(BUSDStrat.connect(dev).changeActiveStrategy(3)).to.be.reverted;
		});
		it("get mdxReward", async () => {
			const { alice, DEFIAIFarm, BUSDStrat, CAKE, MDX, dev } = await setup();
			const oldDevmdx = await MDX.balanceOf(dev._address);

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});
			await mineBlocks(provider, 100);
			await BUSDStrat.connect(dev).changeActiveStrategy(1);
			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});
			await mineBlocks(provider, 100);
			await BUSDStrat.connect(dev).changeActiveStrategy(0);
			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			await expect(DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 0));
			await expect(DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 1));

			const cakereward = await CAKE.balanceOf(alice._address);
			const devCakeReward = await CAKE.balanceOf(dev._address);
			expect(cakereward).to.be.above(parseEther("21"));
			expect(devCakeReward).to.be.below(cakereward);
			const mdxreward = await MDX.balanceOf(alice._address);
			const devMDXReward = await MDX.balanceOf(dev._address);
			expect(mdxreward).to.be.above(parseEther("21"));
			expect(devMDXReward.sub(oldDevmdx)).to.be.below(mdxreward);
		});
		it("get bswReward", async () => {
			const { alice, DEFIAIFarm, BUSDStrat, BSW, dev } = await setup();
			const oldDevBSW = await BSW.balanceOf(dev._address);

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 100);
			await BUSDStrat.connect(dev).changeActiveStrategy(2);
			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});
			await mineBlocks(provider, 100);
			await BUSDStrat.connect(dev).changeActiveStrategy(1);
			await expect(DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 2));
			const bswreward = await BSW.balanceOf(alice._address);
			const devBSWreward = await BSW.balanceOf(dev._address);
			expect(bswreward).to.be.above(parseEther("47"));
			expect(devBSWreward.sub(oldDevBSW)).to.be.below(bswreward);
		});
	});

	describe("Change active strategy once, for multiple users", async () => {
		it("both users manage to claim their reward", async () => {
			const { alice, bob, DEFIAIFarm, BUSDStrat, CAKE, dev } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			await DEFIAIFarm.connect(bob).deposit(parseEther("10000"));

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 100);
			await BUSDStrat.connect(dev).changeActiveStrategy(1);
			await (DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 0));
			await (DEFIAIFarm.connect(bob).withdraw(parseEther("10000"), 0));
			await expect(DEFIAIFarm.connect(bob).withdraw(parseEther("10000"), 0)).to.be.revertedWith('DeFiAIMultiStrat::withdraw: No Enough balance');
			const alicecakereward = await CAKE.balanceOf(alice._address);
			const bobcakereward = await CAKE.balanceOf(bob._address);
			const devcakereward = await CAKE.balanceOf(dev._address);
			expect(bobcakereward).to.be.above(parseEther("47"));
			expect(alicecakereward).to.be.above(parseEther("47"));
			expect(devcakereward).to.be.below(bobcakereward.add(alicecakereward));
		});
	});

	describe("Change active strategy multiple times", async () => {
		it("multiple strat change for one user", async () => {
			const { alice, DEFIAIFarm, BUSDStrat, CAKE, BSW, MDX, dev } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 100);
			await BUSDStrat.connect(dev).changeActiveStrategy(1);
			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});
			await mineBlocks(provider, 100);

			await BUSDStrat.connect(dev).changeActiveStrategy(2);
			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});
			await mineBlocks(provider, 100);

			await BUSDStrat.connect(dev).changeActiveStrategy(0);
			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 1);
			const cakereward = await CAKE.balanceOf(alice._address);
			const mdxreward = await MDX.balanceOf(alice._address);
			const bswreward = await BSW.balanceOf(alice._address);
			expect(cakereward).to.be.above(parseEther("21"));
			expect(mdxreward).to.be.above(parseEther("21"));
			expect(bswreward).to.be.eq(parseEther("0"));

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});
			await mineBlocks(provider, 100);

			await BUSDStrat.connect(dev).changeActiveStrategy(1);
			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 2);
			await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 0);

			const cakereward1 = await CAKE.balanceOf(alice._address);
			const bswreward1 = await BSW.balanceOf(alice._address);
			expect(cakereward1).to.be.above(parseEther("21"));
			expect(bswreward1).to.be.above(parseEther("21"));
		});
		it("multiple strat change for multiple users", async () => {
			const { alice, bob, DEFIAIFarm, BUSDStrat, CAKE, BSW, MDX, dev } = await setup();

			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			await DEFIAIFarm.connect(bob).deposit(parseEther("10000"));

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});

			await mineBlocks(provider, 100);
			await BUSDStrat.connect(dev).changeActiveStrategy(1);
			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			await DEFIAIFarm.connect(bob).deposit(parseEther("10000"));
			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});
			await mineBlocks(provider, 100);

			await BUSDStrat.connect(dev).changeActiveStrategy(2);
			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			await DEFIAIFarm.connect(bob).deposit(parseEther("10000"));
			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});
			await mineBlocks(provider, 100);

			await BUSDStrat.connect(dev).changeActiveStrategy(0);
			await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
			await DEFIAIFarm.connect(bob).deposit(parseEther("10000"));
			await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 1);
			const alicemdxreward = await MDX.balanceOf(alice._address);
			await DEFIAIFarm.connect(bob).withdraw(parseEther("10000"), 1);
			const aliceCakeReward = await CAKE.balanceOf(alice._address);

			const alicebswreward = await BSW.balanceOf(alice._address);
			expect(aliceCakeReward).to.be.above(parseEther("21"));
			expect(alicemdxreward).to.be.above(parseEther("21"));
			expect(alicebswreward).to.be.eq(parseEther("0"));

			const bobCakeReward = await CAKE.balanceOf(alice._address);
			const bobmdxreward = await MDX.balanceOf(alice._address);
			const bobbswreward = await BSW.balanceOf(alice._address);

			expect(bobCakeReward).to.be.above(parseEther("21"));
			expect(bobmdxreward).to.be.above(parseEther("21"));
			expect(bobbswreward).to.be.eq(parseEther("0"));

			await provider.request({
				method: "evm_increaseTime",
				params: [86400 * 3],
			});
			await mineBlocks(provider, 100);

			await BUSDStrat.connect(dev).changeActiveStrategy(1);

			await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 2);
			await DEFIAIFarm.connect(bob).withdraw(parseEther("10000"), 2);
			await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"), 0);
			await DEFIAIFarm.connect(bob).withdraw(parseEther("10000"), 0);

			const aliceCakeReward1 = await CAKE.balanceOf(alice._address);
			const alicebswreward1 = await BSW.balanceOf(alice._address);
			const bobCakeReward1 = await CAKE.balanceOf(bob._address);
			const bobbswreward1 = await BSW.balanceOf(bob._address);
			expect(aliceCakeReward1).to.be.above(parseEther("47"));
			expect(alicebswreward1).to.be.above(parseEther("47"));
			expect(bobCakeReward1).to.be.above(parseEther("47"));
			expect(bobbswreward1).to.be.above(parseEther("47"));
		});
	});

});
