import type { IAddress, ICreateWithDeltas, ICreateWithDurations } from "../types";
import { SEPOLIA_DAI } from "./contracts";

export const APPROVE_BATCH = [
  "SablierV2Batch",
  {
    amount: "1000000",
    token: SEPOLIA_DAI,
  },
] as const;

export const APPROVE_LOCKUP_DYNAMIC = [
  "SablierV2LockupDynamic",
  {
    amount: "1000000",
    token: SEPOLIA_DAI,
  },
] as const;

export const APPROVE_LOCKUP_LINEAR = [
  "SablierV2LockupLinear",
  {
    amount: "1000000",
    token: SEPOLIA_DAI,
  },
] as const;

export const LOCKUP_LINEAR_WITH_DURATIONS: ICreateWithDurations = [
  "<< YOUR CONNECTED ADDRESS AS THE SENDER >>" as IAddress, // Sender address
  "0xCAFE000000000000000000000000000000000000", // Recipient address
  1000n * 10n ** 18n, // 1000 DAI (18 decimals)
  SEPOLIA_DAI, // DAI address
  true, // Cancelable
  true, // Transferable
  { cliff: 86400n, total: 86400n * 4n }, // Cliff for one day, ends after 4 (total) days - starts when the transaction is executed onchain
  {
    account: "0x0000000000000000000000000000000000000000" as IAddress,
    fee: 0n,
  }, // Broker - set this to your own address to charge a fee
];

/** 🚨🕣 The END DATE (last parameter in the range tuple) has to be in the future. Make sure to move it at least a few hours after the current moment */

export const LOCKUP_DYNAMIC_WITH_DELTAS: ICreateWithDeltas = [
  "<< YOUR CONNECTED ADDRESS AS THE SENDER >>" as IAddress, // Sender address
  true, // Cancelable
  true, // Transferable
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" as IAddress, // Recipient address
  1000n * 10n ** 18n, // 1000 DAI (18 decimals)
  SEPOLIA_DAI, // DAI address
  {
    account: "0x0000000000000000000000000000000000000000" as IAddress,
    fee: 0n,
  }, // Broker - set this to your own address to charge a fee
  [
    {
      amount: 250n * 10n ** 18n,
      exponent: 3n * 10n ** 18n,
      delta: 86400n * 1n,
    }, // Distribute DAI 250 exponentially (exponent = 3), the first day (86400 seconds)
    {
      amount: 750n * 10n ** 18n,
      exponent: 3n * 10n ** 18n,
      delta: 86400n * 1n,
    }, // Distribute DAI 750 exponentially (exponent = 3), the second day (86400 seconds)
  ],
];
