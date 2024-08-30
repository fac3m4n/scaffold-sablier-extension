import { SEPOLIA_DAI } from "../../../../utils/sablier/constants";
import { IStoreFormLinear } from "../../../../utils/sablier/types";
import create from "zustand";

const initial: Omit<IStoreFormLinear, "api"> = {
  error: undefined,
  logs: [],

  amount: undefined,
  cancelability: true,
  cliff: undefined,
  duration: undefined,
  recipient: undefined,
  token: undefined,
  transferability: true,
};

const prefill: Omit<IStoreFormLinear, "api"> = {
  error: undefined,
  logs: [],

  amount: "100",
  cancelability: true,
  cliff: undefined,
  duration: "86400", // 1 day
  recipient: "0xCAFE000000000000000000000000000000000000",
  token: SEPOLIA_DAI,
  transferability: true,
};

const useStoreForm = create<IStoreFormLinear>(set => ({
  ...initial,
  api: {
    log: (value: string) =>
      set(prev => ({
        logs: [...prev.logs, value],
      })),
    update: (updates: Partial<IStoreFormLinear>) =>
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
