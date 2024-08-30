"use client";

import { useCallback } from "react";
import { Core, ERC20 } from "../../../../utils/sablier/models";
import { Cancelability, Recipient, Segments, Token, Transferability } from "./fields";
import useStoreForm, { prefill } from "./store";
import _ from "lodash";
import { useAccount } from "wagmi";

export function DynamicStreamForm() {
  const { isConnected } = useAccount();

  const { error, logs, update } = useStoreForm(state => ({
    error: state.error,
    logs: state.logs,
    update: state.api.update,
  }));

  const onApprove = useCallback(async () => {
    if (isConnected) {
      const state = useStoreForm.getState();
      try {
        state.api.update({ error: undefined });
        const totalAmount = state.segments.reduce((sum, segment) => {
          return sum + BigInt(segment.amount || 0);
        }, 0n);
        await ERC20.doApprove(
          "SablierV2LockupDynamic",
          {
            amount: totalAmount.toString(),
            token: state.token,
          },
          state.api.log,
        );
      } catch (error) {
        state.api.update({ error: _.toString(error) });
      }
    }
  }, [isConnected]);

  const onCreate = useCallback(async () => {
    if (isConnected) {
      const state = useStoreForm.getState();
      console.log("State being passed to doCreateDynamic:", state);
      try {
        state.api.update({ error: undefined });
        await Core.doCreateDynamic(state, state.api.log);
      } catch (error) {
        console.error("Error in onCreate:", error);
        state.api.update({ error: _.toString(error) });
      }
    }
  }, [isConnected]);

  const onPrefill = useCallback(() => {
    update(prefill);
  }, [update]);

  const onAdd = useCallback(() => {
    const state = useStoreForm.getState();
    const segments = _.clone(state.segments);
    update({
      segments: [...segments, { amount: undefined, delta: undefined, exponent: undefined }],
    });
  }, [update]);

  return (
    <div className="flex flex-col gap-4">
      <Cancelability />
      <Transferability />
      <Token />
      <Recipient />
      <Segments />

      <div className="flex gap-4">
        <button className="btn btn-primary" onClick={onApprove}>
          {"✅"} 1. Approve Spending
        </button>
        <button className="btn btn-secondary" onClick={onPrefill}>
          {"🔄"} Prefill Form
        </button>
        <button className="btn btn-secondary" onClick={onAdd}>
          {"🔗"} Add Segment
        </button>
        <button className="btn btn-success" onClick={onCreate}>
          {"🚀"} 2. Create Stream
        </button>
      </div>

      <div>
        {error && <div>{error}</div>}
        {logs.length > 0 && (
          <>
            <label className="label">
              <span className="label-text">Logs</span>
            </label>
            <ul>
              {logs.map(log => (
                <li key={log}>- {log}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
