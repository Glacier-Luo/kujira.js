import { Registry } from "@cosmjs/proto-signing";
import { AminoTypes, createAuthzAminoConverters, createBankAminoConverters, createDistributionAminoConverters, createGovAminoConverters, createStakingAminoConverters, createIbcAminoConverters, createFreegrantAminoConverters, } from "@cosmjs/stargate";
import { toUtf8 } from "@cosmjs/encoding";
import { createWasmAminoConverters } from "@cosmjs/cosmwasm-stargate";
import Long from "long";
import { util, configure } from "protobufjs/minimal";
import * as auth from "./cosmos/cosmos-sdk/cosmos.auth.v1beta1";
import * as authz from "./cosmos/cosmos-sdk/cosmos.authz.v1beta1";
import * as bank from "./cosmos/cosmos-sdk/cosmos.bank.v1beta1";
import * as crisis from "./cosmos/cosmos-sdk/cosmos.crisis.v1beta1";
import * as denom from "./kujira/kujira.denom";
import * as distribution from "./cosmos/cosmos-sdk/cosmos.distribution.v1beta1";
import * as evidence from "./cosmos/cosmos-sdk/cosmos.evidence.v1beta1";
import * as feegrant from "./cosmos/cosmos-sdk/cosmos.feegrant.v1beta1";
import * as gov from "./cosmos/cosmos-sdk/cosmos.gov.v1beta1";
import * as ibcTransfer from "./ibc-go/v3/ibc.applications.transfer.v1";
import * as oracle from "./kujira/kujira.oracle";
import * as params from "./cosmos/cosmos-sdk/cosmos.params.v1beta1";
import * as scheduler from "./kujira/kujira.scheduler";
import * as slashing from "./cosmos/cosmos-sdk/cosmos.slashing.v1beta1";
import * as staking from "./cosmos/cosmos-sdk/cosmos.staking.v1beta1";
import * as tendermint from "./cosmos/cosmos-sdk/cosmos.base.tendermint.v1beta1";
import * as tx_ from "./cosmos/cosmos-sdk/cosmos.tx.v1beta1";
import * as vesting from "./cosmos/cosmos-sdk/cosmos.vesting.v1beta1";
import * as wasm from "./CosmWasm/wasmd/cosmwasm.wasm.v1";
import * as ethermintEvm from "./evmos/ethermint/ethermint.evm.v1";
import * as ethermintFeemarket from "./evmos/ethermint/ethermint.feemarket.v1";
export { BaseAccount, ModuleAccount, } from "./cosmos/cosmos-sdk/cosmos.auth.v1beta1/types/auth";
export { MsgSend } from "./cosmos/cosmos-sdk/cosmos.bank.v1beta1/types/tx";
export * from "./cosmos/cosmos-sdk/cosmos.feegrant.v1beta1/types/feegrant";
export { voteOptionFromJSON } from "./cosmos/cosmos-sdk/cosmos.gov.v1beta1/types/gov";
export { MsgVote } from "./cosmos/cosmos-sdk/cosmos.gov.v1beta1/types/tx";
export { ValidatorSigningInfo } from "./cosmos/cosmos-sdk/cosmos.slashing.v1beta1/types/slashing";
export { V1Beta1BondStatus, } from "./cosmos/cosmos-sdk/cosmos.staking.v1beta1/rest";
export { Tx } from "./cosmos/cosmos-sdk/cosmos.tx.v1beta1/types/tx";
export { ContinuousVestingAccount } from "./cosmos/cosmos-sdk/cosmos.vesting.v1beta1/types/vesting";
export { V1Beta1ProposalStatus, V1Beta1VoteOption, } from "./cosmos/cosmos-sdk/cosmos.gov.v1beta1/rest";
export { V1ContractCodeHistoryOperationType, } from "./CosmWasm/wasmd/cosmwasm.wasm.v1/rest";
export { MsgExecuteContract } from "./CosmWasm/wasmd/cosmwasm.wasm.v1/types/tx";
export { InstantiateContractProposal } from "./CosmWasm/wasmd/cosmwasm.wasm.v1/types/proposal";
export { TxResult } from "./types/tendermint/abci/types";
export { Coin } from "./types/cosmos/base/coin";
export { EthAccount } from "./evmos/ethermint/ethermint.evm.v1/types/auth";
const types = [
    ...authz.types,
    ...bank.types,
    ...crisis.types,
    ...denom.types,
    ...distribution.types,
    ...ethermintEvm.types,
    ...ethermintFeemarket.types,
    ...evidence.types,
    ...feegrant.types,
    ...gov.types,
    ...ibcTransfer.types,
    ...oracle.types,
    ...params.types,
    ...scheduler.types,
    ...slashing.types,
    ...staking.types,
    ...vesting.types,
    ...wasm.types,
];
export const registry = new Registry(types);
export { FinClient, FinQueryClient } from "./fin";
function createDefaultTypes(prefix) {
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, createAuthzAminoConverters()), createBankAminoConverters()), createDistributionAminoConverters()), createFreegrantAminoConverters()), createGovAminoConverters()), createIbcAminoConverters()), createStakingAminoConverters(prefix)), createWasmAminoConverters());
}
const convert = (converters) => Object.entries(converters).reduce((a, [k, c]) => {
    if (c !== "not_supported_by_chain") {
        const originalTo = c.toAmino;
        const toAmino = (input) => originalTo(Object.entries(input).reduce((a, [k, v]) => (Object.assign(Object.assign({}, a), { [k.replaceAll(/_([a-z])/g, (_, l) => l.toUpperCase())]: v })), {}));
        const fromAmino = (f) => {
            return Object.assign(Object.assign({}, f), { msg: toUtf8(JSON.stringify(f.msg)) });
        };
        c = {
            aminoType: c.aminoType,
            toAmino: toAmino,
            fromAmino,
        };
    }
    return Object.assign(Object.assign({}, a), { [k]: c });
}, {});
export const aminoTypes = (prefix) => new AminoTypes(Object.assign(Object.assign({}, convert(createDefaultTypes(prefix))), vesting.aminoConverter));
export const tx = {
    bank: bank.txClient,
    distribution: distribution.txClient,
    ethermintEvm: ethermintEvm.txClient,
    ethermintFeemarket: ethermintFeemarket.txClient,
    feegrant: feegrant.txClient,
    gov: gov.txClient,
    ibcTransfer: ibcTransfer.txClient,
    slashing: slashing.txClient,
    staking: staking.txClient,
    vesting: vesting.txClient,
    wasm: wasm.txClient,
};
export const query = ({ rest }) => {
    return {
        auth: new auth.Api({ baseUrl: rest }),
        bank: new bank.Api({ baseUrl: rest }),
        distribution: new distribution.Api({ baseUrl: rest }),
        ethermintEvm: new ethermintEvm.Api({ baseUrl: rest }),
        ethermintFeemarket: new ethermintFeemarket.Api({ baseUrl: rest }),
        gov: new gov.Api({ baseUrl: rest }),
        ibcTransfer: new ibcTransfer.Api({ baseUrl: rest }),
        oracle: new oracle.Api({ baseUrl: rest }),
        slashing: new slashing.Api({ baseUrl: rest }),
        staking: new staking.Api({ baseUrl: rest }),
        tx: new tx_.Api({ baseUrl: rest }),
        tendermint: new tendermint.Api({ baseUrl: rest }),
        wasm: new wasm.Api({ baseUrl: rest }),
    };
};
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}
