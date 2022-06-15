import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { catchUnknownSigner, read, execute, get } = deployments;

  const { deployer } = await getNamedAccounts();

  const Strat = await get("DeFiAIStableStrat");

  let stratAddress;
  try {
    stratAddress = await read("Stable_DeFiAIStrat", "stratAddress");
  } catch (e) {}

  console.log(stratAddress);

  // if (stratAddress) {
  //   if (stratAddress.toLowerCase() !== Strat.address.toLowerCase()) {
  await catchUnknownSigner(
    execute(
      "Stable_DeFiAIStrat",
      { from: deployer, log: true },
      "setStratAddress",
      Strat.address
    )
  );
  //   }
  // }
};

export default func;
func.tags = ["Strategy_set"];
func.dependencies = ["Strategy_init"];
