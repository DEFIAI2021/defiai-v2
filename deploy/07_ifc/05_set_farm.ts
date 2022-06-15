import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { execute, catchUnknownSigner, deploy, get, read } = deployments;
  const { deployer, dev } = await getNamedAccounts();

  const farm = await get("MinoFarm");

  const farmAddress = await read("IFCPool", "minoFarm");

  if (farmAddress !== farm.address) {
    await catchUnknownSigner(
      execute(
        "IFCPool",
        {
          from: deployer,
          log: true,
        },
        "setMinoFarm",
        farm.address
      )
    );
  }
};

export default func;
func.tags = ["IFCPool_set_farm", "IFC"];
func.dependencies = [
  "IFCPool_deploy",
  "MinoFarm_fund",
  "IFCStrat_deploy",
  "MinoFarm_deploy",
  "IFC_setup",
];
