import { BigNumber } from "ethers";
import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { execute, catchUnknownSigner, deploy, get, read } = deployments;
  const { deployer, dev } = await getNamedAccounts();

  const ifc = await get("IFC");
  const ifcPool = await get("IFCPool");

  let balances = [];
  try {
    balances = await read(
      "IFC",
      "balanceOfBatch",
      [
        ifcPool.address,
        ifcPool.address,
        ifcPool.address,
        ifcPool.address,
        ifcPool.address,
        ifcPool.address,
      ],
      [0, 1, 2, 3, 4, 5]
    );
  } catch (e) {
    console.log(e);
  }

  if (balances.length > 0) {
    if (balances[0] !== BigNumber.from(3)) {
      await catchUnknownSigner(
        execute(
          "IFC",
          { from: deployer, log: true },
          "safeBatchTransferFrom",
          deployer,
          ifcPool.address,
          [0, 1, 2, 3, 4, 5],
          [30, 30, 60, 60, 400, 400],
          0x0
        )
      );
    }
  }
};

export default func;
func.tags = ["IFC_setup", "IFC"];
func.dependencies = ["IFCPool_deploy"];
