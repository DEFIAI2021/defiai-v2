import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, read } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  let pcsFactory = await deployments.getOrNull("BiswapFactory");
  if (!pcsFactory) {
    pcsFactory = await deploy("BiswapFactory", {
      from: deployer,
      contract: "BiswapFactory",
      args: [dev],
      log: true,
    });
  }
};
export default func;
func.tags = ["BSW", "BiswapFactory"];
func.skip = skipUnlessTestnet;
