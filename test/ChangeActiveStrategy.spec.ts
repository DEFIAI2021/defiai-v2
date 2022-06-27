// import { expect } from "chai";
// import { BigNumberish, Signer } from "ethers";
// import { parseEther } from "ethers/lib/utils";
// import hre, { deployments } from "hardhat";
// import {
//   DeFiAIFarmV2,
//   DeFiAIStableStrat,
//   FakeToken,
//   CakeToken,
//   BSWToken,
//   MdxToken,
//   CakeToken__factory,
//   MasterChef__factory,
//   MasterChef,
//   BSCPool
// } from "../types";
// import CONSTANTS from "../shared/constants";
// import { mineBlocks } from "../shared/util";

// const provider = hre.network.provider;

// describe("Change active strategy", async () => {
//   const setup = deployments.createFixture(
//     async ({ deployments, getUnnamedAccounts, ethers }, options) => {
//       await deployments.fixture("Strategy_set");

//       const DEFIAIFarm = (await ethers.getContract(
//         "DeFiAIFarmV2"
//       )) as DeFiAIFarmV2;
//       const BUSD = (await ethers.getContract("BUSD")) as FakeToken;
//       const USDT = (await ethers.getContract("USDT")) as FakeToken;
//       const BUSDStrat = (await ethers.getContract(
//         "DeFiAIStableStrat"
//       )) as DeFiAIStableStrat;
//       const CAKE = (await ethers.getContract("CakeToken")) as CakeToken;
//       const BSW = (await ethers.getContract("BSWToken")) as BSWToken;
//       const MDX = (await ethers.getContract("MdxToken")) as MdxToken;
//       const masterChef = (await ethers.getContract("MasterChef")) as MasterChef;
//       const bscPool = (await ethers.getContract("BSCPool")) as BSCPool;

//       const others = await getUnnamedAccounts();
//       const alice = ethers.provider.getSigner(others[0]);
//       const bob = ethers.provider.getSigner(others[1]);
//       const dev = ethers.provider.getSigner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
      
//       await BUSD.connect(alice).devMint(parseEther("2500000"));
//       await BUSD.connect(bob).devMint(parseEther("2500000"));
//       await BUSD.connect(dev).devMint(parseEther("2500000"));
//       await BUSD.connect(alice).approve(
//         DEFIAIFarm.address,
//         CONSTANTS.MAX_VALUE
//       );
//       await BUSD.connect(bob).approve(DEFIAIFarm.address, CONSTANTS.MAX_VALUE);
//       await BUSD.connect(dev).approve(
//         DEFIAIFarm.address,
//         CONSTANTS.MAX_VALUE
//       );
//       await DEFIAIFarm.connect(dev).initialize(BUSD.address, BUSDStrat.address);

//       return {
//         alice,
//         bob,
//         DEFIAIFarm,
//         BUSDStrat,
//         BUSD,
//         USDT,
//         CAKE,
//         BSW,
//         MDX,
//         dev,
//         masterChef,
//         bscPool
//       };
//     }
//   );
//     describe("Change active strategy once, for one user", async () => {
//       it("new pid cannot by active pid", async () => {
//         const { alice, DEFIAIFarm, BUSDStrat, BUSD ,CAKE,dev } = await setup();
  
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
       
//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
  
//         await mineBlocks(provider, 100);
  
//         await expect(BUSDStrat.connect(dev).changeActiveStrategy(0)).to.be.revertedWith('newPid is the same as activePid');
//       });
//       it("pcs balance zero", async () => {
//         const { alice, DEFIAIFarm, BUSDStrat, BUSD ,CAKE,dev } = await setup();
  
//         await expect(BUSDStrat.connect(dev).changeActiveStrategy(1)).to.be.revertedWith('Balance == 0');
//       });
//       it("single user claim success", async () => {
//         const { alice, DEFIAIFarm, BUSDStrat, BUSD ,CAKE,dev } = await setup();
  
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
//         const oldBalance = await BUSD.balanceOf(alice._address);
       
//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
  
//         await mineBlocks(provider, 100);
  
//         await BUSDStrat.connect(dev).changeActiveStrategy(1);
//         // await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"));
//         //user cant withdraw
//         //shouldn't claim be in v2
//         await DEFIAIFarm.connect(alice).claim(0);
//         const newBalance = await BUSD.balanceOf(alice._address);
//         const reward = await CAKE.balanceOf(alice._address);
//         console.log("reward:", reward);
//         expect(reward).to.be.above(parseEther("1"));
//       });
//       it("single user claim wrong pid", async () => {
//         const { alice, DEFIAIFarm, BUSDStrat,dev } = await setup();
  
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
       
//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
  
//         await mineBlocks(provider, 100);
  
//         await BUSDStrat.connect(dev).changeActiveStrategy(1);
//         // await DEFIAIFarm.connect(alice).withdraw(parseEther("10000"));
//         //user cant withdraw
//         //shouldn't claim be in v2
        
