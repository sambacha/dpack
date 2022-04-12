const v8 = require('v8');
function copy(a) {
    return v8.deserialize(v8.serialize(a));
    //  return JSON.parse(JSON.stringify(a))
}
function need(b, s) {
    if (!b)
        throw new Error(s);
}
function omap(o, f) {
    const out = {};
    for (const [k, v] of Object.entries(o)) {
        out[k] = f(v);
    }
    return out;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

var _a;
const debug = require('debug')('dpack');
const IPFS = require('ipfs-http-client');
let nodeAddress = '/ip4/127.0.0.1/tcp/5001';
try {
    nodeAddress = (_a = process.env["IPFS_RPC_URL"]) !== null && _a !== void 0 ? _a : '/ip4/127.0.0.1/tcp/5001';
}
catch (_b) { }
debug(`starting node ${nodeAddress}`);
const node = IPFS.create(nodeAddress);
debug('started node');
async function getIpfsJson(cid) {
    var e_1, _a;
    if (isV0CID(cid)) {
        console.log(`
WARN: Detected a V0 CID string. This warning will become an error very soon.
Please repack the pack containing ${cid}
`);
    }
    const blob = await node.cat(cid);
    let s = '';
    let utf8decoder = new TextDecoder();
    try {
        for (var blob_1 = __asyncValues(blob), blob_1_1; blob_1_1 = await blob_1.next(), !blob_1_1.done;) {
            const chunk = blob_1_1.value;
            s += utf8decoder.decode(chunk);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (blob_1_1 && !blob_1_1.done && (_a = blob_1.return)) await _a.call(blob_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return JSON.parse(s);
}
async function putIpfsJson(obj, pin = false) {
    const str = JSON.stringify(obj);
    debug(`adding ${str}`);
    const { cid } = await node.add(str, { cidVersion: 1, pin: pin });
    debug(`added ${str}`);
    debug(`put ${cid}`);
    return cid.toString();
}
// 'If a CID is 46 characters starting with "Qm", it's a CIDv0'
// https://docs.ipfs.io/concepts/content-addressing/#identifier-formats
function isV0CID(cidStr) {
    return (cidStr.length == 46 && cidStr.slice(0, 2) == 'Qm');
}
function isCid(cidStr) {
    try {
        IPFS.CID.parse(cidStr);
        return true;
    }
    catch (_a) {
        return false;
    }
}

const Ajv = require('ajv'); // = require('ajv/dist/jtd')
const ajv = Ajv();
const linkSchema = {
    properties: {
        '/': { type: 'string' }
    }
};
const typeSchema = {
    properties: {
        typename: { type: 'string' },
        artifact: { ref: 'linkSchema' }
    },
    definitions: {
        linkSchema
    }
};
const objectSchema = {
    properties: {
        objectname: { type: 'string' },
        address: { type: 'string' },
        typename: { type: 'string' },
        artifact: { ref: 'linkSchema' }
    },
    definitions: {
        linkSchema
    }
};
const packSchema = {
    properties: {
        format: { type: 'string' },
        network: { type: 'string' },
        types: { values: { ref: 'typeSchema' } },
        objects: { values: { ref: 'objectSchema' } }
    },
    definitions: {
        typeSchema,
        objectSchema
    }
};
const bundleSchema = {
    values: { type: 'string' }
};
const artifactSchema = {
    bytecode: { nullable: true },
    abi: { nullable: true },
    additionalProperties: true
};
const resolvedPackSchema = {
    properties: {
        format: { type: 'string' },
        network: { type: 'string' },
        types: { values: { ref: 'typeSchema' } },
        objects: { values: { ref: 'objectSchema' } },
        _bundle: { ref: 'bundleSchema' }
    },
    definitions: {
        typeSchema,
        objectSchema,
        bundleSchema
    }
};
ajv.compile(linkSchema);
const isWellFormedObject = ajv.compile(objectSchema);
const isWellFormedType = ajv.compile(typeSchema);
const isWellFormedPack = ajv.compile(packSchema);
ajv.compile(bundleSchema);
ajv.compile(artifactSchema);
ajv.compile(resolvedPackSchema);

function assertValidPack(p) {
    need(isWellFormedPack(p), `dpack.assertValidPack(): pack fails schema validation: ${isWellFormedPack.errors}`);
    need(p.network != '', 'dpack.assertValidPack() - \'network\' field cannot be empty');
    need(p.format === 'dpack-1', `dpack.assertValidPack() - unrecognized 'format' field: ${p.format}`);
    omap(p.objects, (o) => { assertValidObject(o); return o; });
    omap(p.types, (t) => { assertValidType(t); return t; });
}
function assertValidType(t) {
    need(isWellFormedType(t), `dpack.assertValidType() - not well formed type: ${t}`);
}
function assertValidObject(o) {
    need(isWellFormedObject(o), `dpack.assertValidObject() - not well formed object: ${o}`);
}
function addType(pack, type) {
    assertValidPack(pack);
    assertValidType(type);
    need(!(pack.types[type.typename]), `dpack.addType() - typename already exists: ${type.typename}`);
    const out = copy(pack);
    out.types[type.typename] = type;
    assertValidPack(out);
    return out;
}
function addObject(pack, obj) {
    assertValidPack(pack);
    assertValidObject(obj);
    need(!(pack.objects[obj.objectname]), `dpack.addObject() - objectname already exists: ${obj.objectname}`);
    const out = copy(pack);
    out.objects[obj.objectname] = obj;
    assertValidPack(pack);
    return out;
}
function merge(...packs) {
    const head = packs[0];
    const rest = packs.slice(1);
    packs.map((p) => {
        assertValidPack(p);
        need(p.format === head.format, 'dpack.merge() - two packs have different \'format\' fields');
        need(p.network === head.network, 'dpack.merge() - two packs have different \'network\' fields');
    });
    let out = copy(head);
    for (const pack of rest) {
        for (const tkey of Object.keys(pack.types)) {
            out = addType(out, pack.types[tkey]);
        }
        for (const okey of Object.keys(pack.objects)) {
            out = addObject(out, pack.objects[okey]);
        }
    }
    assertValidPack(out);
    return out;
}
function blank(network) {
    const pack = {
        format: 'dpack-1',
        network: network,
        types: {},
        objects: {}
    };
    assertValidPack(pack);
    return pack;
}

require('debug')('DPack:builder');
class PackBuilder {
    constructor(network) {
        need(network, 'new PackBuilder(network) - network must be defined');
        need(typeof (network) === 'string', 'new PackBuilder(network) - network must be a string');
        need(network !== 'mainnet', 'You may not use \'mainnet\' as a network name. You might mean \'ethereum\'.');
        need(network !== '', 'Network name cannot be empty.');
        this._pack = blank(network);
        assertValidPack(this._pack);
    }
    async packType(t) {
        const cid = (await putIpfsJson(t.artifact)).toString();
        const info = copy(t);
        info.artifact = { '/': cid };
        this._pack = addType(this._pack, info);
        return await Promise.resolve(this);
    }
    addType(t) {
        this._pack = addType(this._pack, t);
        return this;
    }
    async packObject(o, alsoPackType = true) {
        const cid = (await putIpfsJson(o.artifact)).toString();
        const info = copy(o);
        info.artifact = { '/': cid };
        let pack = addObject(this._pack, info);
        if (alsoPackType) {
            pack = addType(pack, {
                typename: info.typename,
                artifact: info.artifact
            });
        }
        this._pack = pack;
        return await Promise.resolve(this);
    }
    addObject(o) {
        this._pack = addObject(this._pack, o);
        return this;
    }
    merge(...packs) {
        this._pack = merge(this._pack, ...packs);
        return this;
    }
    build() {
        assertValidPack(this._pack);
        return copy(this._pack);
    }
}

require('debug')('dpack');
const default_ethers = require('ethers');
class Dapp {
    constructor() { }
    static async loadFromPack(pack, _ethers = undefined, _signer = undefined) {
        const dapp = new Dapp();
        dapp._objects = {};
        dapp._types = {};
        dapp._pack = pack;
        dapp._ethers = _ethers !== null && _ethers !== void 0 ? _ethers : default_ethers;
        let signer = _signer !== null && _signer !== void 0 ? _signer : dapp._ethers.Wallet.createRandom();
        for (const key of Object.keys(dapp._pack.objects)) {
            const obj = dapp._pack.objects[key];
            const cid = obj.artifact['/'];
            const artifact = await getIpfsJson(cid);
            const abi = artifact.abi;
            const addr = obj.address;
            const instance = new dapp._ethers.Contract(addr, abi, signer);
            instance.objectname = obj.objectname;
            // instance.address already exists
            instance.typename = obj.typename;
            instance.artifact = obj.artifact;
            dapp._objects[key] = instance;
            need(dapp[key] == undefined, 'Panic: name collision on dapp object.');
            dapp[key] = instance;
        }
        for (const key of Object.keys(dapp._pack.types)) {
            const typ = dapp._pack.types[key];
            const cid = typ.artifact['/'];
            const artifact = await getIpfsJson(cid);
            const abi = artifact.abi;
            const code = artifact.bytecode;
            let deployer = new dapp._ethers.ContractFactory(abi, code);
            deployer = deployer.connect(signer);
            deployer.typename = typ.typename;
            deployer.artifact = typ.artifact;
            dapp._types[key] = deployer;
        }
        return dapp;
    }
}

const load = async (arg, _ethers = undefined, _signer = undefined) => {
    if (typeof arg === 'string') {
        arg = (isCid(arg)) ? await getIpfsJson(arg) : require(arg);
    }
    need(typeof arg === 'object' && Object.keys(arg).length, 'Could not find a pack from provided source.');
    return await Dapp.loadFromPack(arg, _ethers, _signer);
};
const builder = (network) => new PackBuilder(network);

export { Dapp, PackBuilder, builder, getIpfsJson, load, putIpfsJson };
//# sourceMappingURL=index.mjs.map
