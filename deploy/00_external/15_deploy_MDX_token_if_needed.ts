import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  let mdexToken = await deployments.getOrNull("MdxToken");
  if (!mdexToken) {
    mdexToken = await deploy("MdxToken", {
      from: deployer,
      contract: "MdxToken",
      log: true,
    });
  }
};
export default func;
func.tags = ["MDEX", "MDX_deploy", "MdexToken"];
func.skip = skipUnlessTestnet;
