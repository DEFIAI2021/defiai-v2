import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, read } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  console.log(deployer);
  

  let pcsFactory = await deployments.getOrNull("PancakeFactory");
  if (!pcsFactory) {
    pcsFactory = await deploy("PancakeFactory", {
      from: deployer,
      contract: "PancakeFactory",
      args: [dev],
      log: true,
    });
  }
};
export default func;
func.tags = ["PCS", "PancakeFactory"];
func.skip = skipUnlessTestnet;
