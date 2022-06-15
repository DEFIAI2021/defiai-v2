import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getNamedAccounts } from "hardhat";
import { isTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { execute, catchUnknownSigner, deploy } = deployments;
  const { deployer, dev } = await getNamedAccounts();

  const wbnb = await deployments.get("WBNB");
  const mino = await deployments.get("MinoToken");
  const cake = await deployments.get("CakeToken");
  const ethWbnb = await deployments.get("ETH_WBNB");
  const farm = await deployments.get("MinoFarm");
  const router = await deployments.get("PancakeRouter");
  const masterChef = await deployments.get("MasterChef");
  const distributor = await deployments.get("Distributor");

  const _addresses = [
    wbnb.address,
    farm.address,
    ethWbnb.address,
    cake.address,
    masterChef.address,
    distributor.address,
    dev,
    router.address,
    mino.address,
  ];
  const _pid = isTestnet(hre) ? 2 : 261;
  const _earnedToMinoPath = [cake.address, wbnb.address, mino.address];
  const _earnedToWbnbPath = [cake.address, wbnb.address];
  const _buyBackRate = 500;
  const _isCAKEStaking = false;

  const stratRes = await deploy("MinoStratX2_ETH_WBNB", {
    from: deployer,
    contract: "MinoStratX2_PCS",
    args: [
      _addresses,
      _pid,
      _earnedToMinoPath,
      _earnedToWbnbPath,
      _buyBackRate,
      _isCAKEStaking,
    ],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  if (stratRes.newlyDeployed) {
    await catchUnknownSigner(
      execute(
        "MinoFarm",
        { from: deployer, log: true },
        "add",
        1000,
        ethWbnb.address,
        false,
        stratRes.address
      )
    );
  }
};
export default func;
func.tags = ["EthWbnbStrategy_deploy"];
func.dependencies = ["ETH_WBNB", "PCS", "MINO"];
