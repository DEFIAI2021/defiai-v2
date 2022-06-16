import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { catchUnknownSigner, read, execute } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  let currentDev;
  try {
    currentDev = await read("LiquidityMiningMaster_MINO", "devAddress");
  } catch (e) {}

  if (currentDev) {
    if (currentDev.toLowerCase() !== dev.toLowerCase()) {
      await catchUnknownSigner(
        execute(
          "LiquidityMiningMaster_MINO",
          { from: deployer, log: true },
          "setDevAddress",
          dev
        )
      );
    }
  }
};

export default func;
func.tags = ["MINO", "LiquidityMiningMaster_MINO_setup"];
func.dependencies = ["MINO_deploy", "LiquidityMiningMaster_MINO_deploy"];
