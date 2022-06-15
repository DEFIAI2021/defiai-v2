import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { catchUnknownSigner, read, execute } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  const mino = await deployments.get("MinoToken");

  let poolExists;
  try {
    poolExists = await read("LiquidityMiningMaster_MINO", "poolInfo", 0);
  } catch (e) {}

  if (!poolExists) {
    const allocPoint = 1000;
    const minoAddress = mino.address;
    const locked = true;
    const withUpdate = false;
    await catchUnknownSigner(
      execute(
        "LiquidityMiningMaster_MINO",
        { from: deployer, log: true },
        "addPool",
        allocPoint,
        minoAddress,
        locked,
        withUpdate
      )
    );
  }
};

export default func;
func.tags = ["MINO", "LiquidityMiningMaster_MINO_add"];
func.dependencies = [
  "MINO_deploy",
  "LiquidityMiningMaster_MINO_deploy",
  "LiquidityMiningMaster_MINO_setup",
];
