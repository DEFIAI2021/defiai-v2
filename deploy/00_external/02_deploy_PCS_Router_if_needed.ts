import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, read } = deployments;

  const { deployer } = await getNamedAccounts();

  const factory = await deployments.get("PancakeFactory");
  const wbnb = await deployments.get("WBNB");

  // console.log(
  //   `Cake Factory INIT: ${await read("PancakeFactory", "INIT_CODE_PAIR_HASH")}`
  // );

  let pcsRouter = await deployments.getOrNull("PancakeRouter");
  if (!pcsRouter) {
    pcsRouter = await deploy("PancakeRouter", {
      from: deployer,
      contract: "PancakeRouter",
      args: [factory.address, wbnb.address],
      log: true,
    });
  }
};
export default func;
func.tags = ["PCS", "PancakeRouter"];
func.dependencies = ["PancakeFactory", "WBNB"];
func.skip = skipUnlessTestnet;
