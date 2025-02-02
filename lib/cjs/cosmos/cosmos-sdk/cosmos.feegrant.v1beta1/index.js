"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = exports.Api = exports.txClient = exports.registry = void 0;
const proto_signing_1 = require("@cosmjs/proto-signing");
const rest_1 = require("./rest");
Object.defineProperty(exports, "Api", { enumerable: true, get: function () { return rest_1.Api; } });
const feegrant_1 = require("./types/feegrant");
const tx_1 = require("./types/tx");
const types = [
    ["/cosmos.feegrant.v1beta1.MsgGrantAllowance", tx_1.MsgGrantAllowance],
    ["/cosmos.feegrant.v1beta1.MsgRevokeAllowance", tx_1.MsgRevokeAllowance],
    ["/cosmos.feegrant.v1beta1.BasicAllowance", feegrant_1.BasicAllowance],
    ["/cosmos.feegrant.v1beta1.PeriodicAllowance", feegrant_1.PeriodicAllowance],
    ["/cosmos.feegrant.v1beta1.AllowedMsgAllowance", feegrant_1.AllowedMsgAllowance],
];
exports.types = types;
exports.registry = new proto_signing_1.Registry(types);
const txClient = {
    msgGrantAllowance: (data) => ({
        typeUrl: "/cosmos.feegrant.v1beta1.MsgGrantAllowance",
        value: tx_1.MsgGrantAllowance.fromPartial(data),
    }),
    msgRevokeAllowance: (data) => ({
        typeUrl: "/cosmos.feegrant.v1beta1.MsgRevokeAllowance",
        value: tx_1.MsgRevokeAllowance.fromPartial(data),
    }),
};
exports.txClient = txClient;
