import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { execute, read, catchUnknownSigner } = deployments;
  const { deployer } = await getNamedAccounts();

  const masterChef = await deployments.get("BSWMasterChef");

  let currentOwner;
  try {
    currentOwner = await read("BSWToken", "isMinter", masterChef.address);
  } catch (e) {}

  // if (currentOwner) {
    await catchUnknownSigner(
      execute(
        "BSWToken",
        { from: deployer, log: true },
        "addMinter",
        masterChef.address
      )
    );
  // }
};
export default func;
func.tags = ["BSW", "BSW_transfer_ownership"];
func.dependencies = ["BSWMasterChef", "Biswap_deploy"];
func.skip = skipUnlessTestnet;
