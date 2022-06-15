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

  const wbnb = await deployments.get("WBNB");
  const cake = await deployments.get("CakeToken");
  const router = await deployments.get("PancakeRouter");

  let pairAddress;
  try {
    pairAddress = await read(
      "PancakeFactory",
      "getPair",
      cake.address,
      wbnb.address
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
          cake.address,
          wbnb.address
        )
      );

      try {
        pairAddress = await read(
          "PancakeFactory",
          "getPair",
          cake.address,
          wbnb.address
        );

        await save("CAKE_WBNB", {
          address: pairAddress,
          abi: (await deployments.getArtifact("PancakePair")).abi,
        });
      } catch (e) {
        console.log(e);
      }

      let wbnbBalance;
      try {
        wbnbBalance = await read("WBNB", "balanceOf", deployer);
      } catch (e) {}

      if (wbnbBalance.toString() === "0") {
        await catchUnknownSigner(
          execute(
            "WBNB",
            { from: deployer, log: true },
            "devMint",
            parseEther("1000000000")
          )
        );
      }

      await catchUnknownSigner(
        execute(
          "WBNB",
          { from: deployer, log: true },
          "approve",
          router.address,
          parseEther("1000000000")
        )
      );

      let cakeBalance;
      try {
        cakeBalance = await read("CakeToken", "balanceOf", deployer);
      } catch (e) {}

      if (cakeBalance.toString() === "0") {
        await catchUnknownSigner(
          execute(
            "CakeToken",
            { from: deployer, log: true },
            "devMint",
            parseEther("1000000000")
          )
        );
      }

      await catchUnknownSigner(
        execute(
          "CakeToken",
          { from: deployer, log: true },
          "approve",
          router.address,
          parseEther("1000000000")
        )
      );

      const tokenA = cake.address;
      const tokenB = wbnb.address;
      const amountADesired = parseEther("130700000");
      const amountBDesired = parseEther("302960");
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
func.tags = ["CAKE_WBNB"];
func.dependencies = ["PCS", "CakeToken", "WBNB"];
func.skip = skipUnlessTestnet;
