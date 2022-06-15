import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { parseEther } from "ethers/lib/utils";
import { isTest, skipUnlessTest } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { catchUnknownSigner, read, execute, get } = deployments;

  const { deployer } = await getNamedAccounts();

  const minoFarm = await get("MinoFarm");

  let balance;
  try {
    balance = await read("MinoToken", "balanceOf", [minoFarm.address]);
  } catch (e) {}

  if (balance) {
    if (balance !== parseEther("1860000000")) {
      await catchUnknownSigner(
        execute(
          "MinoToken",
          { from: deployer, log: true },
          "transfer",
          parseEther("1860000000")
        )
      );
    }
  }
};

export default func;
func.tags = ["MINO", "MinoFarm_fund"];
func.dependencies = ["MinoFarm_deploy", "MINO_deploy"];
func.skip = skipUnlessTest;
