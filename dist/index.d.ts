import * as ajv from 'ajv';

/** @type {string} base64str */
declare type base64str = string;
/** @export interface Bundle  */
interface Bundle {
    [cid: string]: any;
}
/** @type {string} */
interface IpfsLink {
    '/': string;
}
interface TypeInfo {
    typename: string;
    artifact: IpfsLink;
}
interface ObjectInfo {
    objectname: string;
    address: string;
    typename: string;
    artifact: IpfsLink;
}
interface DPack {
    format: string;
    network: string;
    types: {
        [typename: string]: TypeInfo;
    };
    objects: {
        [objectname: string]: ObjectInfo;
    };
}
interface Artifact {
}
interface ResolvedPack extends DPack {
    _bundle: Bundle;
    _resolved: boolean;
}

type types_base64str = base64str;
type types_Bundle = Bundle;
type types_IpfsLink = IpfsLink;
type types_TypeInfo = TypeInfo;
type types_ObjectInfo = ObjectInfo;
type types_DPack = DPack;
type types_Artifact = Artifact;
type types_ResolvedPack = ResolvedPack;
declare namespace types {
  export {
    types_base64str as base64str,
    types_Bundle as Bundle,
    types_IpfsLink as IpfsLink,
    types_TypeInfo as TypeInfo,
    types_ObjectInfo as ObjectInfo,
    types_DPack as DPack,
    types_Artifact as Artifact,
    types_ResolvedPack as ResolvedPack,
  };
}

declare class PackBuilder {
    _pack: DPack;
    constructor(network: string);
    packType(t: any): Promise<PackBuilder>;
    addType(t: any): PackBuilder;
    packObject(o: any, alsoPackType?: boolean): Promise<PackBuilder>;
    addObject(o: any): PackBuilder;
    merge(...packs: DPack[]): PackBuilder;
    build(): any;
}

type builder$1_PackBuilder = PackBuilder;
declare const builder$1_PackBuilder: typeof PackBuilder;
declare namespace builder$1 {
  export {
    builder$1_PackBuilder as PackBuilder,
  };
}

declare class Dapp {
    _ethers: any;
    _pack: any;
    _objects: any;
    _types: any;
    weth: any;
    private constructor();
    static loadFromPack(pack: any, _ethers?: any, _signer?: any): Promise<Dapp>;
}

declare function getIpfsJson(cid: string): Promise<any>;
declare function putIpfsJson(obj: any, pin?: boolean): Promise<string>;
declare function pinIpfsCid(cid: string): Promise<void>;
/**
 *
 * @function isV0CID
 * @param cidStr
 * @returns boolean
 * @summary 'If a CID is 46 characters starting with "Qm", it's a CIDv0'
 * @see {@link  https://docs.ipfs.io/concepts/content-addressing/#identifier-formats}
 */
declare function isV0CID(cidStr: string): boolean;
/**
 * @function isCid
 * @param cidStr
 * @returns boolean
 */
declare function isCid(cidStr: string): boolean;

declare const ipfsUtil_getIpfsJson: typeof getIpfsJson;
declare const ipfsUtil_putIpfsJson: typeof putIpfsJson;
declare const ipfsUtil_pinIpfsCid: typeof pinIpfsCid;
declare const ipfsUtil_isV0CID: typeof isV0CID;
declare const ipfsUtil_isCid: typeof isCid;
declare namespace ipfsUtil {
  export {
    ipfsUtil_getIpfsJson as getIpfsJson,
    ipfsUtil_putIpfsJson as putIpfsJson,
    ipfsUtil_pinIpfsCid as pinIpfsCid,
    ipfsUtil_isV0CID as isV0CID,
    ipfsUtil_isCid as isCid,
  };
}

/**
 * @export const isWellFormedLink
 * @export const isWellFormedObject
 * @export const isWellFormedType
 * @export const isWellFormedPack
 * @export const isWellFormedArtifact
 * @export const isWellFormedResolvedPack
 * @export const isWellFormedBundle
 * @export const isWellFormedArtifact
 * @export const isWellFormedArtifact
 */
