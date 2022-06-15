import { EthereumProvider } from "hardhat/types";

export const increaseTime = async (
  provider: EthereumProvider,
  seconds: number
) => {
  await provider.request({
    method: "evm_increaseTime",
    params: [seconds],
  });

  await provider.request({
    method: "evm_mine",
    params: [],
  });
};

export const mineBlocks = async (
  provider: EthereumProvider,
  blockNumber: number
): Promise<void> => {
  const oldBlockNumber = parseInt(
    <string>await provider.request({
      method: "eth_blockNumber",
    })
  );
  const minePromises = [];
  for (let i = 0; i < blockNumber; i++) {
    minePromises.push(
      provider.request({
        method: "evm_mine",
        params: [],
      })
    );
  }
  await Promise.all(minePromises);
  const newBlockNumber = parseInt(
    <string>await provider.request({
      method: "eth_blockNumber",
    })
  );
  console.log(`Mined ${newBlockNumber - oldBlockNumber} blocks...`);
  console.log(`Old height: ${oldBlockNumber}`);
  console.log(`New height: ${newBlockNumber}`);
};
