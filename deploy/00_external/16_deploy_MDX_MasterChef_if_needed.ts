import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { parseEther } from "ethers/lib/utils";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  const mdx = await deployments.get("MdxToken");

  let masterChef = await deployments.getOrNull("BSCPool");
  if (!masterChef) {
    const _mdx = mdx.address;
    const _mdxPerBlock = parseEther("67.84");
    const _startBlock = 0;
    masterChef = await deploy("BSCPool", {
      from: deployer,
      contract: "BSCPool",
      args: [_mdx, _mdxPerBlock, _startBlock],
      log: true,
    });
  }
};
export default func;
func.tags = ["MDEX", "MdexMasterChef"];
func.dependencies = ["MdexRouter", "MDX_deploy"];
func.skip = skipUnlessTestnet;
