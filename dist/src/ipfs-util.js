var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _a;
const debug = require('debug')('dpack');
const IPFS = require('ipfs-http-client');
const nodeAddress = (_a = process.env.IPFS_RPC_URL) !== null && _a !== void 0 ? _a : '/ip4/127.0.0.1/tcp/5001';
debug(`starting node ${nodeAddress}`);
const node = IPFS.create(nodeAddress);
debug('started node');
export function getIpfsJson(cid) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (isV0CID(cid)) {
            console.log(`
WARN: Detected a V0 CID string. This warning will become an error very soon.
Please repack the pack containing ${cid}
`);
        }
        const blob = yield node.cat(cid);
        let s = '';
        try {
            for (var blob_1 = __asyncValues(blob), blob_1_1; blob_1_1 = yield blob_1.next(), !blob_1_1.done;) {
                const chunk = blob_1_1.value;
                s += chunk;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (blob_1_1 && !blob_1_1.done && (_a = blob_1.return)) yield _a.call(blob_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return JSON.parse(s);
    });
}
export function putIpfsJson(obj, pin = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const str = JSON.stringify(obj);
        debug(`adding ${str}`);
        const { cid } = yield node.add(str, { cidVersion: 1, pin: pin });
        debug(`added ${str}`);
        debug(`put ${cid}`);
        return cid.toString();
    });
}
export function pinIpfsCid(cid) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isV0CID(cid)) {
            console.warn(`
WARN: Detected a V0 CID string. This warning will become an error very soon.
Please repack the pack containing ${cid}
`);
        }
        yield node.pin.add(cid);
        debug(`pinned ${cid}`);
    });
}
/**
 *
 * @function isV0CID
 * @param cidStr
 * @returns boolean
 * @summary 'If a CID is 46 characters starting with "Qm", it's a CIDv0'
 * @see {@link  https://docs.ipfs.io/concepts/content-addressing/#identifier-formats}
 */
export function isV0CID(cidStr) {
    return (cidStr.length === 46 && cidStr.slice(0, 2) === 'Qm');
}
/**
 * @function isCid
 * @param cidStr
 * @returns boolean
 */
export function isCid(cidStr) {
    try {
        IPFS.CID.parse(cidStr);
        return true;
    }
    catch (_a) {
        return false;
    }
}
