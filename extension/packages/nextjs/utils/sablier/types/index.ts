import type { Address as IViemAddress } from "viem";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export type IAddress = IViemAddress;
export type ISeconds<T extends number | bigint = bigint> = T;
export type IAmount<T extends number | bigint = bigint> = T;
export type IAmountWithDecimals<T extends number | bigint = bigint> = T;
export type IAmountWithDecimals18<T extends number | bigint = bigint> = T;

export interface IStoreFormLinear {
  logs: string[];
  error: string | undefined;

  amount: string | undefined;
  cancelability: boolean;
  cliff: string | undefined;
  duration: string | undefined;
  recipient: string | undefined;
  token: string | undefined;
  transferability: boolean;

  api: {
    log: (value: string) => void;
    update: (updates: Partial<IStoreFormLinear>) => void;
    reset: () => void;
  };
}

export interface IStoreFormDynamic {
  logs: string[];
  error: string | undefined;

  cancelability: boolean;
  recipient: string | undefined;
  token: string | undefined;
  transferability: boolean;

  segments: {
    amount: string | undefined;
    exponent: string | undefined;
    delta: string | undefined;
  }[];

  api: {
    log: (value: string) => void;
    update: (updates: Partial<IStoreFormDynamic>) => void;
    reset: () => void;
  };
}

export type ICreateWithDurations = [
  sender: IAddress,
  recipient: IAddress,
  totalAmount: IAmountWithDecimals,
  asset: IAddress,
  cancelable: boolean,
  transferable: boolean,
  durations: { cliff: ISeconds; total: ISeconds },
  broker: { account: IAddress; fee: 0n }, // TIP: you can set this to your own address to charge a fee
];

export type ISegmentD<T extends number | bigint = bigint> = {
  amount: IAmountWithDecimals;
  exponent: IAmountWithDecimals18;
  delta: ISeconds<T>;
};

export type ICreateWithDeltas = [
  sender: IAddress,
  cancelable: boolean,
  transferable: boolean,
  recipient: IAddress,
  totalAmount: IAmountWithDecimals,
  asset: IAddress,
  broker: { account: IAddress; fee: 0n },
  segments: ISegmentD[],
];
