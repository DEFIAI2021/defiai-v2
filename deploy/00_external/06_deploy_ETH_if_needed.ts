import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  let eth = await deployments.getOrNull("ETH");
  if (!eth) {
    eth = await deploy("ETH", {
      from: deployer,
      contract: "FakeToken",
      args: ["Pegged Ether", "ETH"],
      log: true,
    });
  }
};
export default func;
func.tags = ["ETH"];
func.skip = skipUnlessTestnet;
