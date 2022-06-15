import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { parseEther } from "ethers/lib/utils";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  const cake = await deployments.get("CakeToken");
  const syrup = await deployments.get("SyrupBar");

  let masterChef = await deployments.getOrNull("MasterChef");
  if (!masterChef) {
    masterChef = await deploy("MasterChef", {
      from: deployer,
      contract: "MasterChef",
      args: [cake.address, syrup.address, dev, parseEther("40"), 100],
      log: true,
    });
  }
};
export default func;
func.tags = ["PCS", "MasterChef"];
func.dependencies = ["PancakeRouter", "PCS_base_tokens"];
func.skip = skipUnlessTestnet;
