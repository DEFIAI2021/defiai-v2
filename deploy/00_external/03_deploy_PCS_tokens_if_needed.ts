import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  let cakeToken = await deployments.getOrNull("CakeToken");
  if (!cakeToken) {
    cakeToken = await deploy("CakeToken", {
      from: deployer,
      contract: "CakeToken",
      log: true,
    });
  }

  let syrup = await deployments.getOrNull("SyrupBar");
  if (!syrup) {
    syrup = await deploy("SyrupBar", {
      from: deployer,
      contract: "SyrupBar",
      args: [cakeToken.address],
      log: true,
    });
  }
};
export default func;
func.tags = ["PCS", "PCS_base_tokens", "CakeToken", "SyrupBar"];
func.skip = skipUnlessTestnet;
