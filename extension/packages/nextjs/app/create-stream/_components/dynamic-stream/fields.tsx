import { useCallback } from "react";
import type { ChangeEvent } from "react";
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

export function Amount({ index }: { index: number }) {
  const { segment, update } = useStoreForm(state => ({
    segment: _.get(state.segments, index) || {},
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
        const state = useStoreForm.getState();
        const segments = _.clone(state.segments);
        segments[index].amount = value;

        update({ segments });
      }
    },
    [index, update],
  );

  return (
    <div className="flex flex-col">
      <label className="label">
        <span className="label-text">Amount:</span>
      </label>
      <input
        className="input input-bordered w-full max-w-full"
        id={"segment_amount"}
        value={segment.amount}
        onChange={onChange}
        type={"text"}
        placeholder={"Amount to be streamed, e.g., 100 ..."}
      />
    </div>
  );
}

export function Duration({ index }: { index: number }) {
  const { segment, update } = useStoreForm(state => ({
    segment: _.get(state.segments, index) || {},
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

      const state = useStoreForm.getState();
      const segments = _.clone(state.segments);
      segments[index].delta = value;

      update({ segments });
    },
    [index, update],
  );

  return (
    <div className="flex flex-col">
      <label className="label">
        <span className="label-text">Segment Duration:</span>
      </label>
      <input
        className="input input-bordered w-full max-w-full"
        id={"segment_delta"}
        value={segment.delta}
        onChange={onChange}
        type={"text"}
        placeholder={"Duration of this segment, e.g., 3600 (1 Hour) ..."}
      />
    </div>
  );
}

export function Exponent({ index }: { index: number }) {
  const { segment, update } = useStoreForm(state => ({
    segment: _.get(state.segments, index) || {},
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

      if (value !== "" && !new RegExp(REGEX_FLOAT).test(value)) {
        return;
      }

      const state = useStoreForm.getState();
      const segments = _.clone(state.segments);
      segments[index].exponent = value;

      update({ segments });
    },
    [index, update],
  );

  return (
    <div className="flex flex-col">
      <label className="label">
        <span className="label-text">Exponent:</span>
      </label>
      <input
        className="input input-bordered w-full max-w-full"
        id={"segment_exponent"}
        value={segment.exponent}
        onChange={onChange}
        type={"text"}
        placeholder={"Exponent of this segment, e.g., 1.000000000000000000 ..."}
      />
    </div>
  );
}

export function Segments() {
  const { segments, update } = useStoreForm(state => ({
    segments: state.segments,
    update: state.api.update,
  }));

  const onRemove = useCallback(
    (index: number) => {
      const state = useStoreForm.getState();
      const segments = _.clone(state.segments);
      segments.splice(index, 1);
      update({ segments });
    },
    [update],
  );

  return (
    <>
      {segments.map((_segment, index) => (
        <div key={index} className="card bg-secondary shadow-xl mb-4">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h3 className="card-title">Segment #{index + 1}</h3>
              {index !== 0 && (
                <button className="btn btn-sm btn-error" onClick={() => onRemove(index)}>
                  {"🗑️"} Remove segment
                </button>
              )}
            </div>

            <Amount index={index} />
            <Duration index={index} />
            <Exponent index={index} />
          </div>
        </div>
      ))}
    </>
  );
}
