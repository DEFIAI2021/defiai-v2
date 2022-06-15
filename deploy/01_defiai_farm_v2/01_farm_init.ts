import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getNamedAccounts } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import { isTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { execute, catchUnknownSigner, deploy, read } = deployments;
  const { deployer, dev } = await getNamedAccounts();

  const busd = await deployments.get("BUSD");
  const usdt = await deployments.get("USDT");

  const strat = await deployments.get("DeFiAIStableStrat");
  // const busdStrat = await deployments.get("BUSD_DeFiAIMultiStrat");
  // const usdtStrat = await deployments.get("USDT_DeFiAIMultiStrat");

  const isInit = await read("DeFiAIFarmV2", "isInit");

  if (!isInit) {
    await catchUnknownSigner(
      execute(
        "DeFiAIFarmV2",
        { from: deployer, log: true },
        "initialize",
        usdt.address,
        strat.address,
        parseEther("1")
      )
    );
  }
};
export default func;
func.tags = ["DEFIAIFarm_init"];
func.dependencies = ["Strategy_init"];
