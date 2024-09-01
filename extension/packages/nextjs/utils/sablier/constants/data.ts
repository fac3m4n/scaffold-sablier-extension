/**
 *
 * Aliases - https://github.com/sablier-labs/v2-subgraphs/blob/main/packages/constants/src/addresses/sepolia.ts
 * -------------------------------------------------------------------------------------
 *
 *To provide a simple visual structure, while also accounting for future stream types (backwards compatibility) we use the following abbreviations as aliases:
 *
 * Lockup Linear V2.0 contracts become LL, e.g. LL-137-1
 * Lockup Linear V2.1 contracts become LL2, e.g. LL2-137-1
 * Lockup Dynamic V2.0 contracts become LD, e.g. LD-137-1
 * Lockup Dynamic V2.1 contracts become LD2, e.g. LD2-137-1
 *
 * -------------------------------------------------------------------------------------
 *
 */

export const linear: string[][] = [
  ["0xd4300c5bc0b9e27c73ebabdc747ba990b1b570db", "LL", "V20"],
  ["0x7a43f8a888fa15e68c103e18b0439eb1e98e4301", "LL2", "V21"],
  ["0x3e435560fd0a03ddf70694b35b673c25c65abb6c", "LL3", "V22"],
];

export const dynamic: string[][] = [
  ["0x421e1e7a53ff360f70a2d02037ee394fa474e035", "LD", "V20"],
  ["0xc9940ad8f43aad8e8f33a4d5dbbf0a8f7ff4429a", "LD2", "V21"],
  ["0x73bb6dd3f5828d60f8b3dbc8798eb10fba2c5636", "LD3", "V22"],
];
