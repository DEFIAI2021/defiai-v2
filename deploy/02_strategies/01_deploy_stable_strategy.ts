import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getNamedAccounts } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import { isTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { execute, catchUnknownSigner, deploy } = deployments;
  const { deployer, reward, dev } = await getNamedAccounts();

  const stableSwap = await deployments.get("Stableswap");
  const busd = await deployments.get("BUSD");
  const usdt = await deployments.get("USDT");
  const farm = await deployments.get("DeFiAIFarmV2");

  const _stableStrat = await deployments.get("Stable_DeFiAIStrat");

  const _swapRouterAddress = stableSwap.address;
  const _busd = busd.address;
  const _usdt = usdt.address;
  const _devAddress = dev;
  const _defiaiFarmAddress = farm.address;
  // @todo Change multiplier
  const _withdrawalMultiplier = 10050;
  const _stratAddress = _stableStrat.address;

  const stratRes = await deploy("DeFiAIStableStrat", {
    from: deployer,
    contract: "DeFiAIStableStrat",
    args: [
      _swapRouterAddress,
      _busd,
      _usdt,
      "0x0dd58549666BbAFae53589878863fF85a28Fb0Ed",
      _defiaiFarmAddress,
      _withdrawalMultiplier,
      _stratAddress,
      0,
      1
    ],
    log: true,
    skipIfAlreadyDeployed: true,
  });
};
export default func;
func.tags = ["Strategy_deploy"];
func.dependencies = ["DEFIAI", "Stable_Strategy_deploy", "ACS"];
