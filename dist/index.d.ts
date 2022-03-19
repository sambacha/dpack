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
 * @package dpack
 * @description A package for deploying smart contracts.
 * @author nikolai mushegia
 * @see https://github.com/dapphub/dpack
 */

declare const load: (arg: string, _ethers?: undefined, _signer?: undefined) => Promise<Dapp>;
declare const builder: (network: string) => PackBuilder;

export { Dapp, ipfsUtil as IpfsUtil, PackBuilder, builder, getIpfsJson, isCid, load, putIpfsJson };
