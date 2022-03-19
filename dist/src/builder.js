var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { need, copy } from './util';
import { putIpfsJson } from './ipfs-util';
import { blank, merge as _merge, addType as _addType, addObject as _addObject, assertValidPack } from './pure';
const debug = require('debug')('DPack:builder');
export class PackBuilder {
    constructor(network) {
        need(network, 'new PackBuilder(network) - network must be defined');
        debug(`#[debug] new PackBuilder(${network})`);
        need(typeof (network) === 'string', 'new PackBuilder(network) - network must be a string');
        need(network !== 'mainnet', 'You may not use \'mainnet\' as a network name. You might mean \'ethereum\'.');
        need(network !== '', 'Network name cannot be empty.');
        this._pack = blank(network);
        assertValidPack(this._pack);
    }
    packType(t) {
        return __awaiter(this, void 0, void 0, function* () {
            const cid = (yield putIpfsJson(t.artifact)).toString();
            const info = copy(t);
            info.artifact = { '/': cid };
            this._pack = _addType(this._pack, info);
            return yield Promise.resolve(this);
        });
    }
    addType(t) {
        this._pack = _addType(this._pack, t);
        return this;
    }
    packObject(o, alsoPackType = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const cid = (yield putIpfsJson(o.artifact)).toString();
            const info = copy(o);
            info.artifact = { '/': cid };
            let pack = _addObject(this._pack, info);
            if (alsoPackType) {
                pack = _addType(pack, {
                    typename: info.typename,
                    artifact: info.artifact
                });
            }
            this._pack = pack;
            return yield Promise.resolve(this);
        });
    }
    addObject(o) {
        this._pack = _addObject(this._pack, o);
        return this;
    }
    merge(...packs) {
        this._pack = _merge(this._pack, ...packs);
        return this;
    }
    build() {
        assertValidPack(this._pack);
        return copy(this._pack);
    }
}
;
