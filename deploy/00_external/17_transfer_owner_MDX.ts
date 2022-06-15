import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { execute, read, catchUnknownSigner } = deployments;
  const { deployer } = await getNamedAccounts();

  const masterChef = await deployments.get("BSCPool");

  let isMinter;
  try {
    isMinter = await read("MdxToken", "isMinter", masterChef.address);
  } catch (e) {}

  if (!isMinter) {
    await catchUnknownSigner(
      execute(
        "MdxToken",
        { from: deployer, log: true },
        "addMinter",
        masterChef.address
      )
    );
  }
};
export default func;
func.tags = ["MDEX", "MdxToken_transfer_ownership"];
func.dependencies = ["MdexMasterChef", "MDEX_deploy"];
func.skip = skipUnlessTestnet;
