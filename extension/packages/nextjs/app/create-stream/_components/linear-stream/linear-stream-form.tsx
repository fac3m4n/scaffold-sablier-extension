import { useCallback } from "react";
import { Core, ERC20 } from "../../../../utils/sablier/models";
import { Amount, Cancelability, Cliff, Duration, Recipient, Token, Transferability } from "./fields";
import useStoreForm, { prefill } from "./store";
import _ from "lodash";
import { useAccount } from "wagmi";
import { notification } from "~~/utils/scaffold-eth";

export function LinearStreamForm() {
  const { isConnected } = useAccount();

  const { error, logs, update } = useStoreForm(state => ({
    error: state.error,
    logs: state.logs,
    update: state.api.update,
  }));

  const onApprove = useCallback(async () => {
    if (isConnected) {
      const state = useStoreForm.getState();
      const approveLoading = notification.loading(<>Approving...</>);
      try {
        state.api.update({ error: undefined });
        await ERC20.doApprove("SablierV2LockupLinear", state, state.api.log);
        notification.remove(approveLoading);
        notification.success(<>Approved successfully!</>, {
          icon: "🎉",
        });
      } catch (error) {
        notification.error(<>Error approving</>);
        notification.remove(approveLoading);
        console.log(error);
        state.api.update({ error: _.toString(error) });
      }
    }
  }, [isConnected]);

  const onPrefill = useCallback(() => {
    update(prefill);
  }, [update]);

  const onCreate = useCallback(async () => {
    if (isConnected) {
      const state = useStoreForm.getState();
      const createLoading = notification.loading(<>Creating Linear stream...</>);

      try {
        state.api.update({ error: undefined });
        await Core.doCreateLinear(state, state.api.log);
        notification.remove(createLoading);
        notification.success(<>Linear Stream created successfully!</>, {
          icon: "🎉",
        });
      } catch (error) {
        notification.error(<>Error creating stream...</>);
        notification.remove(createLoading);
        console.log(error);
        state.api.update({ error: _.toString(error) });
      }
    }
  }, [isConnected]);

  return (
    <div className="flex flex-col gap-4">
      <Cancelability />
      <Transferability />
      <Token />
      <Amount />
      <Recipient />
      <Duration />
      <Cliff />
      <div className="flex gap-4">
        <button className="btn btn-primary" onClick={onApprove}>
          {"✅"} 1. Approve Spending
        </button>
        <button className="btn btn-secondary" onClick={onPrefill}>
          {"🔄"} Prefill Form
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
                <li key={log}>-{log}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
