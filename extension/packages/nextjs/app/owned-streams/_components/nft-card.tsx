import Link from "next/link";
import { Address } from "../../../components/scaffold-eth";
import { useStreamUrl } from "../../../hooks/sablier";
import { Nft } from "alchemy-sdk";

interface NftCardProps {
  nft: Nft;
}

export function NftCard({ nft }: NftCardProps) {
  const streamUrl = useStreamUrl(nft.contract.address, nft.tokenId);

  return (
    <Link href={streamUrl} target="_blank" className="block" key={nft.tokenId}>
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 w-[300px] overflow-hidden cursor-pointer">
        <figure className="relative aspect-square">
          {/* eslint-disable-next-line */}
          <img src={nft.image.cachedUrl} alt="NFT Image" className="object-cover w-full h-full" />
        </figure>
        <div className="card-body p-4 space-y-2">
          <h2 className="card-title text-xl font-bold">{nft.name}</h2>
          <div className="divider my-2"></div>
          <div className="space-y-2">
            {["Status", "Asset"].map(trait => {
              const attribute = nft.raw.metadata?.attributes?.find(({ trait_type }: any) => trait_type === trait);
              return (
                attribute && (
                  <div key={trait} className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-base">{attribute.trait_type}:</span>
                    {attribute.value === "Settled" ? (
                      <span className="badge badge-success">{attribute.value}</span>
                    ) : (
                      <span className="badge badge-secondary">{attribute.value}</span>
                    )}
                  </div>
                )
              );
            })}
          </div>
          <div className="divider my-2"></div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold">Sender:</span>
            <Address
              address={nft.raw.metadata?.attributes?.find(({ trait_type }: any) => trait_type === "Sender")?.value}
              size="base"
              disableAddressLink
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
