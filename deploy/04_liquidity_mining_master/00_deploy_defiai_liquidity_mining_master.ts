import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { parseEther } from "ethers/lib/utils";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const mino = await deployments.get("MinoToken");
  const vestingMaster = await deployments.get("VestingMaster");

  const _minoAddress = mino.address;
  const _vestingMaster = vestingMaster.address;
  const _rewardToken = mino.address;
  const _tokenPerBlock = parseEther("37.84");
  const _startBlock = 100;
  const _endBlock = 10000;

  await deploy("LiquidityMiningMaster_MINO", {
    from: deployer,
    contract: "LiquidityMiningMaster",
    args: [
      _minoAddress,
      _vestingMaster,
      _rewardToken,
      _tokenPerBlock,
      _startBlock,
      _endBlock,
    ],
    log: true,
    skipIfAlreadyDeployed: true,
  });
};

export default func;
func.tags = ["MINO", "LiquidityMiningMaster_MINO_deploy"];
func.dependencies = ["MINO_deploy", "VestingMaster_deploy", "WBNB"];
