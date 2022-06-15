import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import constants from "../../shared/constants";
import { getNamedAccounts } from "hardhat";
import { parseEther } from "ethers/lib/utils";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { execute, read, catchUnknownSigner, save } = deployments;
  const { deployer } = await getNamedAccounts();

  const busd = await deployments.get("BUSD");
  const usdt = await deployments.get("USDT");
  const router = await deployments.get("PancakeRouter");

  let pairAddress;
  try {
    pairAddress = await read(
      "PancakeFactory",
      "getPair",
      usdt.address,
      busd.address
    );
  } catch (e) {
    console.log(e);
  }

  if (pairAddress) {
    if (pairAddress === constants.ZERO_ADDRESS) {
      await catchUnknownSigner(
        execute(
          "PancakeFactory",
          { from: deployer, log: true },
          "createPair",
          usdt.address,
          busd.address
        )
      );

      try {
        pairAddress = await read(
          "PancakeFactory",
          "getPair",
          usdt.address,
          busd.address
        );
        await save("BUSD_USDT", {
          address: pairAddress,
          abi: (await deployments.getArtifact("PancakePair")).abi,
        });
      } catch (e) {
        console.log(e);
      }

      let busdBalance;
      try {
        busdBalance = await read("BUSD", "balanceOf", deployer);
      } catch (e) {}

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

      let usdtBalance;
      try {
        usdtBalance = await read("USDT", "balanceOf", deployer);
      } catch (e) {}

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

      const tokenA = usdt.address;
      const tokenB = busd.address;
      const amountADesired = parseEther("135370000");
      const amountBDesired = parseEther("135600000");
      const amountAMin = "0";
      const amountBMin = "0";
      const to = deployer;
      const deadline = "1666029098";

      await catchUnknownSigner(
        execute(
          "PancakeRouter",
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
          "MasterChef",
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
func.tags = ["BUSD_USDT"];
func.dependencies = ["PCS", "BUSD", "USDT"];
