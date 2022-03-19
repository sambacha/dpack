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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackBuilder = void 0;
const util_1 = require("./util");
const ipfs_util_1 = require("./ipfs-util");
const pure_1 = require("./pure");
const debug = require('debug')('DPack:builder');
class PackBuilder {
    constructor(network) {
        (0, util_1.need)(network, 'new PackBuilder(network) - network must be defined');
        debug(`#[debug] new PackBuilder(${network})`);
        (0, util_1.need)(typeof (network) === 'string', 'new PackBuilder(network) - network must be a string');
        (0, util_1.need)(network !== 'mainnet', 'You may not use \'mainnet\' as a network name. You might mean \'ethereum\'.');
        (0, util_1.need)(network !== '', 'Network name cannot be empty.');
        this._pack = (0, pure_1.blank)(network);
        (0, pure_1.assertValidPack)(this._pack);
    }
    packType(t) {
        return __awaiter(this, void 0, void 0, function* () {
            const cid = (yield (0, ipfs_util_1.putIpfsJson)(t.artifact)).toString();
            const info = (0, util_1.copy)(t);
            info.artifact = { '/': cid };
            this._pack = (0, pure_1.addType)(this._pack, info);
            return yield Promise.resolve(this);
        });
    }
    addType(t) {
        this._pack = (0, pure_1.addType)(this._pack, t);
        return this;
    }
    packObject(o, alsoPackType = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const cid = (yield (0, ipfs_util_1.putIpfsJson)(o.artifact)).toString();
            const info = (0, util_1.copy)(o);
            info.artifact = { '/': cid };
            let pack = (0, pure_1.addObject)(this._pack, info);
            if (alsoPackType) {
                pack = (0, pure_1.addType)(pack, {
                    typename: info.typename,
                    artifact: info.artifact
                });
            }
            this._pack = pack;
            return yield Promise.resolve(this);
        });
    }
    addObject(o) {
        this._pack = (0, pure_1.addObject)(this._pack, o);
        return this;
    }
    merge(...packs) {
        this._pack = (0, pure_1.merge)(this._pack, ...packs);
        return this;
    }
    build() {
        (0, pure_1.assertValidPack)(this._pack);
        return (0, util_1.copy)(this._pack);
    }
}
exports.PackBuilder = PackBuilder;
;
