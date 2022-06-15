import { getNamedAccounts } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { isTestnet, skipUnlessTest } from "../../utils/network";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre;
  const { execute, read, deploy, get } = deployments;
  const { deployer, dev } = await getNamedAccounts();

  const router = await get("PancakeRouter");
  const router2 = await get("BiswapRouter");
  const bswFarm = await get("BSWMasterChef");
  const busd = await get("BUSD");
  const bsw = await get("BSWToken");
  const wbnb = await get("WBNB");
  const busdWbnb = await get("BSW_BUSD_WBNB");
  const ifcPool = await get("IFCPool");

  const _pid = isTestnet(hre) ? 1 : 3;
  const farmContractAddress = bswFarm.address;
  const pcsRouterAddress = router.address;
  const bswRouterAddress = router2.address;
  const wantAddress = busd.address;
  const earnedAddress = bsw.address;
  const wbnbAddress = wbnb.address;
  const devAddress = dev;
  const distributorAddress = dev;
  const ifcPoolAdress = ifcPool.address;
  const lpToken = busdWbnb.address;
  const tokenA = busd.address;
  const tokenB = wbnb.address;

  await deploy("IFCStrat", {
    from: deployer,
    contract: "IFCStrat",
    args: [
      _pid,
      [
        farmContractAddress,
        pcsRouterAddress,
        bswRouterAddress,
        wantAddress,
        earnedAddress,
        wbnbAddress,
        devAddress,
        distributorAddress,
        ifcPoolAdress,
        lpToken,
        tokenA,
        tokenB,
      ],
    ],
    log: true,
    skipIfAlreadyDeployed: true,
  });

  const pid = await read(
    "IFCStrat",
    {
      from: deployer,
    },
    "pid"
  );

  console.log(pid.toString());
};

export default func;
func.tags = ["IFC", "IFCStrat_deploy"];
func.dependencies = [
  "Biswap_deploy",
  "BSWMasterChef",
  "PancakeRouter",
  "BSW_BUSD_WBNB",
  "BUSD_WBNB",
  "IFCPool_deploy",
];
