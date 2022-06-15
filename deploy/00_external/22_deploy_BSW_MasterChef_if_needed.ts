import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { parseEther } from "ethers/lib/utils";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  const bsw = await deployments.get("BSWToken");

  let masterChef = await deployments.getOrNull("BSWMasterChef");
  if (!masterChef) {
    const _BSW = bsw.address;
    const _devaddr = dev;
    const _refAddr = dev;
    const _safuaddr = dev;
    const _BSWPerBlock = parseEther("40");
    const _startBlock = 700000;
    const _stakingPercent = 100000;
    const _devPercent = 100000;
    const _refPercent = 100000;
    const _safuPercent = 100;
    masterChef = await deploy("BSWMasterChef", {
      from: deployer,
      contract: "BSWMasterChef",
      args: [
        _BSW,
        _devaddr,
        _refAddr,
        _safuaddr,
        _BSWPerBlock,
        _startBlock,
        _stakingPercent,
        _devPercent,
        _refPercent,
        _safuPercent,
      ],
      log: true,
    });
  }
};
export default func;
func.tags = ["BSW", "BSWMasterChef"];
func.dependencies = ["BiswapRouter", "Biswap_deploy"];
func.skip = skipUnlessTestnet;
