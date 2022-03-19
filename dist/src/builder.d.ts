import { DPack } from './types';
export declare class PackBuilder {
    _pack: DPack;
    constructor(network: string);
    packType(t: any): Promise<PackBuilder>;
    addType(t: any): PackBuilder;
    packObject(o: any, alsoPackType?: boolean): Promise<PackBuilder>;
    addObject(o: any): PackBuilder;
    merge(...packs: DPack[]): PackBuilder;
    build(): any;
}
