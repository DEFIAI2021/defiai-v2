import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, read } = deployments;

  const { deployer } = await getNamedAccounts();

  const factory = await deployments.get("BiswapFactory");
  const wbnb = await deployments.get("WBNB");

  console.log(
    `BSW Factory INIT: ${await read("BiswapFactory", "INIT_CODE_HASH")}`
  );

  let pcsRouter = await deployments.getOrNull("BiswapRouter");
  if (!pcsRouter) {
    pcsRouter = await deploy("BiswapRouter", {
      from: deployer,
      contract: "BiswapRouter02",
      args: [factory.address, wbnb.address],
      log: true,
    });
  }
};
export default func;
func.tags = ["PCS", "BiswapRouter"];
func.dependencies = ["BiswapFactory", "WBNB"];
func.skip = skipUnlessTestnet;
