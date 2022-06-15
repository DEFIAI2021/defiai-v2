import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { execute, catchUnknownSigner, deploy, get, read } = deployments;
  const { deployer, dev } = await getNamedAccounts();

  const ifcStrat = await get("IFCStrat");

  const stratAddress = await read("IFCPool", "ifcStrategy");

  if (stratAddress !== ifcStrat.address) {
    await catchUnknownSigner(
      execute(
        "IFCPool",
        {
          from: deployer,
          log: true,
        },
        "setIfcStrategy",
        ifcStrat.address
      )
    );
  }
};

export default func;
func.tags = ["IFCStrat_setup", "IFC"];
func.dependencies = ["IFCPool_deploy", "IFCStrat_deploy"];
