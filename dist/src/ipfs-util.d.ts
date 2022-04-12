export declare function getIpfsJson(cid: string): Promise<any>;
export declare function putIpfsJson(obj: any, pin?: boolean): Promise<string>;
export declare function pinIpfsCid(cid: string): Promise<void>;
export declare function isV0CID(cidStr: string): boolean;
export declare function isCid(cidStr: string): boolean;
