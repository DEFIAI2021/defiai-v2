import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { execute, catchUnknownSigner, deploy } = deployments;
  const { deployer, dev } = await getNamedAccounts();

  console.log("deployer", deployer);
  

  await deploy("IFC", {
    from: deployer,
    contract: "IFC",
    log: true,
    skipIfAlreadyDeployed: true,
  });
};

export default func;
func.tags = ["IFC_deploy", "IFC"];
