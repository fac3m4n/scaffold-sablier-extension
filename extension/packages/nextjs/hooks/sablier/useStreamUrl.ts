import { useMemo } from "react";
import { dynamic, linear } from "../../utils/sablier/constants";
import { useTargetNetwork } from "../scaffold-eth";

export function useStreamUrl(contractAddress: string, tokenId: string) {
  const { targetNetwork } = useTargetNetwork();

  return useMemo(() => {
    const allContracts = [...linear, ...dynamic];
    const contract = allContracts.find(([address]) => address.toLowerCase() === contractAddress.toLowerCase());

    if (contract) {
      const [, alias] = contract;
      return `https://app.sablier.com/stream/${alias}-${targetNetwork.id}-${tokenId}`;
    }

    return "#"; // Return a fallback URL or empty string if not found
  }, [contractAddress, tokenId, targetNetwork.id]);
}
