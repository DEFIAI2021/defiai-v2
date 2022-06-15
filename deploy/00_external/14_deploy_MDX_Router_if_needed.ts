import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, read } = deployments;

  const { deployer } = await getNamedAccounts();

  const factory = await deployments.get("MdexFactory");
  const wbnb = await deployments.get("WBNB");
  const threshold = 3000;

  // console.log(
  //   `MDEX Factory INIT: ${await read("MdexFactory", "initCodeHash")}`
  // );

  let pcsRouter = await deployments.getOrNull("MdexRouter");
  if (!pcsRouter) {
    pcsRouter = await deploy("MdexRouter", {
      from: deployer,
      contract: "MdexRouter",
      args: [factory.address, wbnb.address, threshold],
      log: true,
    });
  }
};
export default func;
func.tags = ["MDEX", "MdexRouter"];
func.dependencies = ["MdexFactory", "WBNB"];
func.skip = skipUnlessTestnet;
