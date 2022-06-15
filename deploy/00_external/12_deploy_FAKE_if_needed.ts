import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { skipUnlessTest, skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  let fake = await deployments.getOrNull("FAKE");
  if (!fake) {
    fake = await deploy("FAKE", {
      from: deployer,
      contract: "FakeToken",
      args: ["Fake Token", "FAKE"],
      log: true,
    });
  }
};
export default func;
func.tags = ["FAKE"];
func.skip = skipUnlessTestnet;
