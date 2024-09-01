/**
 * The official Sablier smart contracts used and recognized by the UI at https://app.sablier.com
 *
 * -------------------------------------------------------------------------------------
 *
 * The contracts have been deployed from the following commits:
 *
 * | Repo         | Tag    | Commit                                                    |
 * | ------------ | ------ | --------------------------------------------------------- |
 * | v2-core      | v1.1.2 | https://github.com/sablier-labs/v2-core/tree/a4bf69c      |
 * | v2-periphery | v1.1.1 | https://github.com/sablier-labs/v2-periphery/tree/53e2590 |
 *
 * -------------------------------------------------------------------------------------
 *
 */
import { IAddress } from "../types";
import { SEPOLIA_CHAIN_ID } from "./chains";

export const contracts = {
  [SEPOLIA_CHAIN_ID]: {
    SablierV2Batch: "0xd2569DC4A58dfE85d807Dffb976dbC0a3bf0B0Fb" as IAddress,
    SablierV2LockupDynamic: "0xc9940AD8F43aAD8e8f33A4D5dbBf0a8F7FF4429A" as IAddress,
    SablierV2LockupLinear: "0x7a43F8a888fa15e68C103E18b0439Eb1e98E4301" as IAddress,
  },
};

export const SEPOLIA_DAI = "0x776b6fC2eD15D6Bb5Fc32e0c89DE68683118c62A";

export const SEPOLIA_SABLIER_V2_LOCKUP_LINEAR_NFT = "0xd4300c5bc0b9e27c73ebabdc747ba990b1b570db";
export const SEPOLIA_SABLIER_V2_LOCKUP_LINEAR_NFT_2 = "0x7a43f8a888fa15e68c103e18b0439eb1e98e4301";
export const SEPOLIA_SABLIER_V2_LOCKUP_LINEAR_NFT_3 = "0x3e435560fd0a03ddf70694b35b673c25c65abb6c";

export const SEPOLIA_SABLIER_V2_LOCKUP_DYNAMIC_NFT = "0x421e1e7a53ff360f70a2d02037ee394fa474e035";
export const SEPOLIA_SABLIER_V2_LOCKUP_DYNAMIC_NFT_2 = "0xc9940ad8f43aad8e8f33a4d5dbbf0a8f7ff4429a";
export const SEPOLIA_SABLIER_V2_LOCKUP_DYNAMIC_NFT_3 = "0x73bb6dd3f5828d60f8b3dbc8798eb10fba2c5636";

export const REGEX_ADDRESS = /^[0-9xXAaBbCcDdEeFf]+$/;
export const REGEX_FLOAT = /^[0-9]+[.,]?[0-9]+?$/;
export const REGEX_INTEGER = /^[0-9]+$/;

export * as ABI from "./abi";