//         await expect(DEFIAIFarm.connect(alice).claim(1)).to.be.revertedWith('Only allow to claim inactive pool');
//       });
//       it("single user try to double claim", async () => {
//         const { alice, DEFIAIFarm, BUSDStrat, BUSD ,CAKE,dev } = await setup();
  
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
       
//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
  
//         await mineBlocks(provider, 100);
  
//         await BUSDStrat.connect(dev).changeActiveStrategy(1);
//         console.log("first farm", await BUSDStrat.farmInfo(0));
//         console.log("second farm",await BUSDStrat.farmInfo(1));
//         console.log("third farm",await BUSDStrat.farmInfo(2));
//         await DEFIAIFarm.connect(alice).claim(0);
        
//         await expect(DEFIAIFarm.connect(alice).claim(0)).to.be.revertedWith('No reward to be claim');
//       });
//       it("user claims pool with no reward", async () => {
//         const { alice, DEFIAIFarm, BUSDStrat, BUSD ,CAKE,dev } = await setup();
  
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
       
//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
  
//         await mineBlocks(provider, 100);

//         await expect(DEFIAIFarm.connect(alice).claim(1)).to.be.revertedWith('No reward to be claim');
//         await expect(DEFIAIFarm.connect(alice).claim(2)).to.be.revertedWith('No reward to be claim');
//         await expect(DEFIAIFarm.connect(alice).claim(4)).to.be.reverted;
//       });
//       it("dev cannot change to uninitialized pool", async () => {
//         const { alice, DEFIAIFarm, BUSDStrat, BUSD ,CAKE,dev } = await setup();
  
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
       
//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
  
//         await mineBlocks(provider, 100);

//         await expect(BUSDStrat.connect(dev).changeActiveStrategy(3)).to.be.reverted;
//       });
//       it("get mdxReward", async () => {
//         const { alice, DEFIAIFarm, BUSDStrat, BUSD ,CAKE, BSW, MDX, dev } = await setup();
  
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
       
//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
//         await mineBlocks(provider, 100);
//         await BUSDStrat.connect(dev).changeActiveStrategy(1);
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
//         await mineBlocks(provider, 100);
//         await BUSDStrat.connect(dev).changeActiveStrategy(0);
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
//         await DEFIAIFarm.connect(alice).claim(1);

//         const mdxreward = await MDX.balanceOf(alice._address);
//         console.log("MDXreward:", mdxreward);
//         expect(mdxreward).to.be.above(parseEther("1"));
//       });
//       it("get bswReward", async () => {
//         const { alice, DEFIAIFarm, BUSDStrat, BUSD ,CAKE, BSW, MDX, dev } = await setup();
  
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
       
//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
  
//         await mineBlocks(provider, 100);
//         await BUSDStrat.connect(dev).changeActiveStrategy(2);
//         console.log ("farm total share",(await BUSDStrat.farmInfo(2)).totalShare);
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
//         await mineBlocks(provider, 100);
//         await BUSDStrat.connect(dev).changeActiveStrategy(1);
//         await DEFIAIFarm.connect(alice).claim(2);
//         const bswreward = await BSW.balanceOf(alice._address);
//         console.log("BSWreward:", bswreward);
//         expect(bswreward).to.be.above(parseEther("1"));
//       });
//     });
//     describe("Change active strategy once, for multiple users", async () => {
//       it("both users manage to claim their reward", async () => {
//         const { alice, bob, DEFIAIFarm, BUSDStrat, BUSD ,CAKE,dev } = await setup();
  
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
//         await DEFIAIFarm.connect(bob).deposit(parseEther("10000"));
       
//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
  
//         await mineBlocks(provider, 100);
//         await BUSDStrat.connect(dev).changeActiveStrategy(1);
//         await DEFIAIFarm.connect(alice).claim(0);
//         await DEFIAIFarm.connect(bob).claim(0);
//         await expect(DEFIAIFarm.connect(bob).claim(0)).to.be.revertedWith('No reward to be claim');
//         await expect(DEFIAIFarm.connect(alice).claim(1)).to.be.revertedWith('Only allow to claim inactive pool');
//         const alicecakereward = await CAKE.balanceOf(alice._address);
//         const bobcakereward = await CAKE.balanceOf(bob._address);
//         expect (bobcakereward).to.be.above(1);
//         expect (alicecakereward).to.be.above(1);
//       });
//     });
//     describe("Change active strategy multiple times", async () => {
//       it("multiple strat change for one user", async () => {
//         const { alice, DEFIAIFarm, BUSDStrat, BUSD ,CAKE, BSW, MDX, dev } = await setup();
  
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
       
//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
  
//         await mineBlocks(provider, 100);
//         await BUSDStrat.connect(dev).changeActiveStrategy(1);
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
//         await mineBlocks(provider, 100);
//         console.log("first change");

//         await BUSDStrat.connect(dev).changeActiveStrategy(2);
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
//         await mineBlocks(provider, 100);
//         console.log("second change");

