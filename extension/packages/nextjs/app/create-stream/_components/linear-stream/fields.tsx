import { ChangeEvent, useCallback } from "react";
import { REGEX_ADDRESS, REGEX_FLOAT, REGEX_INTEGER, SEPOLIA_TOKENS } from "../../../../utils/sablier/constants";
import useStoreForm from "./store";
import _ from "lodash";

export function Cancelability() {
  const { cancelability, update } = useStoreForm(state => ({
    cancelability: state.cancelability,
    update: state.api.update,
  }));

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const value = (() => {
        const input = e.target.value;

        return ["true", true].includes(input);
      })();

      update({ cancelability: value });
    },
    [update],
  );

  return (
    <div className="flex flex-col">
      <label className="label">
        <span className="label-text">Cancelability: </span>
      </label>
      <select
        id="cancelability"
        value={_.toString(cancelability)}
        onChange={onChange}
        className="select select-bordered w-full max-w-full"
      >
        <option value="true">On (Can be canceled later)</option>
        <option value="false">Off (Can never be canceled)</option>
      </select>
    </div>
  );
}

export function Transferability() {
  const { transferability, update } = useStoreForm(state => ({
    transferability: state.transferability,
    update: state.api.update,
  }));

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const value = (() => {
        const input = e.target.value;

        return ["true", true].includes(input);
      })();

      update({ transferability: value });
    },
    [update],
  );

  return (
    <div className="flex flex-col">
      <label className="label">
        <span className="label-text">Transferability:</span>
      </label>
      <select
        id={"transferability"}
        value={_.toString(transferability)}
        className="select select-bordered w-full max-w-full"
        onChange={onChange}
      >
        <option value="true">On (Can be transferred later)</option>
        <option value="false">Off (Can never be transferred)</option>
      </select>
    </div>
  );
}

export function Token() {
  const { token, update } = useStoreForm((state: any) => ({
    token: state.token,
    update: state.api.update,
  }));

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      update({ token: e.target.value });
    },
    [update],
  );

  const selectedToken = SEPOLIA_TOKENS.find(t => t.address === token);

  return (
    <div className="flex flex-col">
      <label className="label">
        <span className="label-text">Token:</span>
      </label>
      <div className="relative">
        <select className="select select-bordered w-full max-w-full pl-10" id="token" value={token} onChange={onChange}>
          <option value="">Select a token</option>
          {SEPOLIA_TOKENS.map(t => (
            <option key={t.address} value={t.address}>
              {t.symbol} - {t.name}
            </option>
          ))}
        </select>
        {selectedToken && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {/* eslint-disable-next-line */}
            <img
              src={selectedToken.logoURI}
              alt={selectedToken.symbol}
              width={24}
              height={24}
              className="rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function Amount() {
  const { amount, update } = useStoreForm(state => ({
    amount: state.amount,
    update: state.api.update,
  }));

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = (() => {
        const input = e.target.value;
        if (_.isNil(input) || _.toString(input).length === 0) {
          return "";
        }
        return _.toString(input);
      })();

      if (value === "" || new RegExp(REGEX_FLOAT).test(value) || new RegExp(REGEX_INTEGER).test(value)) {
        update({ amount: value });
      }
    },
    [update],
  );

  return (
    <div className="flex flex-col">
      <label className="label">
        <span className="label-text">Amount:</span>
      </label>
      <input
        className="input input-bordered w-full max-w-full"
        id={"amount"}
        value={amount}
        onChange={onChange}
        type={"text"}
        placeholder={"Amount to be streamed, e.g., 100 ..."}
      />
    </div>
  );
}

export function Recipient() {
  const { recipient, update } = useStoreForm(state => ({
    recipient: state.recipient,
    update: state.api.update,
  }));

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = (() => {
        const input = e.target.value;
        if (_.isNil(input) || _.toString(input).length === 0) {
          return "";
        }

        if (!_.toString(input).startsWith("0")) {
          return "";
        }

        return _.toString(input);
      })();

      if (value !== "" && !new RegExp(REGEX_ADDRESS).test(value)) {
        return;
      }

      update({ recipient: value });
    },
    [update],
  );

  return (
    <div className="flex flex-col">
      <label className="label">
        <span className="label-text">Recipient:</span>
      </label>
      <input
        className="input input-bordered w-full max-w-full"
        id={"recipient"}
        value={recipient}
        onChange={onChange}
        placeholder={"Recipient 0x address ..."}
      />
    </div>
  );
}

export function Duration() {
  const { duration, update } = useStoreForm(state => ({
    duration: state.duration,
    update: state.api.update,
  }));

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = (() => {
        const input = e.target.value;
        if (_.isNil(input) || _.toString(input).length === 0) {
          return "";
        }
        return _.toString(input);
      })();

      if (value !== "" && !new RegExp(REGEX_INTEGER).test(value)) {
        return;
      }

      update({ duration: value });
    },
    [update],
  );

  return (
    <div className="flex flex-col">
      <label className="label">
        <span className="label-text">Duration:</span>
      </label>
      <input
        className="input input-bordered w-full max-w-full"
        id={"duration"}
        value={duration}
        onChange={onChange}
        type={"text"}
        placeholder={"Duration in seconds, e.g., 86400 (1 Day) ..."}
      />
    </div>
  );
}

export function Cliff() {
  const { cliff, update } = useStoreForm(state => ({
    cliff: state.cliff,
    update: state.api.update,
  }));

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = (() => {
        const input = e.target.value;
        if (_.isNil(input) || _.toString(input).length === 0) {
          return "";
        }
        return _.toString(input);
      })();

      if (value !== "" && !new RegExp(REGEX_INTEGER).test(value)) {
        return;
      }

      update({ cliff: value });
    },
    [update],
  );

  return (
    <div className="flex flex-col">
      <label className="label">
        <span className="label-text">Cliff (Optional):</span>
      </label>
      <input
        className="input input-bordered w-full max-w-full"
        id={"cliff"}
        value={cliff}
        onChange={onChange}
        type={"text"}
        placeholder={"Cliff in seconds, e.g., 0 or 3600 (1 Hour) ..."}
      />
    </div>
  );
}
