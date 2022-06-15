import { JsonRpcProvider } from "@ethersproject/providers";
import { Wallet } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { ethers, getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeFiAIFarmV2, DeFiAIStableStrat } from "../../types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { execute, catchUnknownSigner, deploy, get, read } = deployments;
  const { deployer, dev } = await getNamedAccounts();

  // const balances = await read(
  //   "Stable_DeFiAIStrat",
  //   "getUserWant",
  //   "0x8893abDa7E775a7D54e684E59FB4855Edffa1C00"
  // );
  //hj%ysj27jdi21&&^%jju

  // const wall = new Wallet(
  //   "fc72a24777ab3398a8fb800932889f67554e25aa11b1cdc9057433c7e26c45f1",
  //   new JsonRpcProvider(
  //     "https://speedy-nodes-nyc.moralis.io/80d8acc1a73f5f687e0402fc/bsc/mainnet"
  //   )
  // );

  // const farm = (await ethers.getContract("Stable_DeFiAIStrat")) as DeFiAIStableStrat;

  // await hre.network.provider.request({
  //   method: "hardhat_impersonateAccount",
  //   params: ["0xECeb96086D23201482c46869e65Ae7Be2500Be70"],
  // });

  // console.log(
  //   await read("DeFiAIMultiStrat", "devAddress")
  // );

  // console.log(
  //   await read(
  //     "Stable_DeFiAIStrat",
  //     {
  //       from: deployer,
  //     },
  //     "devAddress"
  //   )
  // );

  await execute(
    "DeFiAIStableStrat",
    {
      from: deployer,
    },
    "setDevAddress",
    "0xeB1b28f4Ec965CB29E0E330e5de9Ddd8276dcb39"
  );

  // const signer = hre.ethers.provider.getSigner(
  //   "0xECeb96086D23201482c46869e65Ae7Be2500Be70"
  // );

  // console.log(signer._address);

  // await farm
  //   .connect(signer)
  //   .updateBalance(
  //     ["0xECeb96086D23201482c46869e65Ae7Be2500Be70"],
  //     [parseEther("1")]
  //   );

  // const strat = (await ethers.getContract("Stable_DeFiAIStrat")) as DeFiAIStrat;
  // await strat
  //   .connect(wall)
  //   .updateBalance(
  //     ["0x4aB01Cd3f6A0B4006eAa6a853f89AfC14C583E4E"],
  //     [parseEther("3393.3463")]
  //   );

  // console.log(
  //   (
  //     await strat
  //       .connect(wall)
  //       .getUserWant("0x4aB01Cd3f6A0B4006eAa6a853f89AfC14C583E4E")
  //   ).toString()
  // );
  // console.log(Stable_DeFiAIStrat.address);
  // console.log(userWant.toString());
  // console.log(userWant.toString());

  // console.log(await farm.poolInfo(0));

  // console.log(
  //   (
  //     await (
  //       await farm.connect(signer).deposit(0, parseEther("10"), "1")
  //     ).wait()
  //   ).status
  // );

  // if (userWant !== "0xECeb96086D23201482c46869e65Ae7Be2500Be70") {
  //   await catchUnknownSigner(
  //     execute(
  //       "Stable_DeFiAIStrat",
  //       {
  //         from: deployer,
  //         log: true,
  //       },
  //       "setDevAddress",
  //       "0xECeb96086D23201482c46869e65Ae7Be2500Be70"
  //     )
  //   );
  // }
};

export default func;
func.tags = ["ABC"];