//         await BUSDStrat.connect(dev).changeActiveStrategy(0);
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
//         await DEFIAIFarm.connect(alice).claim(1);
//         const cakereward = await CAKE.balanceOf(alice._address);
//         const mdxreward = await MDX.balanceOf(alice._address);
//         const bswreward = await BSW.balanceOf(alice._address);
//         console.log("CAKEreward:", cakereward);
//         console.log("MDXreward:", mdxreward);
//         console.log("BSWreward:", bswreward);
//         expect(cakereward).to.be.eq(parseEther("0"));
//         expect(mdxreward).to.be.above(parseEther("1"));
//         expect(bswreward).to.be.eq(parseEther("0"));

//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
//         await mineBlocks(provider, 100);
//         console.log("third change");

//         await BUSDStrat.connect(dev).changeActiveStrategy(1);
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
//         await DEFIAIFarm.connect(alice).claim(2);
//         await expect(DEFIAIFarm.connect(alice).claim(1)).to.be.revertedWith('Only allow to claim inactive pool');
//         await DEFIAIFarm.connect(alice).claim(0);

//         const cakereward1 = await CAKE.balanceOf(alice._address);
//         const bswreward1 = await BSW.balanceOf(alice._address);
//         console.log("CAKEreward:", cakereward1);
//         console.log("BSWreward:", bswreward1);
//         expect(cakereward1).to.be.above(parseEther("1"));
//         expect(bswreward1).to.be.above(parseEther("1"));
//       });
//       it("multiple strat change for multiple users", async () => {
//         const { alice, bob, DEFIAIFarm, BUSDStrat, BUSD ,CAKE, BSW, MDX, dev } = await setup();
  
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
//         await DEFIAIFarm.connect(bob).deposit(parseEther("10000"));
       
//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
  
//         await mineBlocks(provider, 100);
//         await BUSDStrat.connect(dev).changeActiveStrategy(1);
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
//         await DEFIAIFarm.connect(bob).deposit(parseEther("10000"));
//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
//         await mineBlocks(provider, 100);
//         console.log("first change");

//         await BUSDStrat.connect(dev).changeActiveStrategy(2);
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
//         await DEFIAIFarm.connect(bob).deposit(parseEther("10000"));
//         await provider.request({
//           method: "evm_increaseTime",
//           params: [86400 * 3],
//         });
//         await mineBlocks(provider, 100);
//         console.log("second change");

//         await BUSDStrat.connect(dev).changeActiveStrategy(0);
//         await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
//         await DEFIAIFarm.connect(bob).deposit(parseEther("1000"));
//         await DEFIAIFarm.connect(alice).claim(1);
//         await DEFIAIFarm.connect(bob).claim(1);
//         // const aliceCakeReward = await CAKE.balanceOf(alice._address);
//         const alicemdxreward = await MDX.balanceOf(alice._address);
//         console.log("reward for alice",alicemdxreward);
//         // const alicebswreward = await BSW.balanceOf(alice._address);
//         // expect(aliceCakeReward).to.be.eq(parseEther("0"));
//         // expect(alicemdxreward).to.be.above(parseEther("1"));
//         // expect(alicebswreward).to.be.eq(parseEther("0"));

//         // const bobCakeReward = await CAKE.balanceOf(alice._address);
//         // const bobmdxreward = await MDX.balanceOf(alice._address);
//         // const bobbswreward = await BSW.balanceOf(alice._address);

//         // expect(bobCakeReward).to.be.eq(parseEther("0"));
//         // expect(bobmdxreward).to.be.above(parseEther("1"));
//         // expect(bobbswreward).to.be.eq(parseEther("0"));

//         // await provider.request({
//         //   method: "evm_increaseTime",
//         //   params: [86400 * 3],
//         // });
//         // await mineBlocks(provider, 100);
//         // console.log("third change");

//         // await BUSDStrat.connect(dev).changeActiveStrategy(1);
//         // await DEFIAIFarm.connect(alice).deposit(parseEther("10000"));
//         // await DEFIAIFarm.connect(bob).deposit(parseEther("10000"));
//         // await DEFIAIFarm.connect(alice).claim(2);
//         // await DEFIAIFarm.connect(bob).claim(2);
//         // await expect(DEFIAIFarm.connect(alice).claim(1)).to.be.revertedWith('Only allow to claim inactive pool');
//         // await expect(DEFIAIFarm.connect(bob).claim(1)).to.be.revertedWith('Only allow to claim inactive pool');
//         // await DEFIAIFarm.connect(alice).claim(0);
//         // await DEFIAIFarm.connect(bob).claim(0);

//         // const aliceCakeReward1 = await CAKE.balanceOf(alice._address);
//         // const alicebswreward1 = await BSW.balanceOf(alice._address);
//         // const bobCakeReward1 = await CAKE.balanceOf(bob._address);
//         // const bobbswreward1 = await BSW.balanceOf(bob._address);
//         // expect(aliceCakeReward1).to.be.above(parseEther("1"));
//         // expect(alicebswreward1).to.be.above(parseEther("1"));
//         // expect(bobCakeReward1).to.be.above(parseEther("1"));
//         // expect(bobbswreward1).to.be.above(parseEther("1"));
//       });
//     });
   
    
// });
