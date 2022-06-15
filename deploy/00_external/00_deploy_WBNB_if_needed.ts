import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  let pcsFactory = await deployments.getOrNull("WBNB");
  if (!pcsFactory) {
    pcsFactory = await deploy("WBNB", {
      from: deployer,
      contract: "WBNB",
      log: true,
    });
  }
};
export default func;
func.tags = ["WBNB"];
func.skip = skipUnlessTestnet;
