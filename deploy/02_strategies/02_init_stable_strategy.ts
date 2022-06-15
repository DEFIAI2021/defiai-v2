import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getNamedAccounts } from "hardhat";
import { parseEther } from "ethers/lib/utils";
import { isTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { execute, catchUnknownSigner, deploy } = deployments;
  const { deployer, reward } = await getNamedAccounts();

  const pcsFarm = await deployments.get("MasterChef");
  const pcsLp = await deployments.get("BUSD_USDT");
  const cake = await deployments.get("CakeToken");
  const pcsRouter = await deployments.get("PancakeRouter");

  const mdex = await deployments.get("MdxToken");
  const mdexLp = await deployments.get("MDEX_BUSD_USDT");
  const mdexFarm = await deployments.get("BSCPool");
  const mdexRouter = await deployments.get("MdexRouter");

  const bsw = await deployments.get("BSWToken");
  const bswLp = await deployments.get("BSW_BUSD_USDT");
  const bswFarm = await deployments.get("BSWMasterChef");
  const bswRouter = await deployments.get("BiswapRouter");

  const _pcsAddresses = [
    pcsFarm.address,
    pcsLp.address,
    cake.address,
    pcsRouter.address,
  ];
  const _pcsPid = isTestnet(hre) ? 1 : 7;
  const _mdexAddresses = [
    mdexFarm.address,
    mdexLp.address,
    mdex.address,
    mdexRouter.address,
  ];
  const _mdxPid = isTestnet(hre) ? 0 : 32;
  const _bswAddresses = [
    bswFarm.address,
    bswLp.address,
    bsw.address,
    bswRouter.address,
  ];
  const _bswPid = isTestnet(hre) ? 1 : 1;

  await catchUnknownSigner(
    execute(
      "DeFiAIStableStrat",
      { from: deployer, log: true },
      "init",
      _pcsAddresses,
      _pcsPid,
      _mdexAddresses,
      _mdxPid,
      _bswAddresses,
      _bswPid
    )
  );
};
export default func;
func.tags = ["Strategy_init"];
func.dependencies = [
  "BUSD_USDT",
  "MDEX_BUSD_USDT",
  "BSW_BUSD_USDT",
  "PCS",
  "DEFIAI",
  "MDEX",
  "BSW",
  "Strategy_deploy",
];
