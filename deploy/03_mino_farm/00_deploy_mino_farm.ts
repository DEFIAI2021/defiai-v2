import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { parseEther } from "ethers/lib/utils";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  const mino = await deployments.get("MinoToken");
  const vestingMaster = await deployments.get("VestingMaster");
  const ifcPool = await deployments.get("IFCPool");

  // @todo check tokenomics
  const _vestingMaster = vestingMaster.address;
  const _mino = mino.address;
  const _minoPerBlock = parseEther("16");
  const _startBlock = "0";
  const _endBlock = "35490669";
  const _devAddress = dev;
  const _stakingSupply = "7000";
  const _ifcAddress = ifcPool.address;
  const _ifcSupply = "600";
  const _devSupply = "1400";
  const _earlyExitFee = "9900";
  const _earlyExitPeriod = "259200";

  await deploy("MinoFarm", {
    from: deployer,
    contract: "MinoFarm",
    args: [
      _vestingMaster,
      _mino,
      _minoPerBlock,
      _startBlock,
      _endBlock,
      _stakingSupply,
      _devAddress,
      _devSupply,
      _ifcAddress,
      _ifcSupply,
      _earlyExitFee,
      _earlyExitPeriod,
    ],
    log: true,
    skipIfAlreadyDeployed: true,
  });
};

export default func;
func.tags = ["MINO", "MinoFarm_deploy"];
func.dependencies = ["MINO_deploy", "VestingMaster_deploy", "IFCMinter_deploy"];
