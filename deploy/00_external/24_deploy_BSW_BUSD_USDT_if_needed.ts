import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import constants from "../../shared/constants";
import { getNamedAccounts } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { execute, read, catchUnknownSigner, save } = deployments;
  const { deployer } = await getNamedAccounts();

  const usdt = await deployments.get("USDT");
  const busd = await deployments.get("BUSD");
  const router = await deployments.get("BiswapRouter");

  let pairAddress;
  try {
    pairAddress = await read(
      "BiswapFactory",
      "getPair",
      busd.address,
      usdt.address
    );
  } catch (e) {
    console.log(e);
  }

  if (pairAddress) {
    if (pairAddress === constants.ZERO_ADDRESS) {
      await catchUnknownSigner(
        execute(
          "BiswapFactory",
          { from: deployer, log: true },
          "createPair",
          busd.address,
          usdt.address
        )
      );

      try {
        pairAddress = await read(
          "BiswapFactory",
          "getPair",
          busd.address,
          usdt.address
        );
        await save("BSW_BUSD_USDT", {
          address: pairAddress,
          abi: (await deployments.getArtifact("BiswapPair")).abi,
        });
      } catch (e) {
        console.log(e);
      }

      let usdtBalance;
      try {
        usdtBalance = await read("USDT", "balanceOf", deployer);
      } catch (e) {
        console.error(e);
      }

      if (usdtBalance.toString() === "0") {
        await catchUnknownSigner(
          execute(
            "USDT",
            { from: deployer, log: true },
            "devMint",
            parseEther("1000000000")
          )
        );
      }

      await catchUnknownSigner(
        execute(
          "USDT",
          { from: deployer, log: true },
          "approve",
          router.address,
          parseEther("1000000000")
        )
      );

      let busdBalance;
      try {
        busdBalance = await read("BUSD", "balanceOf", deployer);
      } catch (e) {
        console.error(e);
      }

      if (busdBalance.toString() === "0") {
        await catchUnknownSigner(
          execute(
            "BUSD",
            { from: deployer, log: true },
            "devMint",
            parseEther("1000000000")
          )
        );
      }

      await catchUnknownSigner(
        execute(
          "BUSD",
          { from: deployer, log: true },
          "approve",
          router.address,
          parseEther("1000000000")
        )
      );

      const tokenA = busd.address;
      const tokenB = usdt.address;
      const amountADesired = parseEther("192310000");
      const amountBDesired = parseEther("192310000");
      const amountAMin = "0";
      const amountBMin = "0";
      const to = deployer;
      const deadline = "1666029098";

      await catchUnknownSigner(
        execute(
          "BiswapRouter",
          { from: deployer, log: true },
          "addLiquidity",
          tokenA,
          tokenB,
          amountADesired,
          amountBDesired,
          amountAMin,
          amountBMin,
          to,
          deadline
        )
      );

      await catchUnknownSigner(
        execute(
          "BSWMasterChef",
          { from: deployer, log: true },
          "add",
          1000,
          pairAddress,
          false
        )
      );
    }
  }
};

export default func;
func.tags = ["BSW_BUSD_USDT"];
func.dependencies = ["BSW", "BUSD", "USDT", "FAKE"];
func.skip = skipUnlessTestnet;
