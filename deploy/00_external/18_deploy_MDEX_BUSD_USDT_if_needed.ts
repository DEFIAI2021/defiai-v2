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
  const router = await deployments.get("MdexRouter");

  let pairAddress;
  try {
    pairAddress = await read(
      "MdexFactory",
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
          "MdexFactory",
          { from: deployer, log: true },
          "createPair",
          busd.address,
          usdt.address
        )
      );

      try {
        pairAddress = await read(
          "MdexFactory",
          "getPair",
          busd.address,
          usdt.address
        );
        await save("MDEX_BUSD_USDT", {
          address: pairAddress,
          abi: (await deployments.getArtifact("MdexPair")).abi,
        });
      } catch (e) {
        console.log(e);
      }

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

      let ethBalance;
      try {
        ethBalance = await read("BUSD", "balanceOf", deployer);
      } catch (e) {}

      if (ethBalance.toString() === "0") {
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
      const amountADesired = parseEther("135370000");
      const amountBDesired = parseEther("135600000");
      const amountAMin = "0";
      const amountBMin = "0";
      const to = deployer;
      const deadline = "1666029098";

      await catchUnknownSigner(
        execute(
          "MdexRouter",
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
          "BSCPool",
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
func.tags = ["MDEX_BUSD_USDT"];
func.dependencies = ["MDEX", "BUSD", "USDT", "FAKE"];
func.skip = skipUnlessTestnet;
