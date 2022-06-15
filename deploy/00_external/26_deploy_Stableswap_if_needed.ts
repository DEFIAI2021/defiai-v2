import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { skipUnlessTestnet } from "../../utils/network";
import { parseEther } from "ethers/lib/utils";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, get, catchUnknownSigner, execute } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  const busd = await get("BUSD");
  const usdt = await get("USDT");
  const dai = await get("DAI");
  const usdc = await get("USDC");
  const curveLp = await get("CurveLpToken");

  const _owner = deployer;
  const _coins = [busd.address, usdt.address, dai.address, usdc.address];
  const _pool_token = curveLp.address;
  const _A = 100;
  const _fee = 4000000;
  const _admin_fee = 5000000000;
  const _admin_fee_address = dev;

  const stableSwap = await deploy("Stableswap", {
    from: deployer,
    contract: "Stableswap",
    args: [
      _owner,
      _coins,
      _pool_token,
      _A,
      _fee,
      _admin_fee,
      _admin_fee_address,
    ],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  await catchUnknownSigner(
    execute(
      "BUSD",
      { from: deployer, log: true },
      "devMint",
      parseEther("1000000")
    )
  );

  await catchUnknownSigner(
    execute(
      "BUSD",
      { from: deployer, log: true },
      "approve",
      stableSwap.address,
      parseEther("1000000")
    )
  );

  await catchUnknownSigner(
    execute(
      "USDT",
      { from: deployer, log: true },
      "devMint",
      parseEther("1000000")
    )
  );

  await catchUnknownSigner(
    execute(
      "USDT",
      { from: deployer, log: true },
      "approve",
      stableSwap.address,
      parseEther("1000000")
    )
  );

  await catchUnknownSigner(
    execute(
      "DAI",
      { from: deployer, log: true },
      "devMint",
      parseEther("1000000")
    )
  );

  await catchUnknownSigner(
    execute(
      "DAI",
      { from: deployer, log: true },
      "approve",
      stableSwap.address,
      parseEther("1000000")
    )
  );

  await catchUnknownSigner(
    execute(
      "USDC",
      { from: deployer, log: true },
      "devMint",
      parseEther("1000000")
    )
  );

  await catchUnknownSigner(
    execute(
      "USDC",
      { from: deployer, log: true },
      "approve",
      stableSwap.address,
      parseEther("1000000")
    )
  );

  // await Promise.all([busd1, busd2, usdt1, usdt2, dai1, dai2, usdc1, usdc2]);

  await execute(
    "CurveLpToken",
    { from: deployer },
    "set_minter",
    stableSwap.address
  );
  await catchUnknownSigner(
    execute(
      "Stableswap",
      { from: deployer, log: true },
      "add_liquidity",
      [
        parseEther("1000000"),
        parseEther("1000000"),
        parseEther("1000000"),
        parseEther("1000000"),
      ],
      0
    )
  );
};

export default func;
func.tags = ["ACS", "Stableswap"];
func.dependencies = ["CurveLpToken"];
func.skip = skipUnlessTestnet;
