import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { parseEther } from "ethers/lib/utils";
import { skipUnlessTestnet } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { catchUnknownSigner, read, execute, get } = deployments;

  const { deployer } = await getNamedAccounts();

  const minoFarm = await get("MinoFarm");

  let balance;
  try {
    balance = await read("MinoToken", "balanceOf", minoFarm.address);
  } catch (e) {
    console.log(e);
  }

  if (balance) {
    if (balance !== parseEther("2000000000")) {
      await catchUnknownSigner(
        execute(
          "MinoToken",
          { from: deployer, log: true },
          "transfer",
          minoFarm.address,
          parseEther("2000000000")
        )
      );
    }
  }
};

export default func;
func.tags = ["MINO", "MinoFarm_fund"];
func.dependencies = ["MinoFarm_deploy", "MINO_deploy"];
func.skip = skipUnlessTestnet;
