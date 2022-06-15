import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  let busd = await deployments.getOrNull("BUSD");
  if (!busd) {
    busd = await deploy("BUSD", {
      from: deployer,
      contract: "FakeToken",
      args: ["Binance USD", "BUSD"],
      log: true,
    });
  }

  let usdt = await deployments.getOrNull("USDT");
  if (!usdt) {
    usdt = await deploy("USDT", {
      from: deployer,
      contract: "FakeToken",
      args: ["USDT", "USDT"],
      log: true,
    });
  }

  let dai = await deployments.getOrNull("DAI");
  if (!dai) {
    dai = await deploy("DAI", {
      from: deployer,
      contract: "FakeToken",
      args: ["DAI", "DAI"],
      log: true,
    });
  }

  let usdc = await deployments.getOrNull("USDC");
  if (!usdc) {
    usdc = await deploy("USDC", {
      from: deployer,
      contract: "FakeToken",
      args: ["USDC", "USDC"],
      log: true,
    });
  }
};
export default func;
func.tags = ["BUSD", "USDT", "DAI", "USDC"];
func.skip = skipUnlessTestnet;
