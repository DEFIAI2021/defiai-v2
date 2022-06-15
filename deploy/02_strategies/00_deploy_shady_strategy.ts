import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getNamedAccounts } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import { isTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { execute, catchUnknownSigner, deploy } = deployments;
  const { deployer, backendAdmin } = await getNamedAccounts();

  const _devAddress = backendAdmin;

  const stratRes = await deploy("Stable_DeFiAIStrat", {
    from: deployer,
    contract: "DeFiAIStrat",
    args: [_devAddress],
    log: true,
    skipIfAlreadyDeployed: true,
  });
};
export default func;
func.tags = ["Stable_Strategy_deploy"];
func.dependencies = ["DEFIAI"];
