import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  let bswToken = await deployments.getOrNull("BSWToken");
  if (!bswToken) {
    bswToken = await deploy("BSWToken", {
      from: deployer,
      contract: "BSWToken",
      log: true,
    });
  }
};
export default func;
func.tags = ["BSW", "Biswap_deploy", "BSWToken"];
func.skip = skipUnlessTestnet;
