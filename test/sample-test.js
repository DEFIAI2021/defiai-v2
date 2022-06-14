const { ethers } = require("hardhat");
const parseEther = ethers.utils.parseEther;
const { expect } = require("chai");


describe("Token contract", function () {

  let Token;
  let mosToken;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let addrs;
  let dev;
  

  let strat1;
  let strat2;

  let swapRouterAddress;
  let busd;
  let usdt;
  let defiaiFarmAddress;
  let stratAddresss;
  
  let pcsAddress0;
  let pcsAddress1;
  let pcsAddress2;
  let pcsAddress3;

  let mdexAddress0;
  let mdexAddress1;
  let mdexAddress2;
  let mdexAddress3;

  let bswAddress0;
  let bswAddress1;
  let bswAddress2;
  let bswAddress3;


  var tetherToken;
  var srtToken;
  var defiai;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    [owner, addr1, addr2, addr3, dev, strat1, strat2, swapRouterAddress, defiaiFarmAddress, stratAddresss] = await ethers.getSigners();
    const USDT = await ethers.getContractFactory("TetherToken", owner);
    usdt = await USDT.deploy();
    await usdt.deployed();

    const BUSD = await ethers.getContractFactory("BinanceToken", owner);
    busd = await BUSD.deploy();
    await busd.deployed();

    const DEFIAI = await ethers.getContractFactory("DeFiAIFarmV2", owner);
    defiai = await DEFIAI.deploy(dev.address, 100); // 1% FEE
    await defiai.deployed();


    const STABLESTRAT = await ethers.getContractFactory("DeFiAIStableStrat", owner);
    stableStrat = await STABLESTRAT.deploy(swapRouterAddress.address, busd.address, usdt.address, dev.address, defiaiFarmAddress.address, 1, stratAddresss.address); // 1% FEE
    await stableStrat.deployed();

    await usdt.connect(addr1).mint(addr1.address, parseEther("50000"));
    await usdt.connect(addr2).mint(addr2.address, parseEther("50000"));
    await usdt.connect(addr3).mint(addr3.address, parseEther("50000"));
    await usdt.connect(addr1).approve(defiai.address, parseEther("50000"));
    await usdt.connect(addr2).approve(defiai.address, parseEther("50000"));
    await usdt.connect(addr3).approve(defiai.address, parseEther("50000"));

    await busd.connect(addr1).mint(addr1.address, parseEther("50000"));
    await busd.connect(addr2).mint(addr2.address, parseEther("50000"));
    await busd.connect(addr3).mint(addr3.address, parseEther("50000"));
    await busd.connect(addr1).approve(defiai.address, parseEther("50000"));
    await busd.connect(addr2).approve(defiai.address, parseEther("50000"));
    await busd.connect(addr3).approve(defiai.address, parseEther("50000"));


  });

  describe("Deployment V2", function() {
    it("dev address and fee", async function () {   
      const devAddress = await defiai.connect(addr1).getDevAddress();
      console.log("devAddress:", devAddress);
      const withdrawalFee = await defiai.connect(addr1).getWithdrawalFee();
      console.log("withdrawal fee:", withdrawalFee);

    });
    it("dev and owner initialize pools", async function () {   
      await defiai.connect(owner).initialize(usdt.address, strat1.address, 10);
      console.log("pool length:", await defiai.connect(owner).poolLength());

      await expect(defiai.connect(dev).initialize(usdt.address, strat2.address, 100)).to.be.revertedWith('DeFiAIFarmV2::setStrats: Already initialized');
      console.log("pool length:", await defiai.connect(owner).poolLength());
      //console.log("pool length:", await defiai.connect(dev).poolLength());
      //await expect(init).to.be.revertedWith('DeFiAIFarmV2::setStrats: Already initialized');

    });
  });
  describe("Deposit", function() {
    it("deposit 100 into pool 0", async function () {   
      // await defiaiFarmAddress.connect(addr1).deposit(addr1.address, 100, usdt.address);
      console.log("pool length:", await defiai.connect(owner).poolLength());
      await defiai.connect(owner).initialize(usdt.address, strat1.address, 10);
      console.log("pool length:", await defiai.connect(owner).poolLength());
      //console.log("devAddress:", devAddress);
    });
  });
});