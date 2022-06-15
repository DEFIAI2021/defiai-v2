import * as dotenv from "dotenv";

import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@nomiclabs/hardhat-vyper";
import { accounts, node_url } from "./utils/network";

dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  mocha: {
    timeout: 400000,
  },
  vyper: {
    compilers: [
      {
        version: "0.2.7",
      },
    ],
  },
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  namedAccounts: {
    deployer: {
      default: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      // default: "0x37ad7978bfFCADBEcc002a6E08bCFcF7F5c311B1",
      // default: "0x6f1a329728634a9fef7fc9aFEB772ceE9721b990",
      bsctestnet: "0x6f1a329728634a9fef7fc9aFEB772ceE9721b990",
      bsc: "0xf93eB86071513A16E5a30440611E788dc05D922a",
    },

    dev: {
      default: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      // default: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      // default: "0x84e570e1cC2588c6Ed2a4CB7d94b86493B938d45",
      // default: "0xE3B85376274989B45B2AD3D85AdE3c283f67aa89",
      bsctestnet: "0xE3B85376274989B45B2AD3D85AdE3c283f67aa89",
      bsc: "0x4039df75f6990eef6f0cDF832e30C5a8D208671a",
    },
    upgradeAdmin: {
      default: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      bsctestnet: "0x86B59124A737Df783D3C45CD6Cd8FcF0e3D8E54b",
      bsc: "0x84e570e1cC2588c6Ed2a4CB7d94b86493B938d45",
    },
    reward: {
      default: "0x0dd58549666BbAFae53589878863fF85a28Fb0Ed",
      bsctestnet: "0x0dd58549666BbAFae53589878863fF85a28Fb0Ed",
      bsc: "0x0dd58549666BbAFae53589878863fF85a28Fb0Ed",
    },
    backendAdmin: {
      default: "0xECeb96086D23201482c46869e65Ae7Be2500Be70",
      bsctestnet: "0xECeb96086D23201482c46869e65Ae7Be2500Be70",
      bsc: "0xECeb96086D23201482c46869e65Ae7Be2500Be70",
    },
  },
  networks: {
    hardhat: {
      accounts: accounts(process.env.HARDHAT_FORK),
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
      allowUnlimitedContractSize: true,
      tags: ["testnet","L1", "L2"],
      // forking: process.env.HARDHAT_FORK
      //   ? {
      //       url: node_url(process.env.HARDHAT_FORK),
      //       blockNumber: process.env.HARDHAT_FORK_NUMBER
      //         ? parseInt(process.env.HARDHAT_FORK_NUMBER)
      //         : undefined,
      //     }
      //   : undefined,
      deploy: ["deploy"],
      saveDeployments: false,
      // forking: {
      //   url: <string>process.env.BSC_TEST_URL,
      //   blockNumber: 15528995,
      // },
      // accounts: [
      //   {
      //     balance: parseEther("100").toString(),
      //     privateKey:
      //       process.env.PRIVATE_KEY1 !== undefined
      //         ? process.env.PRIVATE_KEY1
      //         : "",
      //   },
      //   {
      //     balance: parseEther("100").toString(),
      //     privateKey:
      //       process.env.PRIVATE_KEY2 !== undefined
      //         ? process.env.PRIVATE_KEY2
      //         : "",
      //   },
      // ],
    },
    localhost: {
      allowUnlimitedContractSize: true,
      deploy: ["deploy"],
      saveDeployments: true,
      tags: ["testnet", "L1"],
      accounts: accounts("localhost"),
    },
    bsctestnet: {
      url: node_url("bsctestnet"),
      chainId: 97,
      allowUnlimitedContractSize: true,
      timeout: 60000,
      tags: ["testnet", "L1"],
      accounts: accounts("bsctestnet"),
    },
    bsc: {
      url: node_url("bsc"),
      chainId: 56,
      allowUnlimitedContractSize: true,
      timeout: 60000,
      tags: ["L1"],
      accounts: accounts("bsc"),
    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
  gasReporter: {
    enabled:
      process.env.REPORT_GAS === undefined
        ? false
        : Boolean(Number(process.env.REPORT_GAS)),
    currency: "USD",
    coinmarketcap: process.env.CMC_API_KEY,
    gasPrice: 10,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  external: process.env.HARDHAT_FORK
    ? {
        deployments: {
          hardhat: ["deployments/" + process.env.HARDHAT_FORK],
        },
      }
    : undefined,
};

export default config;
