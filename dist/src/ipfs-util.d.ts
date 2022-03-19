export declare function getIpfsJson(cid: string): Promise<any>;
export declare function putIpfsJson(obj: any, pin?: boolean): Promise<string>;
export declare function pinIpfsCid(cid: string): Promise<void>;
/**
 *
 * @function isV0CID
 * @param cidStr
 * @returns boolean
 * @summary 'If a CID is 46 characters starting with "Qm", it's a CIDv0'
 * @see {@link  https://docs.ipfs.io/concepts/content-addressing/#identifier-formats}
 */
export declare function isV0CID(cidStr: string): boolean;
/**
 * @function isCid
 * @param cidStr
 * @returns boolean
 */
export declare function isCid(cidStr: string): boolean;
