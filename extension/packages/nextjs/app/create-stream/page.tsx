"use client";

import { useCallback } from "react";
import { Address } from "../../components/scaffold-eth";
import { ABI, SEPOLIA_DAI } from "../../utils/sablier/constants";
import { ERC20 } from "../../utils/sablier/models";
import { notification } from "../../utils/scaffold-eth";
import { DynamicStreamForm } from "./_components/dynamic-stream/dynamic-stream-form";
import { LinearStreamForm } from "./_components/linear-stream/linear-stream-form";
import { formatEther } from "viem";
import { useAccount, useWalletClient } from "wagmi";
import { useReadContracts } from "wagmi";

function CreateStreamPage() {
  const { address: connectedAddress } = useAccount();
  const { data: walletClient } = useWalletClient();

  const daiBalance = useReadContracts({
    contracts: [
      {
        address: SEPOLIA_DAI,
        abi: ABI.ERC20.abi,
        functionName: "balanceOf",
        args: [connectedAddress!],
      },
    ],
  });

  const onMint = useCallback(async () => {
    if (walletClient) {
      const notificationId = notification.loading("Minting DAI...");

      try {
        await ERC20.doMint(SEPOLIA_DAI);
        notification.remove(notificationId);
        notification.success("Minted DAI");
      } catch (error) {
        notification.error("Failed to mint DAI");
      }
    }
  }, [walletClient]);

  return (
    <div className="container mx-auto my-10 flex gap-4">
      <div role="tablist" className="tabs tabs-lifted w-full">
        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Linear" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <LinearStreamForm />
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Dynamic" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <DynamicStreamForm />
        </div>
      </div>
      <div>
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body gap-4">
            <h2 className="card-title">Account Info</h2>
            <Address address={connectedAddress} />
            <div>Balance: {formatEther(daiBalance.data?.[0].result ?? 0n)} DAI</div>
            <div className="flex items-center gap-2">
              <div>Mint Sepolia DAI</div>
              <button className="btn btn-primary" onClick={onMint}>
                {" "}
                {"💰"} Mint
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateStreamPage;
