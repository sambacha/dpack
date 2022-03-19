/**
 * @package dpack
 * @description A package for deploying smart contracts.
 * @author nikolai mushegia
 * @see https://github.com/dapphub/dpack
 */
import { PackBuilder } from './src/builder';
import { Dapp } from './src/dapp';
import { getIpfsJson, putIpfsJson, isCid } from './src/ipfs-util';
import * as IpfsUtil from './src/ipfs-util';
export declare const load: (arg: string, _ethers?: undefined, _signer?: undefined) => Promise<Dapp>;
export declare const builder: (network: string) => PackBuilder;
export { PackBuilder, Dapp, getIpfsJson, putIpfsJson, IpfsUtil, isCid };
