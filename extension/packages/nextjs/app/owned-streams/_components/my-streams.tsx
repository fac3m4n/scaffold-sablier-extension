"use client";

import { useOwnedNfts } from "../../../hooks/alchemy/useOwnedNfts";
import { NftCard } from "./nft-card";
import { useAccount } from "wagmi";

function MyStreams() {
  const { address: connectedAddress } = useAccount();
  const { ownedNfts, loading } = useOwnedNfts(connectedAddress);

  if (loading)
    return (
      <div className="flex justify-center items-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <div className="flex flex-col text-center">
          <div className="text-2xl font-bold">Owned Streams</div>
          <p>
            The Sablier Protocol wraps every stream in an ERC-721 non-fungible token (NFT), making the stream recipient
            the owner of the NFT. The recipient can transfer the NFT to another address, and this also transfers the
            right to withdraw funds from the stream, including any funds already streamed.
          </p>
        </div>
      </div>
      {ownedNfts.length === 0 ? (
        <div className="flex justify-center items-center mt-10">
          <div className="text-2xl text-primary-content">No NFTs found</div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 my-8 justify-center">
          {ownedNfts.map(nft => (
            <NftCard nft={nft} key={nft.tokenId} />
          ))}
        </div>
      )}
    </>
  );
}

export default MyStreams;
