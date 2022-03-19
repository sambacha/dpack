'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Ajv = require('ajv');
var default_ethers = require('ethers');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Ajv__default = /*#__PURE__*/_interopDefaultLegacy(Ajv);
var default_ethers__default = /*#__PURE__*/_interopDefaultLegacy(default_ethers);

const v8 = require("v8");
function copy(a) {
  return v8.deserialize(v8.serialize(a));
}
function need(b, s) {
  if (!b != null && !s)
    throw new Error(s);
  console.error("ERROR: need, b, s)`");
}
function omap(x, f) {
  const out = {};
  for (const k of Object.keys(x)) {
    out[k] = f(x[k]);
  }
  return out;
}

var util = /*#__PURE__*/Object.freeze({
  __proto__: null,
  copy: copy,
  need: need,
  omap: omap
});

const debug$2 = require("debug")("dpack");
const IPFS = require("ipfs-http-client");
const nodeAddress = process.env.IPFS_RPC_URL ?? "/ip4/127.0.0.1/tcp/5001";
debug$2(`starting node ${nodeAddress}`);
const node = IPFS.create(nodeAddress);
debug$2("started node");
async function getIpfsJson(cid) {
  if (isV0CID(cid)) {
    console.log(`
WARN: Detected a V0 CID string. This warning will become an error very soon.
Please repack the pack containing ${cid}
`);
  }
  const blob = await node.cat(cid);
  let s = "";
  for await (const chunk of blob) {
    s += chunk;
  }
  return JSON.parse(s);
}
async function putIpfsJson(obj, pin = false) {
  const str = JSON.stringify(obj);
  debug$2(`adding ${str}`);
  const { cid } = await node.add(str, { cidVersion: 1, pin });
  debug$2(`added ${str}`);
  debug$2(`put ${cid}`);
  return cid.toString();
}
async function pinIpfsCid(cid) {
  if (isV0CID(cid)) {
    console.warn(`
WARN: Detected a V0 CID string. This warning will become an error very soon.
Please repack the pack containing ${cid}
`);
  }
  await node.pin.add(cid);
  debug$2(`pinned ${cid}`);
}
function isV0CID(cidStr) {
  return cidStr.length === 46 && cidStr.slice(0, 2) === "Qm";
}
function isCid(cidStr) {
  try {
    IPFS.CID.parse(cidStr);
    return true;
  } catch {
    return false;
  }
}

var ipfsUtil = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getIpfsJson: getIpfsJson,
  putIpfsJson: putIpfsJson,
  pinIpfsCid: pinIpfsCid,
  isV0CID: isV0CID,
  isCid: isCid
});

const ajv = new Ajv__default["default"]();
const linkSchema = {
  properties: {
    "/": { type: "string" }
  }
};
const typeSchema = {
  properties: {
    typename: { type: "string" },
    artifact: { ref: "linkSchema" }
  },
  definitions: {
    linkSchema
  }
};
const objectSchema = {
  properties: {
    objectname: { type: "string" },
    address: { type: "string" },
    typename: { type: "string" },
    artifact: { ref: "linkSchema" }
  },
  definitions: {
    linkSchema
  }
};
const packSchema = {
  properties: {
    format: { type: "string" },
    network: { type: "string" },
    types: { values: { ref: "typeSchema" } },
    objects: { values: { ref: "objectSchema" } }
  },
  definitions: {
    typeSchema,
    objectSchema
  }
};
const bundleSchema = {
  values: { type: "string" }
};
const artifactSchema = {
  bytecode: { nullable: true },
  abi: { nullable: true },
  additionalProperties: true
};
const resolvedPackSchema = {
  properties: {
    format: { type: "string" },
    network: { type: "string" },
    types: { values: { ref: "typeSchema" } },
    objects: { values: { ref: "objectSchema" } },
    _bundle: { ref: "bundleSchema" }
  },
  definitions: {
    typeSchema,
    objectSchema,
    bundleSchema
  }
};
const isWellFormedLink = ajv.compile(linkSchema);
const isWellFormedObject = ajv.compile(objectSchema);
const isWellFormedType = ajv.compile(typeSchema);
const isWellFormedPack = ajv.compile(packSchema);
const isWellFormedBundle = ajv.compile(bundleSchema);
const isWellFormedArtifact = ajv.compile(artifactSchema);
const isWellFormedResolvedPack = ajv.compile(resolvedPackSchema);

var schema = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isWellFormedLink: isWellFormedLink,
  isWellFormedObject: isWellFormedObject,
  isWellFormedType: isWellFormedType,
  isWellFormedPack: isWellFormedPack,
  isWellFormedBundle: isWellFormedBundle,
  isWellFormedArtifact: isWellFormedArtifact,
  isWellFormedResolvedPack: isWellFormedResolvedPack
});

