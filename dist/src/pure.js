"use strict";
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
exports.fromObject = exports.resolve = exports.blank = exports.merge = exports.addObject = exports.addType = exports.assertValidArtifact = exports.assertValidObject = exports.assertValidType = exports.assertValidPack = exports.schema = void 0;
const util_1 = require("./util");
const schema = __importStar(require("./schema"));
exports.schema = schema;
function assertValidPack(p) {
    (0, util_1.need)(schema.isWellFormedPack(p), `dpack.assertValidPack(): pack fails schema validation: ${schema.isWellFormedPack.errors}`);
    (0, util_1.need)(p.network != '', 'dpack.assertValidPack() - \'network\' field cannot be empty');
    (0, util_1.need)(p.format === 'dpack-1', `dpack.assertValidPack() - unrecognized 'format' field: ${p.format}`);
    (0, util_1.omap)(p.objects, (o) => { assertValidObject(o); return o; });
    (0, util_1.omap)(p.types, (t) => { assertValidType(t); return t; });
}
exports.assertValidPack = assertValidPack;
function assertValidType(t) {
    (0, util_1.need)(schema.isWellFormedType(t), `dpack.assertValidType() - not well formed type: ${t}`);
}
exports.assertValidType = assertValidType;
function assertValidObject(o) {
    (0, util_1.need)(schema.isWellFormedObject(o), `dpack.assertValidObject() - not well formed object: ${o}`);
}
exports.assertValidObject = assertValidObject;
function assertValidArtifact(a) {
    (0, util_1.need)(schema.isWellFormedArtifact(a), `dpack.assertValidArtifact() - not well formed artifact: ${a}`);
}
exports.assertValidArtifact = assertValidArtifact;
function addType(pack, type) {
    assertValidPack(pack);
    assertValidType(type);
    (0, util_1.need)(!(pack.types[type.typename]), `dpack.addType() - typename already exists: ${type.typename}`);
    const out = (0, util_1.copy)(pack);
    out.types[type.typename] = type;
    assertValidPack(out);
    return out;
}
exports.addType = addType;
function addObject(pack, obj) {
    assertValidPack(pack);
    assertValidObject(obj);
    (0, util_1.need)(!(pack.objects[obj.objectname]), `dpack.addObject() - objectname already exists: ${obj.objectname}`);
    const out = (0, util_1.copy)(pack);
    out.objects[obj.objectname] = obj;
    assertValidPack(pack);
    return out;
}
exports.addObject = addObject;
function merge(...packs) {
    const head = packs[0];
    const rest = packs.slice(1);
    packs.map((p) => {
        assertValidPack(p);
        (0, util_1.need)(p.format === head.format, 'dpack.merge() - two packs have different \'format\' fields');
        (0, util_1.need)(p.network === head.network, 'dpack.merge() - two packs have different \'network\' fields');
    });
    let out = (0, util_1.copy)(head);
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
exports.merge = merge;
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
exports.blank = blank;
function resolve(pack, ipfs = undefined) {
    return __awaiter(this, void 0, void 0, function* () {
        function _resolve(link) {
            return __awaiter(this, void 0, void 0, function* () {
                (0, util_1.need)(link, 'panic: bad DAG-JSON link');
                (0, util_1.need)(link['/'], 'panic: bad DAG-JSON link');
                return yield ipfs.getIpfsJson(link['/']);
            });
        }
        assertValidPack(pack);
        const out = (0, util_1.copy)(pack);
        out._bundle = {};
        for (const key of Object.keys(this.types)) {
            out._bundle[key] = yield _resolve(this.types[key].artifact);
        }
        for (const key of Object.keys(this.objects)) {
            out._bundle[key] = yield _resolve(this.objects[key].artifact);
        }
        return yield Promise.resolve(out);
    });
}
exports.resolve = resolve;
function fromObject(obj) {
    assertValidPack(obj);
    return obj;
}
exports.fromObject = fromObject;
