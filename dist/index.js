"use strict";
/**
 * @package dpack
 * @description A package for deploying smart contracts.
 * @author nikolai mushegia
 * @see https://github.com/dapphub/dpack
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCid = exports.IpfsUtil = exports.putIpfsJson = exports.getIpfsJson = exports.Dapp = exports.PackBuilder = exports.builder = exports.load = void 0;
const builder_1 = require("./src/builder");
Object.defineProperty(exports, "PackBuilder", { enumerable: true, get: function () { return builder_1.PackBuilder; } });
const dapp_1 = require("./src/dapp");
Object.defineProperty(exports, "Dapp", { enumerable: true, get: function () { return dapp_1.Dapp; } });
const ipfs_util_1 = require("./src/ipfs-util");
Object.defineProperty(exports, "getIpfsJson", { enumerable: true, get: function () { return ipfs_util_1.getIpfsJson; } });
Object.defineProperty(exports, "putIpfsJson", { enumerable: true, get: function () { return ipfs_util_1.putIpfsJson; } });
Object.defineProperty(exports, "isCid", { enumerable: true, get: function () { return ipfs_util_1.isCid; } });
const util_1 = require("./src/util");
const IpfsUtil = __importStar(require("./src/ipfs-util"));
exports.IpfsUtil = IpfsUtil;
const load = (arg, _ethers = undefined, _signer = undefined) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof arg === 'string') {
        arg = ((0, ipfs_util_1.isCid)(arg)) ? yield (0, ipfs_util_1.getIpfsJson)(arg) : require(arg);
    }
    (0, util_1.need)(typeof arg === 'object' && Object.keys(arg).length, 'Could not find a pack from provided source.');
    return yield dapp_1.Dapp.loadFromPack(arg, _ethers, _signer);
});
exports.load = load;
const builder = (network) => new builder_1.PackBuilder(network);
exports.builder = builder;
