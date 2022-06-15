import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { execute, read, catchUnknownSigner } = deployments;

  const masterChef = await deployments.get("MasterChef");

  let currentOwner;
  try {
    currentOwner = await read("CakeToken", "getOwner");
  } catch (e) {}

  if (currentOwner) {
    if (currentOwner.toLowerCase() !== masterChef.address.toLowerCase()) {
      await catchUnknownSigner(
        execute(
          "CakeToken",
          { from: currentOwner, log: true },
          "transferOwnership",
          masterChef.address
        )
      );
    }
  }

  try {
    currentOwner = await read("SyrupBar", "getOwner");
  } catch (e) {}

  if (currentOwner) {
    if (currentOwner.toLowerCase() !== masterChef.address.toLowerCase()) {
      await catchUnknownSigner(
        execute(
          "SyrupBar",
          { from: currentOwner, log: true },
          "transferOwnership",
          masterChef.address
        )
      );
    }
  }
};
export default func;
func.tags = ["PCS", "PCS_transfer_ownership"];
func.dependencies = ["MasterChef", "PCS_base_tokens"];
func.skip = skipUnlessTestnet;
