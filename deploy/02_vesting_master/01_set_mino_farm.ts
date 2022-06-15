import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { catchUnknownSigner, read, execute } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  const farm = await deployments.get("MinoFarm");

  let farmAllowed = false;
  try {
    farmAllowed = await read("VestingMaster", "farms", farm.address);
  } catch (e) {}

  if (!farmAllowed) {
    await catchUnknownSigner(
      execute(
        "VestingMaster",
        { from: deployer, log: true },
        "addFarm",
        farm.address
      )
    );
  }
};

export default func;
func.tags = ["MINO", "MinoFarm_setup"];
func.dependencies = ["MinoFarm_deploy", "VestingMaster_deploy"];
