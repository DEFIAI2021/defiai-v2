/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BSWMasterChef, BSWMasterChefInterface } from "../BSWMasterChef";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract BSWToken",
        name: "_BSW",
        type: "address",
      },
      {
        internalType: "address",
        name: "_devaddr",
        type: "address",
      },
      {
        internalType: "address",
        name: "_refAddr",
        type: "address",
      },
      {
        internalType: "address",
        name: "_safuaddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_BSWPerBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_startBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_stakingPercent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_devPercent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_refPercent",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_safuPercent",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EmergencyWithdraw",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "pid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "BONUS_MULTIPLIER",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BSW",
    outputs: [
      {
        internalType: "contract BSWToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BSWPerBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_allocPoint",
        type: "uint256",
      },
      {
        internalType: "contract IBEP20",
        name: "_lpToken",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_withUpdate",
        type: "bool",
      },
    ],
    name: "add",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "depositedBsw",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "devPercent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "devaddr",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
    ],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "enterStaking",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_from",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_to",
        type: "uint256",
      },
    ],
    name: "getMultiplier",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastBlockDevWithdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "leaveStaking",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "massUpdatePools",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
    ],
    name: "migrate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "migrator",
    outputs: [
      {
        internalType: "contract IMigratorChef",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "pendingBSW",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "percentDec",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "poolInfo",
    outputs: [
      {
        internalType: "contract IBEP20",
        name: "lpToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allocPoint",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastRewardBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "accBSWPerShare",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "poolLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "refAddr",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "refPercent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "safuPercent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "safuaddr",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_allocPoint",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_withUpdate",
        type: "bool",
      },
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_devaddr",
        type: "address",
      },
    ],
    name: "setDevAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IMigratorChef",
        name: "_migrator",
        type: "address",
      },
    ],
    name: "setMigrator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_refaddr",
        type: "address",
      },
    ],
    name: "setRefAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_safuaddr",
        type: "address",
      },
    ],
    name: "setSafuAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingPercent",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAllocPoint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newAmount",
        type: "uint256",
      },
    ],
    name: "updateBswPerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "multiplierNumber",
        type: "uint256",
      },
    ],
    name: "updateMultiplier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
    ],
    name: "updatePool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardDebt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawDevAndRefFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052620f42406002556001600c55600060105534801561002157600080fd5b506040516200284d3803806200284d833981810160405261014081101561004757600080fd5b508051602082015160408301516060840151608085015160a086015160c087015160e08801516101008901516101209099015197989697959694959394929391929091600061009461023b565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350600180546001600160a01b03199081166001600160a01b039c8d1690811783556007805483169c8e169c909c17909b556009805482169a8d169a909a17909955600880548a16988c1698909817909755600b9590955560118490556003929092556004908155600591909155600692909255600a819055604080516080810182529586526103e860208701818152918701928352600060608801818152600e8054978801815590915296517fbb7b4a454dc3493923482f07822329ed19e8244eff582cc204f8554c3620c3fd9590940294850180549096169390971692909217909355517fbb7b4a454dc3493923482f07822329ed19e8244eff582cc204f8554c3620c3fe82015590517fbb7b4a454dc3493923482f07822329ed19e8244eff582cc204f8554c3620c3ff82015590517fbb7b4a454dc3493923482f07822329ed19e8244eff582cc204f8554c3620c4009091015560105561023f565b3390565b6125fe806200024f6000396000f3fe608060405234801561001057600080fd5b50600436106102525760003560e01c80635312ea8e116101465780638da5cb5b116100c3578063d0d41fe111610087578063d0d41fe1146105b7578063d49e77cd146105dd578063e0dcd30d146105e5578063e2bbb158146105ed578063f2fde38b14610610578063fc3c28af1461063657610252565b80638da5cb5b146105375780638dbb1e3a1461053f57806393f1a40b14610562578063b76e360c146105a7578063be1193ea146105af57610252565b806369d0c5b81161010a57806369d0c5b8146104f1578063715018a6146104f95780637c7be2fa146105015780637cd07e47146105275780638aa285501461052f57610252565b80635312ea8e1461047c57806359d5335b146104995780635ffe6146146104a1578063630b5ba1146104be57806364482f79146104c657610252565b806323cf3118116101d457806341441d3b1161019857806341441d3b146103fa578063441a3e7014610417578063454b06081461043a57806348cd4cb11461045757806351eb05a61461045f57610252565b806323cf31181461035f578063295315bf14610385578063305371ee146103b1578063333667dc146103d557806340627265146103f257610252565b80631526fe271161021b5780631526fe27146102c657806317caf6f11461031357806318678a731461031b5780631eaaa0451461032357806321b1aecb1461035757610252565b8062a2e3be14610257578063061e26af14610271578063081e3eda146102995780631058d281146102a157806312270c40146102be575b600080fd5b61025f61063e565b60408051918252519081900360200190f35b6102976004803603602081101561028757600080fd5b50356001600160a01b0316610644565b005b61025f6106be565b610297600480360360208110156102b757600080fd5b50356106c4565b61029761084e565b6102e3600480360360208110156102dc57600080fd5b5035610ab1565b604080516001600160a01b0390951685526020850193909352838301919091526060830152519081900360800190f35b61025f610af2565b61025f610af8565b6102976004803603606081101561033957600080fd5b508035906001600160a01b0360208201351690604001351515610afe565b61025f610c79565b6102976004803603602081101561037557600080fd5b50356001600160a01b0316610c7f565b61025f6004803603604081101561039b57600080fd5b50803590602001356001600160a01b0316610cf9565b6103b9610e78565b604080516001600160a01b039092168252519081900360200190f35b610297600480360360208110156103eb57600080fd5b5035610e87565b61025f610f8c565b6102976004803603602081101561041057600080fd5b5035610f92565b6102976004803603604081101561042d57600080fd5b50803590602001356110cb565b6102976004803603602081101561045057600080fd5b5035611264565b61025f6114c0565b6102976004803603602081101561047557600080fd5b50356114c6565b6102976004803603602081101561049257600080fd5b503561168b565b61025f611726565b610297600480360360208110156104b757600080fd5b503561172c565b610297611789565b610297600480360360608110156104dc57600080fd5b508035906020810135906040013515156117ac565b6103b961187d565b61029761188c565b6102976004803603602081101561051757600080fd5b50356001600160a01b031661192e565b6103b96119a8565b61025f6119b7565b6103b96119bd565b61025f6004803603604081101561055557600080fd5b50803590602001356119cc565b61058e6004803603604081101561057857600080fd5b50803590602001356001600160a01b03166119e7565b6040805192835260208301919091528051918290030190f35b61025f611a0b565b61025f611a11565b610297600480360360208110156105cd57600080fd5b50356001600160a01b0316611a17565b6103b9611a91565b6103b9611aa0565b6102976004803603604081101561060357600080fd5b5080359060200135611aaf565b6102976004803603602081101561062657600080fd5b50356001600160a01b0316611bff565b61025f611c60565b60065481565b61064c611c66565b6000546001600160a01b0390811691161461069c576040805162461bcd60e51b815260206004820181905260248201526000805160206125a9833981519152604482015290519081900360640190fd5b600980546001600160a01b0319166001600160a01b0392909216919091179055565b600e5490565b6000600e6000815481106106d457fe5b600091825260208083203384527ff4803e074bd026baaf6ed2e288c9515f68c72fb7216eebdd7cae1718a53ec375909152604090922080546004909202909201925083111561075f576040805162461bcd60e51b81526020600482015260126024820152711dda5d1a191c985dce881b9bdd0819dbdbd960721b604482015290519081900360640190fd5b61076960006114c6565b60006107a3826001015461079d64e8d4a5100061079787600301548760000154611c6a90919063ffffffff16565b90611cc3565b90611d05565b905080156107b5576107b53382611d47565b83156107f05781546107c79085611d05565b825582546107df906001600160a01b03163386611ed8565b6012546107ec9085611d05565b6012555b6003830154825461080b9164e8d4a510009161079791611c6a565b600183015560408051858152905160009133917ff279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b5689181900360200190a350505050565b43600a5410610899576040805162461bcd60e51b81526020600482015260126024820152717761697420666f72206e657720626c6f636b60701b604482015290519081900360640190fd5b60006108a7600a54436119cc565b905060006108c0600b5483611c6a90919063ffffffff16565b6001546007546002546004549394506001600160a01b03928316936340c10f1993909216916108f59190610797908790611c6a565b6040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b15801561093b57600080fd5b505af115801561094f573d6000803e3d6000fd5b505050506040513d602081101561096557600080fd5b50506001546008546002546006546001600160a01b03938416936340c10f1993169161099691610797908790611c6a565b6040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b1580156109dc57600080fd5b505af11580156109f0573d6000803e3d6000fd5b505050506040513d6020811015610a0657600080fd5b50506001546009546002546005546001600160a01b03938416936340c10f19931691610a3791610797908790611c6a565b6040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b158015610a7d57600080fd5b505af1158015610a91573d6000803e3d6000fd5b505050506040513d6020811015610aa757600080fd5b505043600a555050565b600e8181548110610abe57fe5b600091825260209091206004909102018054600182015460028301546003909301546001600160a01b039092169350919084565b60105481565b60125481565b610b06611c66565b6000546001600160a01b03908116911614610b56576040805162461bcd60e51b815260206004820181905260248201526000805160206125a9833981519152604482015290519081900360640190fd5b8015610b6457610b64611789565b60006011544311610b7757601154610b79565b435b601054909150610b899085611f2a565b601055604080516080810182526001600160a01b03948516815260208101958652908101918252600060608201818152600e8054600181018255925291517fbb7b4a454dc3493923482f07822329ed19e8244eff582cc204f8554c3620c3fd600490920291820180546001600160a01b031916919096161790945593517fbb7b4a454dc3493923482f07822329ed19e8244eff582cc204f8554c3620c3fe840155517fbb7b4a454dc3493923482f07822329ed19e8244eff582cc204f8554c3620c3ff8301555090517fbb7b4a454dc3493923482f07822329ed19e8244eff582cc204f8554c3620c40090910155565b60025481565b610c87611c66565b6000546001600160a01b03908116911614610cd7576040805162461bcd60e51b815260206004820181905260248201526000805160206125a9833981519152604482015290519081900360640190fd5b600d80546001600160a01b0319166001600160a01b0392909216919091179055565b600080600e8481548110610d0957fe5b60009182526020808320878452600f825260408085206001600160a01b03898116875290845281862060049586029093016003810154815484516370a0823160e01b81523098810198909852935191985093969395939492909116926370a08231926024808301939192829003018186803b158015610d8757600080fd5b505afa158015610d9b573d6000803e3d6000fd5b505050506040513d6020811015610db157600080fd5b5051905086610dbf57506012545b836002015443118015610dd157508015155b15610e43576000610de68560020154436119cc565b90506000610e1f600254610797600354610e196010546107978c60010154610e19600b548b611c6a90919063ffffffff16565b90611c6a565b9050610e3e610e37846107978464e8d4a51000611c6a565b8590611f2a565b935050505b610e6b836001015461079d64e8d4a51000610797868860000154611c6a90919063ffffffff16565b9450505050505b92915050565b6001546001600160a01b031681565b610e8f611c66565b6000546001600160a01b03908116911614610edf576040805162461bcd60e51b815260206004820181905260248201526000805160206125a9833981519152604482015290519081900360640190fd5b6801a055690d9db80000811115610f34576040805162461bcd60e51b81526020600482015260146024820152734d61782070657220626c6f636b2033302042535760601b604482015290519081900360640190fd5b670de0b6b3a7640000811015610f87576040805162461bcd60e51b81526020600482015260136024820152724d696e2070657220626c6f636b20312042535760681b604482015290519081900360640190fd5b600b55565b600b5481565b6000600e600081548110610fa257fe5b600091825260208083203384527ff4803e074bd026baaf6ed2e288c9515f68c72fb7216eebdd7cae1718a53ec37590915260408320600490920201925090610fe9906114c6565b80541561103257600061101e826001015461079d64e8d4a5100061079787600301548760000154611c6a90919063ffffffff16565b90508015611030576110303382611d47565b505b821561106e57815461104f906001600160a01b0316333086611f84565b805461105b9084611f2a565b815560125461106a9084611f2a565b6012555b600382015481546110899164e8d4a510009161079791611c6a565b600182015560408051848152905160009133917f90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a159181900360200190a3505050565b8161111d576040805162461bcd60e51b815260206004820152601960248201527f77697468647261772042535720627920756e7374616b696e6700000000000000604482015290519081900360640190fd5b6000600e838154811061112c57fe5b60009182526020808320868452600f82526040808520338652909252922080546004909202909201925083111561119f576040805162461bcd60e51b81526020600482015260126024820152711dda5d1a191c985dce881b9bdd0819dbdbd960721b604482015290519081900360640190fd5b6111a8846114c6565b60006111d6826001015461079d64e8d4a5100061079787600301548760000154611c6a90919063ffffffff16565b90506111e23382611d47565b81546111ee9085611d05565b808355600384015461120b9164e8d4a51000916107979190611c6a565b60018301558254611226906001600160a01b03163386611ed8565b604080518581529051869133917ff279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b5689181900360200190a35050505050565b600d546001600160a01b03166112b8576040805162461bcd60e51b815260206004820152601460248201527336b4b3b930ba329d1037379036b4b3b930ba37b960611b604482015290519081900360640190fd5b6000600e82815481106112c757fe5b600091825260208083206004928302018054604080516370a0823160e01b81523095810195909552519195506001600160a01b0316939284926370a0823192602480840193829003018186803b15801561132057600080fd5b505afa158015611334573d6000803e3d6000fd5b505050506040513d602081101561134a57600080fd5b5051600d54909150611369906001600160a01b03848116911683611fe4565b600d546040805163ce5494bb60e01b81526001600160a01b0385811660048301529151600093929092169163ce5494bb9160248082019260209290919082900301818787803b1580156113bb57600080fd5b505af11580156113cf573d6000803e3d6000fd5b505050506040513d60208110156113e557600080fd5b5051604080516370a0823160e01b815230600482015290519192506001600160a01b038316916370a0823191602480820192602092909190829003018186803b15801561143157600080fd5b505afa158015611445573d6000803e3d6000fd5b505050506040513d602081101561145b57600080fd5b5051821461149f576040805162461bcd60e51b815260206004820152600c60248201526b1b5a59dc985d194e8818985960a21b604482015290519081900360640190fd5b83546001600160a01b0319166001600160a01b039190911617909255505050565b60115481565b6000600e82815481106114d557fe5b90600052602060002090600402019050806002015443116114f65750611688565b8054604080516370a0823160e01b815230600482015290516000926001600160a01b0316916370a08231916024808301926020929190829003018186803b15801561154057600080fd5b505afa158015611554573d6000803e3d6000fd5b505050506040513d602081101561156a57600080fd5b505190508261157857506012545b6000811161158d575043600290910155611688565b600061159d8360020154436119cc565b905060006115d0600254610797600354610e196010546107978a60010154610e19600b548b611c6a90919063ffffffff16565b600154604080516340c10f1960e01b81523060048201526024810184905290519293506001600160a01b03909116916340c10f19916044808201926020929091908290030181600087803b15801561162757600080fd5b505af115801561163b573d6000803e3d6000fd5b505050506040513d602081101561165157600080fd5b50611675905061166a846107978464e8d4a51000611c6a565b600386015490611f2a565b6003850155505043600290920191909155505b50565b6000600e828154811061169a57fe5b60009182526020808320858452600f825260408085203380875293529093208054600490930290930180549094506116df926001600160a01b03919091169190611ed8565b80546040805191825251849133917fbb757047c2b5f3974fe26b7c10f732e7bce710b0952a71082702781e62ae05959181900360200190a360008082556001909101555050565b60055481565b611734611c66565b6000546001600160a01b03908116911614611784576040805162461bcd60e51b815260206004820181905260248201526000805160206125a9833981519152604482015290519081900360640190fd5b600c55565b600e5460005b818110156117a8576117a0816114c6565b60010161178f565b5050565b6117b4611c66565b6000546001600160a01b03908116911614611804576040805162461bcd60e51b815260206004820181905260248201526000805160206125a9833981519152604482015290519081900360640190fd5b801561181257611812611789565b61184f82611849600e868154811061182657fe5b906000526020600020906004020160010154601054611d0590919063ffffffff16565b90611f2a565b60108190555081600e848154811061186357fe5b906000526020600020906004020160010181905550505050565b6009546001600160a01b031681565b611894611c66565b6000546001600160a01b039081169116146118e4576040805162461bcd60e51b815260206004820181905260248201526000805160206125a9833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b611936611c66565b6000546001600160a01b03908116911614611986576040805162461bcd60e51b815260206004820181905260248201526000805160206125a9833981519152604482015290519081900360640190fd5b600880546001600160a01b0319166001600160a01b0392909216919091179055565b600d546001600160a01b031681565b600c5481565b6000546001600160a01b031690565b600c546000906119e090610e198486611d05565b9392505050565b600f6020908152600092835260408084209091529082529020805460019091015482565b600a5481565b60035481565b611a1f611c66565b6000546001600160a01b03908116911614611a6f576040805162461bcd60e51b815260206004820181905260248201526000805160206125a9833981519152604482015290519081900360640190fd5b600780546001600160a01b0319166001600160a01b0392909216919091179055565b6007546001600160a01b031681565b6008546001600160a01b031681565b81611afa576040805162461bcd60e51b81526020600482015260166024820152756465706f73697420425357206279207374616b696e6760501b604482015290519081900360640190fd5b6000600e8381548110611b0957fe5b60009182526020808320868452600f82526040808520338652909252922060049091029091019150611b3a846114c6565b805415611b7d576000611b6f826001015461079d64e8d4a5100061079787600301548760000154611c6a90919063ffffffff16565b9050611b7b3382611d47565b505b8154611b94906001600160a01b0316333086611f84565b8054611ba09084611f2a565b8082556003830154611bbd9164e8d4a51000916107979190611c6a565b6001820155604080518481529051859133917f90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a159181900360200190a350505050565b611c07611c66565b6000546001600160a01b03908116911614611c57576040805162461bcd60e51b815260206004820181905260248201526000805160206125a9833981519152604482015290519081900360640190fd5b611688816120f7565b60045481565b3390565b600082611c7957506000610e72565b82820282848281611c8657fe5b04146119e05760405162461bcd60e51b81526004018080602001828103825260218152602001806125526021913960400191505060405180910390fd5b60006119e083836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250612197565b60006119e083836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250612239565b600154604080516370a0823160e01b815230600482015290516000926001600160a01b0316916370a08231916024808301926020929190829003018186803b158015611d9257600080fd5b505afa158015611da6573d6000803e3d6000fd5b505050506040513d6020811015611dbc57600080fd5b5051905080821115611e50576001546040805163a9059cbb60e01b81526001600160a01b038681166004830152602482018590529151919092169163a9059cbb9160448083019260209291908290030181600087803b158015611e1e57600080fd5b505af1158015611e32573d6000803e3d6000fd5b505050506040513d6020811015611e4857600080fd5b50611ed39050565b6001546040805163a9059cbb60e01b81526001600160a01b038681166004830152602482018690529151919092169163a9059cbb9160448083019260209291908290030181600087803b158015611ea657600080fd5b505af1158015611eba573d6000803e3d6000fd5b505050506040513d6020811015611ed057600080fd5b50505b505050565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b179052611ed3908490612293565b6000828201838110156119e0576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b604080516001600160a01b0380861660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b179052611fde908590612293565b50505050565b80158061206a575060408051636eb1769f60e11b81523060048201526001600160a01b03848116602483015291519185169163dd62ed3e91604480820192602092909190829003018186803b15801561203c57600080fd5b505afa158015612050573d6000803e3d6000fd5b505050506040513d602081101561206657600080fd5b5051155b6120a55760405162461bcd60e51b81526004018080602001828103825260368152602001806125736036913960400191505060405180910390fd5b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663095ea7b360e01b179052611ed3908490612293565b6001600160a01b03811661213c5760405162461bcd60e51b815260040180806020018281038252602681526020018061252c6026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b600081836122235760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156121e85781810151838201526020016121d0565b50505050905090810190601f1680156122155780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600083858161222f57fe5b0495945050505050565b6000818484111561228b5760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156121e85781810151838201526020016121d0565b505050900390565b60606122e8826040518060400160405280602081526020017f5361666542455032303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166123449092919063ffffffff16565b805190915015611ed35780806020019051602081101561230757600080fd5b5051611ed35760405162461bcd60e51b815260040180806020018281038252602a815260200180612502602a913960400191505060405180910390fd5b6060612353848460008561235b565b949350505050565b6060612366856124c8565b6123b7576040805162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015290519081900360640190fd5b60006060866001600160a01b031685876040518082805190602001908083835b602083106123f65780518252601f1990920191602091820191016123d7565b6001836020036101000a03801982511681845116808217855250505050505090500191505060006040518083038185875af1925050503d8060008114612458576040519150601f19603f3d011682016040523d82523d6000602084013e61245d565b606091505b509150915081156124715791506123539050565b8051156124815780518082602001fd5b60405162461bcd60e51b81526020600482018181528651602484015286518793919283926044019190850190808383600083156121e85781810151838201526020016121d0565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47081811480159061235357505015159291505056fe5361666542455032303a204245503230206f7065726174696f6e20646964206e6f7420737563636565644f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f775361666542455032303a20617070726f76652066726f6d206e6f6e2d7a65726f20746f206e6f6e2d7a65726f20616c6c6f77616e63654f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a2646970667358221220b222f152d5fadb1290ab142ca395b9fa493267c4ee7de3792dfc94ddf0c1e7ea64736f6c634300060c0033";

type BSWMasterChefConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BSWMasterChefConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BSWMasterChef__factory extends ContractFactory {
  constructor(...args: BSWMasterChefConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "BSWMasterChef";
  }

  deploy(
    _BSW: string,
    _devaddr: string,
    _refAddr: string,
    _safuaddr: string,
    _BSWPerBlock: BigNumberish,
    _startBlock: BigNumberish,
    _stakingPercent: BigNumberish,
    _devPercent: BigNumberish,
    _refPercent: BigNumberish,
    _safuPercent: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<BSWMasterChef> {
    return super.deploy(
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
      overrides || {}
    ) as Promise<BSWMasterChef>;
  }
  getDeployTransaction(
    _BSW: string,
    _devaddr: string,
    _refAddr: string,
    _safuaddr: string,
    _BSWPerBlock: BigNumberish,
    _startBlock: BigNumberish,
    _stakingPercent: BigNumberish,
    _devPercent: BigNumberish,
    _refPercent: BigNumberish,
    _safuPercent: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
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
      overrides || {}
    );
  }
  attach(address: string): BSWMasterChef {
    return super.attach(address) as BSWMasterChef;
  }
  connect(signer: Signer): BSWMasterChef__factory {
    return super.connect(signer) as BSWMasterChef__factory;
  }
  static readonly contractName: "BSWMasterChef";
  public readonly contractName: "BSWMasterChef";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BSWMasterChefInterface {
    return new utils.Interface(_abi) as BSWMasterChefInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BSWMasterChef {
    return new Contract(address, _abi, signerOrProvider) as BSWMasterChef;
  }
}