declare const isWellFormedLink: ajv.ValidateFunction<unknown>;
declare const isWellFormedObject: ajv.ValidateFunction<unknown>;
declare const isWellFormedType: ajv.ValidateFunction<unknown>;
declare const isWellFormedPack: ajv.ValidateFunction<unknown>;
declare const isWellFormedBundle: ajv.ValidateFunction<unknown>;
declare const isWellFormedArtifact: ajv.ValidateFunction<unknown>;
declare const isWellFormedResolvedPack: ajv.ValidateFunction<unknown>;

declare const schema_isWellFormedLink: typeof isWellFormedLink;
declare const schema_isWellFormedObject: typeof isWellFormedObject;
declare const schema_isWellFormedType: typeof isWellFormedType;
declare const schema_isWellFormedPack: typeof isWellFormedPack;
declare const schema_isWellFormedBundle: typeof isWellFormedBundle;
declare const schema_isWellFormedArtifact: typeof isWellFormedArtifact;
declare const schema_isWellFormedResolvedPack: typeof isWellFormedResolvedPack;
declare namespace schema {
  export {
    schema_isWellFormedLink as isWellFormedLink,
    schema_isWellFormedObject as isWellFormedObject,
    schema_isWellFormedType as isWellFormedType,
    schema_isWellFormedPack as isWellFormedPack,
    schema_isWellFormedBundle as isWellFormedBundle,
    schema_isWellFormedArtifact as isWellFormedArtifact,
    schema_isWellFormedResolvedPack as isWellFormedResolvedPack,
  };
}

declare function assertValidPack(p: DPack): void;
declare function assertValidType(t: TypeInfo): void;
declare function assertValidObject(o: ObjectInfo): void;
declare function assertValidArtifact(a: Artifact): void;
declare function addType(pack: DPack, type: TypeInfo): DPack;
declare function addObject(pack: DPack, obj: any): DPack;
declare function merge(...packs: DPack[]): DPack;
declare function blank(network: string): DPack;
declare function resolve(this: any, pack: DPack, ipfs?: any): Promise<ResolvedPack>;
declare function fromObject(obj: any): DPack;

declare const pure_schema: typeof schema;
declare const pure_assertValidPack: typeof assertValidPack;
declare const pure_assertValidType: typeof assertValidType;
declare const pure_assertValidObject: typeof assertValidObject;
declare const pure_assertValidArtifact: typeof assertValidArtifact;
declare const pure_addType: typeof addType;
declare const pure_addObject: typeof addObject;
declare const pure_merge: typeof merge;
declare const pure_blank: typeof blank;
declare const pure_resolve: typeof resolve;
declare const pure_fromObject: typeof fromObject;
declare namespace pure {
  export {
    pure_schema as schema,
    pure_assertValidPack as assertValidPack,
    pure_assertValidType as assertValidType,
    pure_assertValidObject as assertValidObject,
    pure_assertValidArtifact as assertValidArtifact,
    pure_addType as addType,
    pure_addObject as addObject,
    pure_merge as merge,
    pure_blank as blank,
    pure_resolve as resolve,
    pure_fromObject as fromObject,
  };
}

/**
 * @exports copy
 * @param a
 * @returns
 */
declare function copy(a: any): any;
/**
 * @exports need
 * @param b
 * @param s
 */
declare function need(b: any, s: string): void;
/**
 * omap - map over an object, returning a new object
 * @exports omap
 * @param {Object} obj
 * @param {Function} keyMapFunction - Transform operation to apply on the key.
 * @param {Function} [valueMapFunction] - Transform operation to apply on the value.
 * @returns {Object} out
 */
declare function omap<K extends string, T, M>(x: {
    [P in K]: T;
}, f: (t: T) => M): {
    [P in K]: M;
};

declare const util_copy: typeof copy;
declare const util_need: typeof need;
declare const util_omap: typeof omap;
declare namespace util {
  export {
    util_copy as copy,
    util_need as need,
    util_omap as omap,
  };
}

/**
 * @package dpack
 * @description A package for deploying smart contracts.
 * @author nikolai mushegia
 * @see {@link https://github.com/dapphub/dpack}
 */

declare const load: (arg: string, _ethers?: undefined, _signer?: undefined) => Promise<Dapp>;
declare const builder: (network: string) => PackBuilder;

export { builder$1 as Builder, Dapp, ipfsUtil as IpfsUtil, PackBuilder, pure as Pure, schema as Schema, types as Types, util as Util, builder, getIpfsJson, isCid, load, putIpfsJson };