function assertValidPack(p) {
  need(isWellFormedPack(p), `dpack.assertValidPack(): pack fails schema validation: ${isWellFormedPack.errors}`);
  need(p.network != "", "dpack.assertValidPack() - 'network' field cannot be empty");
  need(p.format === "dpack-1", `dpack.assertValidPack() - unrecognized 'format' field: ${p.format}`);
  omap(p.objects, (o) => {
    assertValidObject(o);
    return o;
  });
  omap(p.types, (t) => {
    assertValidType(t);
    return t;
  });
}
function assertValidType(t) {
  need(isWellFormedType(t), `dpack.assertValidType() - not well formed type: ${t}`);
}
function assertValidObject(o) {
  need(isWellFormedObject(o), `dpack.assertValidObject() - not well formed object: ${o}`);
}
function assertValidArtifact(a) {
  need(isWellFormedArtifact(a), `dpack.assertValidArtifact() - not well formed artifact: ${a}`);
}
function addType(pack, type) {
  assertValidPack(pack);
  assertValidType(type);
  need(!pack.types[type.typename], `dpack.addType() - typename already exists: ${type.typename}`);
  const out = copy(pack);
  out.types[type.typename] = type;
  assertValidPack(out);
  return out;
}
function addObject(pack, obj) {
  assertValidPack(pack);
  assertValidObject(obj);
  need(!pack.objects[obj.objectname], `dpack.addObject() - objectname already exists: ${obj.objectname}`);
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
    need(p.format === head.format, "dpack.merge() - two packs have different 'format' fields");
    need(p.network === head.network, "dpack.merge() - two packs have different 'network' fields");
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
    format: "dpack-1",
    network,
    types: {},
    objects: {}
  };
  assertValidPack(pack);
  return pack;
}
async function resolve(pack, ipfs = void 0) {
  async function _resolve(link) {
    need(link, "panic: bad DAG-JSON link");
    need(link["/"], "panic: bad DAG-JSON link");
    return await ipfs.getIpfsJson(link["/"]);
  }
  assertValidPack(pack);
  const out = copy(pack);
  out._bundle = {};
  for (const key of Object.keys(this.types)) {
    out._bundle[key] = await _resolve(this.types[key].artifact);
  }
  for (const key of Object.keys(this.objects)) {
    out._bundle[key] = await _resolve(this.objects[key].artifact);
  }
  return await Promise.resolve(out);
}
function fromObject(obj) {
  assertValidPack(obj);
  return obj;
}

var pure = /*#__PURE__*/Object.freeze({
  __proto__: null,
  schema: schema,
  assertValidPack: assertValidPack,
  assertValidType: assertValidType,
  assertValidObject: assertValidObject,
  assertValidArtifact: assertValidArtifact,
  addType: addType,
  addObject: addObject,
  merge: merge,
  blank: blank,
  resolve: resolve,
  fromObject: fromObject
});

const debug$1 = require("debug")("DPack:builder");
class PackBuilder {
  constructor(network) {
    need(network, "new PackBuilder(network) - network must be defined");
    debug$1(`#[debug] new PackBuilder(${network})`);
    need(typeof network === "string", "new PackBuilder(network) - network must be a string");
    need(network !== "mainnet", "You may not use 'mainnet' as a network name. You might mean 'ethereum'.");
    need(network !== "", "Network name cannot be empty.");
    this._pack = blank(network);
    assertValidPack(this._pack);
  }
  async packType(t) {
    const cid = (await putIpfsJson(t.artifact)).toString();
    const info = copy(t);
    info.artifact = { "/": cid };
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
    info.artifact = { "/": cid };
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

var builder$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  PackBuilder: PackBuilder
});

const debug = require("debug")("dpack");
class Dapp {
  constructor() {
  }
  static async loadFromPack(pack, _ethers = void 0, _signer = void 0) {
    const dapp = new Dapp();
    dapp._objects = {};
    dapp._types = {};
    dapp._pack = pack;
    dapp._ethers = _ethers ?? default_ethers__default["default"];
    const signer = _signer ?? dapp._ethers.Wallet.createRandom();
    for (const key of Object.keys(dapp._pack.objects)) {
      const obj = dapp._pack.objects[key];
      const cid = obj.artifact["/"];
      const artifact = await getIpfsJson(cid);
      const abi = artifact.abi;
      const addr = obj.address;
      const instance = new dapp._ethers.Contract(addr, abi, signer);
      instance.objectname = obj.objectname;
      instance.typename = obj.typename;
      instance.artifact = obj.artifact;
      dapp._objects[key] = instance;
      need(dapp === void 0, "Panic: name collision on dapp object.");
      debug("#[debug] dapp._objects[key] = instance");
    }
    for (const key of Object.keys(dapp._pack.types)) {
      const typ = dapp._pack.types[key];
      const cid = typ.artifact["/"];
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

var types = /*#__PURE__*/Object.freeze({
  __proto__: null
});

const load = async (arg, _ethers = void 0, _signer = void 0) => {
  if (typeof arg === "string") {
    arg = isCid(arg) ? await getIpfsJson(arg) : require(arg);
  }
  need(typeof arg === "object" && Object.keys(arg).length, "Could not find a pack from provided source.");
  return await Dapp.loadFromPack(arg, _ethers, _signer);
};
const builder = (network) => new PackBuilder(network);

exports.Builder = builder$1;
exports.Dapp = Dapp;
exports.IpfsUtil = ipfsUtil;
exports.PackBuilder = PackBuilder;
exports.Pure = pure;
exports.Schema = schema;
exports.Types = types;
exports.Util = util;
exports.builder = builder;
exports.getIpfsJson = getIpfsJson;
exports.isCid = isCid;
exports.load = load;
exports.putIpfsJson = putIpfsJson;
//# sourceMappingURL=index.js.map
