export declare class Dapp {
    _ethers: any;
    _pack: any;
    _objects: any;
    _types: any;
    private constructor();
    static loadFromPack(pack: any, _ethers?: any, _signer?: any): Promise<Dapp>;
}
