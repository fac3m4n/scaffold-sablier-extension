import { SEPOLIA_DAI } from "../../../../utils/sablier/constants";
import { IStoreFormDynamic } from "../../../../utils/sablier/types";
import create from "zustand";

const initial: Omit<IStoreFormDynamic, "api"> = {
  error: undefined,
  logs: [],

  cancelability: true,
  recipient: undefined,
  token: undefined,
  transferability: true,

  segments: [
    {
      amount: undefined,
      exponent: undefined,
      delta: undefined,
    },
  ],
};

const prefill: Omit<IStoreFormDynamic, "api"> = {
  error: undefined,
  logs: [],

  cancelability: true,
  recipient: "0xCAFE000000000000000000000000000000000000",
  token: SEPOLIA_DAI,
  transferability: true,

  segments: [
    {
      amount: "0",
      delta: "43199", // 12hrs - 1 second
      exponent: "1",
    },
    {
      amount: "50",
      delta: "1", // 1 second
      exponent: "1",
    },
    {
      amount: "0",
      delta: "43199", // 12hrs - 1 second
      exponent: "1",
    },
    {
      amount: "50",
      delta: "1", // 1 second
      exponent: "1",
    },
  ],
};

const useStoreForm = create<IStoreFormDynamic>(set => ({
  ...initial,
  api: {
    log: (value: string) =>
      set(prev => ({
        logs: [...prev.logs, value],
      })),
    update: (updates: Partial<IStoreFormDynamic>) =>
      set(() => ({
        ...updates,
      })),
    reset: () =>
      set(() => ({
        ...initial,
      })),
  },
}));

export { initial, prefill };
export default useStoreForm;
