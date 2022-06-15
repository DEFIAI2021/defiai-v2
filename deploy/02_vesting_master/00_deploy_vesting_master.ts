import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  const mino = await deployments.get("MinoToken");

  const _period = 259200;
  const _lockedPeriodAmount = 29;
  const _vestingToken = mino.address;
  const _devAddress = dev;

  await deploy("VestingMaster", {
    from: deployer,
    contract: "VestingMaster",
    args: [_period, _lockedPeriodAmount, _vestingToken, _devAddress],
    log: true,
    skipIfAlreadyDeployed: true,
  });
};

export default func;
func.tags = ["MINO", "VestingMaster_deploy"];
func.dependencies = ["MINO_deploy"];
