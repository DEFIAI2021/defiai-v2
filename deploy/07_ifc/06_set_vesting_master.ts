import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { execute, catchUnknownSigner, deploy, get, read } = deployments;
  const { deployer, dev } = await getNamedAccounts();

  const vestingMaster = await get("VestingMaster");

  const vestingMasterAddress = await read("IFCPool", "vestingMaster");

  if (vestingMasterAddress !== vestingMaster.address) {
    await catchUnknownSigner(
      execute(
        "IFCPool",
        {
          from: deployer,
          log: true,
        },
        "setVestingMaster",
        vestingMaster.address
      )
    );
  }
};

export default func;
func.tags = ["IFCPool_set_VM", "IFC"];
func.dependencies = [
  "IFCPool_set_farm",
  "MinoFarm_fund",
  "IFCStrat_deploy",
  "MinoFarm_deploy",
  "IFC_setup",
  "VestingMaster_add_IFCPool",
  "VestingMaster_deploy",
];
