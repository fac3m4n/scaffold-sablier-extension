import { useEffect, useState } from "react";
import {
  SEPOLIA_SABLIER_V2_LOCKUP_DYNAMIC_NFT,
  SEPOLIA_SABLIER_V2_LOCKUP_DYNAMIC_NFT_2,
  SEPOLIA_SABLIER_V2_LOCKUP_DYNAMIC_NFT_3,
  SEPOLIA_SABLIER_V2_LOCKUP_LINEAR_NFT,
  SEPOLIA_SABLIER_V2_LOCKUP_LINEAR_NFT_2,
  SEPOLIA_SABLIER_V2_LOCKUP_LINEAR_NFT_3,
} from "../../utils/sablier/constants";
import { Alchemy, Network } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
});

export function useOwnedNfts(address: string | undefined) {
  const [ownedNfts, setOwnedNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!address) return;

    const fetchNfts = async () => {
      setLoading(true);
      try {
        const nfts = await alchemy.nft.getNftsForOwner(address, {
          contractAddresses: [
            SEPOLIA_SABLIER_V2_LOCKUP_LINEAR_NFT,
            SEPOLIA_SABLIER_V2_LOCKUP_LINEAR_NFT_2,
            SEPOLIA_SABLIER_V2_LOCKUP_LINEAR_NFT_3,
            SEPOLIA_SABLIER_V2_LOCKUP_DYNAMIC_NFT,
            SEPOLIA_SABLIER_V2_LOCKUP_DYNAMIC_NFT_2,
            SEPOLIA_SABLIER_V2_LOCKUP_DYNAMIC_NFT_3,
          ],
        });
        setOwnedNfts(nfts.ownedNfts);
      } catch (error) {
        console.error("Failed to fetch NFTs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNfts();
  }, [address]);

  return { ownedNfts, loading };
}
