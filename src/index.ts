import { getIpfsJson, isCid, putIpfsJson } from './ipfs-util'

import { Dapp } from './dapp'
import { PackBuilder } from './builder'
import { need } from './util'

export const load = async (arg, ethers = undefined) => {
  if (typeof arg === 'string') {
    arg = (isCid(arg)) ? await getIpfsJson(arg) : require(arg)
  }
  need(typeof arg === 'object' && Object.keys(arg).length, 'Could not find a pack from provided source.')
  return await Dapp.loadFromPack(arg, ethers)
}
export const builder = (network) => new PackBuilder(network)

export { PackBuilder, Dapp, getIpfsJson, putIpfsJson }

export * from './types'
export * from './schema'