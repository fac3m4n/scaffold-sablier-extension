import { wagmiConfig } from "../../../services/web3/wagmiConfig";
import { ABI, SEPOLIA_CHAIN_ID, contracts } from "../constants";
import type {
  IAddress,
  IAmountWithDecimals,
  IAmountWithDecimals18,
  ICreateWithDeltas,
  ICreateWithDurations,
  ISeconds,
  ISegmentD,
} from "../types";
import { erroneous, expect } from "../utils";
import BigNumber from "bignumber.js";
import _ from "lodash";
import { zeroAddress } from "viem";
import { getAccount, readContract, waitForTransactionReceipt, writeContract } from "wagmi/actions";

export default class Core {
  static async doCreateLinear(
    state: {
      amount: string | undefined;
      cancelability: boolean;
      cliff: string | undefined;
      duration: string | undefined;
      recipient: string | undefined;
      token: string | undefined;
      transferability: boolean;
    },
    log: (value: string) => void,
  ) {
    try {
      if (
        !expect(state.amount, "amount") ||
        !expect(state.cancelability, "cancelability") ||
        !expect(state.duration, "duration") ||
        !expect(state.recipient, "recipient") ||
        !expect(state.token, "token") ||
        !expect(state.transferability, "transferability")
      ) {
        return;
      }

      const decimals = await readContract(wagmiConfig, {
        address: state.token as IAddress,
        abi: ABI.ERC20.abi,
        functionName: "decimals",
      });

      /** We use BigNumber to convert float values to decimal padded BigInts */
      const padding = new BigNumber(10).pow(new BigNumber(decimals.toString()));
      const amount = BigInt(new BigNumber(state.amount).times(padding).toFixed());

      const sender = await getAccount(wagmiConfig).address;
      if (!expect(sender, "sender")) {
        return;
      }

      const cliff = (() => {
        try {
          if (!_.isNil(state.cliff) && BigInt(state.cliff).toString() === state.cliff) {
            return BigInt(state.cliff);
          }
        } catch (_error) {}
        return 0n;
      })();

      const payload: ICreateWithDurations = [
        sender,
        state.recipient as IAddress,
        amount,
        state.token as IAddress,
        state.cancelability,
        state.transferability,
        { cliff, total: BigInt(state.duration) },
        { account: zeroAddress, fee: 0n },
      ];

      console.info("Payload", payload);

      const tx = await writeContract(wagmiConfig, {
        address: contracts[SEPOLIA_CHAIN_ID].SablierV2LockupLinear,
        abi: ABI.SablierV2LockupLinear.abi,
        functionName: "createWithDurations",
        args: [payload],
      });

      if (tx) {
        log(`LL Stream sent to the blockchain with hash: ${tx}.`);
      }

      const receipt = await waitForTransactionReceipt(wagmiConfig, { hash: tx });

      if (receipt?.status === "success") {
        log(`LL Stream successfully created.`);
      } else {
        log(`LL Stream creation failed.`);
      }
    } catch (error) {
      erroneous(error);
    }
  }

  static async doCreateDynamic(
    state: {
      cancelability: boolean;
      recipient: string | undefined;
      segments: {
        amount: string | undefined;
        delta: string | undefined;
        exponent: string | undefined;
      }[];
      token: string | undefined;
      transferability: boolean;
    },
    log: (value: string) => void,
  ) {
    try {
      if (
        !expect(state.segments, "segments") ||
        !expect(state.cancelability, "cancelability") ||
        !expect(state.recipient, "recipient") ||
        !expect(state.token, "token") ||
        !expect(state.transferability, "transferability")
      ) {
        return;
      }

      const decimals = await readContract(wagmiConfig, {
        address: state.token as IAddress,
        abi: ABI.ERC20.abi,
        functionName: "decimals",
      });

      /** We use BigNumber to convert float values to decimal padded BigInts */
      const padding = new BigNumber(10).pow(new BigNumber(decimals.toString()));

      const sender = await getAccount(wagmiConfig).address;
      if (!expect(sender, "sender")) {
        return;
      }

      const segments: ISegmentD[] = state.segments.map(segment => {
        if (
          !expect(segment.amount, "segment amount") ||
          !expect(segment.delta, "segment delta") ||
          !expect(segment.exponent, "segment exponent")
        ) {
          throw new Error("Expected valid segments.");
        }

        const amount: IAmountWithDecimals = BigInt(new BigNumber(segment.amount).times(padding).toFixed());
        const delta: ISeconds = BigInt(segment.delta);
        const exponent: IAmountWithDecimals18 = BigInt(segment.exponent) * 10n ** 18n;

        const result: ISegmentD = { amount, exponent, delta };

        return result;
      });

      const amount = segments.reduce((prev, curr) => prev + (curr?.amount || 0n), 0n);

      const payload: ICreateWithDeltas = [
        sender,
        state.cancelability,
        state.transferability,
        state.recipient as IAddress,
        amount,
        state.token as IAddress,
        { account: zeroAddress, fee: 0n },
        segments,
      ];

      console.info("Payload", payload);

      const tx = await writeContract(wagmiConfig, {
        address: contracts[SEPOLIA_CHAIN_ID].SablierV2LockupDynamic,
        abi: ABI.SablierV2LockupDynamic.abi,
        functionName: "createWithDeltas",
        args: [payload],
      });

      if (tx) {
        log(`LD Stream sent to the blockchain with hash: ${tx}.`);
      }

      const receipt = await waitForTransactionReceipt(wagmiConfig, { hash: tx });

      if (receipt?.status === "success") {
        log(`LD Stream successfully created.`);
      } else {
        log(`LD Stream creation failed.`);
      }
    } catch (error) {
      erroneous(error);
    }
  }
}
