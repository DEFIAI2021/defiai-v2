import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, getOrNull, execute } = deployments;

  const { deployer } = await getNamedAccounts();

  const _name = "AcryptoS";
  const _symbol = "ACS4";
  const _decimals = "18";
  const _supply = "0";

  let curveLp = await getOrNull("CurveLpToken");
  if (!curveLp) {
    curveLp = await deploy("CurveLpToken", {
      from: deployer,
      contract: "CurveLpToken",
      args: [_name, _symbol, _decimals, _supply],
      log: true,
    });
  }
};
export default func;
func.tags = ["ACS", "CurveLpToken"];
func.skip = skipUnlessTestnet;
