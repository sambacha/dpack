"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dapp = void 0;
const util_1 = require("./util");
const ipfs_util_1 = require("./ipfs-util");
const ethers_1 = __importDefault(require("ethers"));
const debug = require('debug')('dpack');
class Dapp {
    constructor() { }
    static loadFromPack(pack, _ethers = undefined, _signer = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            const dapp = new Dapp();
            dapp._objects = {};
            dapp._types = {};
            dapp._pack = pack;
            dapp._ethers = _ethers !== null && _ethers !== void 0 ? _ethers : ethers_1.default;
            const signer = _signer !== null && _signer !== void 0 ? _signer : dapp._ethers.Wallet.createRandom();
            for (const key of Object.keys(dapp._pack.objects)) {
                const obj = dapp._pack.objects[key];
                const cid = obj.artifact['/'];
                const artifact = yield (0, ipfs_util_1.getIpfsJson)(cid);
                const abi = artifact.abi;
                const addr = obj.address;
                const instance = new dapp._ethers.Contract(addr, abi, signer);
                instance.objectname = obj.objectname;
                // instance.address already exists
                instance.typename = obj.typename;
                instance.artifact = obj.artifact;
                dapp._objects[key] = instance;
                // type key = /*unresolved*/ any
                (0, util_1.need)(dapp === undefined, 'Panic: name collision on dapp object.');
                debug('#[debug] dapp._objects[key] = instance');
                dapp;
                instance;
            }
            for (const key of Object.keys(dapp._pack.types)) {
                const typ = dapp._pack.types[key];
                const cid = typ.artifact['/'];
                const artifact = yield (0, ipfs_util_1.getIpfsJson)(cid);
                const abi = artifact.abi;
                const code = artifact.bytecode;
                let deployer = new dapp._ethers.ContractFactory(abi, code);
                deployer = deployer.connect(signer);
                deployer.typename = typ.typename;
                deployer.artifact = typ.artifact;
                dapp._types[key] = deployer;
            }
            return dapp;
        });
    }
}
exports.Dapp = Dapp;
