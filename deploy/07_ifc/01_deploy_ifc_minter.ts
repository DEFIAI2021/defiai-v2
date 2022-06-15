import { parseEther } from "ethers/lib/utils";
import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { isTest } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { execute, getOrNull, deploy, get } = deployments;
  const { deployer, dev } = await getNamedAccounts();

  const ifc = await get("IFC");
  const busd = await get("BUSD");
  const mino = await get("MinoToken");

  // @todo reconfirm tokenomics
  const _ifc = ifc.address;
  const _mino = mino.address;
  const _want = busd.address;
  const _minoPerBlock = parseEther("0.96");

  await deploy("IFCPool", {
    from: deployer,
    contract: "IFCPool",
    args: [_ifc, _mino, _want, _minoPerBlock],
    log: true,
    skipIfAlreadyDeployed: true,
  });
};

export default func;
func.tags = ["IFCPool_deploy", "IFC"];
func.dependencies = ["IFC_deploy", "MINO_deploy", "BUSD"];
