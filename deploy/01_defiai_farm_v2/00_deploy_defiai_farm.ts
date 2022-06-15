import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  const _devAddress = dev;
  console.log(hre.config.networks.hardhat.forking?.url);
  console.log(
    await hre.ethers.provider.getBalance("0xf93eB86071513A16E5a30440611E788dc05D922a")
  );

  await deploy("DeFiAIFarmV2", {
    from: deployer,
    contract: "DeFiAIFarmV2",
    args: [_devAddress],
    log: true,
    skipIfAlreadyDeployed: true,
  });
};

export default func;
func.tags = ["DEFIAI", "DEFIAIFarm_deploy"];
