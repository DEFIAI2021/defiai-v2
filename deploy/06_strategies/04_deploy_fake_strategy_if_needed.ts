import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getNamedAccounts } from "hardhat";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { execute, catchUnknownSigner, deploy } = deployments;
  const { deployer, dev } = await getNamedAccounts();

  const fake = await deployments.get("FAKE");
  const farm = await deployments.get("MinoFarm");

  const _wantAddress = fake.address;
  const _devAddress = dev;
  const _farmAddress = farm.address;

  const stratRes = await deploy("FakeStrat", {
    from: deployer,
    contract: "FakeStrat",
    args: [_wantAddress, _devAddress, _farmAddress],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  if (stratRes.newlyDeployed) {
    await catchUnknownSigner(
      execute(
        "MinoFarm",
        { from: deployer, log: true },
        "add",
        1000,
        fake.address,
        false,
        stratRes.address
      )
    );
  }
};
export default func;
func.tags = ["FakeStrategy_deploy"];
func.dependencies = ["MINO", "FAKE"];
