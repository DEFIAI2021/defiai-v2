import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { catchUnknownSigner, read, execute } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  const farm = await deployments.get("IFCPool");

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
func.tags = ["MINO", "VestingMaster_add_IFCPool"];
func.dependencies = ["VestingMaster_deploy", "IFCPool_set_farm"];
