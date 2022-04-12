import { PackBuilder } from './src/builder';
import { Dapp } from './src/dapp';
import { getIpfsJson, putIpfsJson } from './src/ipfs-util';
export declare const load: (arg: any, _ethers?: any, _signer?: any) => Promise<Dapp>;
export declare const builder: (network: any) => PackBuilder;
export { PackBuilder, Dapp, getIpfsJson, putIpfsJson };
