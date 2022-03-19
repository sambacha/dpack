/** @type {string} base64str */
export declare type base64str = string;
/** @export interface Bundle  */
export interface Bundle {
    [cid: string]: any;
}
/** @type {string} */
export interface IpfsLink {
    '/': string;
}
export interface TypeInfo {
    typename: string;
    artifact: IpfsLink;
}
export interface ObjectInfo {
    objectname: string;
    address: string;
    typename: string;
    artifact: IpfsLink;
}
export interface DPack {
    format: string;
    network: string;
    types: {
        [typename: string]: TypeInfo;
    };
    objects: {
        [objectname: string]: ObjectInfo;
    };
}
export interface Artifact {
}
export interface ResolvedPack extends DPack {
    _bundle: Bundle;
    _resolved: boolean;
}
