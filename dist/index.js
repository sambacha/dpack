/**
 * @package dpack
 * @description A package for deploying smart contracts.
 * @author nikolai mushegia
 * @see https://github.com/dapphub/dpack
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PackBuilder } from './src/builder';
import { Dapp } from './src/dapp';
import { getIpfsJson, putIpfsJson, isCid } from './src/ipfs-util';
import { need } from './src/util';
import * as IpfsUtil from './src/ipfs-util';
export const load = (arg, _ethers = undefined, _signer = undefined) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof arg === 'string') {
        arg = (isCid(arg)) ? yield getIpfsJson(arg) : require(arg);
    }
    need(typeof arg === 'object' && Object.keys(arg).length, 'Could not find a pack from provided source.');
    return yield Dapp.loadFromPack(arg, _ethers, _signer);
});
export const builder = (network) => new PackBuilder(network);
export { PackBuilder, Dapp, getIpfsJson, putIpfsJson, IpfsUtil, isCid };
