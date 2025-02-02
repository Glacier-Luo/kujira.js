import { Registry, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgAggregateExchangeRateVote } from "./types/tx";
import { MsgAggregateExchangeRatePrevote } from "./types/tx";
import { MsgDelegateFeedConsent } from "./types/tx";

export const types = [
  ["/kujira.oracle.MsgAggregateExchangeRateVote", MsgAggregateExchangeRateVote],
  [
    "/kujira.oracle.MsgAggregateExchangeRatePrevote",
    MsgAggregateExchangeRatePrevote,
  ],
  ["/kujira.oracle.MsgDelegateFeedConsent", MsgDelegateFeedConsent],
];
export const MissingWalletError = new Error("wallet is required");

export const registry = new Registry(<any>types);

const txClient = {
  msgAggregateExchangeRateVote: (
    data: MsgAggregateExchangeRateVote
  ): EncodeObject => ({
    typeUrl: "/kujira.oracle.MsgAggregateExchangeRateVote",
    value: MsgAggregateExchangeRateVote.fromPartial(data),
  }),
  msgAggregateExchangeRatePrevote: (
    data: MsgAggregateExchangeRatePrevote
  ): EncodeObject => ({
    typeUrl: "/kujira.oracle.MsgAggregateExchangeRatePrevote",
    value: MsgAggregateExchangeRatePrevote.fromPartial(data),
  }),
  msgDelegateFeedConsent: (data: MsgDelegateFeedConsent): EncodeObject => ({
    typeUrl: "/kujira.oracle.MsgDelegateFeedConsent",
    value: MsgDelegateFeedConsent.fromPartial(data),
  }),
};

export { txClient, Api };
