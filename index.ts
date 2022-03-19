/**
 * @package dpack
 * @description A package for deploying smart contracts.
 * @author nikolai mushegia
 * @see https://github.com/dapphub/dpack
 */

import { PackBuilder } from './src/builder'
import { Dapp } from './src/dapp'
import { getIpfsJson, putIpfsJson, isCid } from './src/ipfs-util'
import { need } from './src/util'
import * as IpfsUtil from './src/ipfs-util'

export const load = async (arg: string, _ethers = undefined, _signer = undefined) => {
  if (typeof arg === 'string') {
    arg = (isCid(arg)) ? await getIpfsJson(arg) : require(arg)
  }
  need(typeof arg === 'object' && Object.keys(arg).length, 'Could not find a pack from provided source.')
  return await Dapp.loadFromPack(arg, _ethers, _signer)
}

export const builder = (network: string) => new PackBuilder(network)

export { PackBuilder, Dapp, getIpfsJson, putIpfsJson, IpfsUtil, isCid }
