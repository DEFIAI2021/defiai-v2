import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  const wbnb = await deployments.get("WBNB");
  const mino = await deployments.get("MinoToken");
  const router = await deployments.get("PancakeRouter");
  const liquidityMiningMasterMino = await deployments.get(
    "LiquidityMiningMaster_MINO"
  );

  const _addresses = [
    mino.address,
    wbnb.address,
    router.address,
    liquidityMiningMasterMino.address,
    dev,
  ];
  const _minoToWbnbPath = [mino.address, wbnb.address];
  const _lmpShares = "300";
  const _floorRatio = "10000000000";
  const _slippageFactor = "9950";
  const _operatorFee = "300";

  await deploy("Distributor", {
    from: deployer,
    contract: "Distributor",
    args: [
      _addresses,
      _minoToWbnbPath,
      _lmpShares,
      _floorRatio,
      _slippageFactor,
      _operatorFee,
    ],
    log: true,
    skipIfAlreadyDeployed: true,
  });
};

export default func;
func.tags = ["MINO", "Distributor_deploy"];
func.dependencies = ["MINO_deploy", "LiquidityMiningMaster_MINO_deploy", "PCS"];
