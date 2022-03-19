import { need } from './util'
import { getIpfsJson } from './ipfs-util'
import default_ethers from 'ethers'

const debug = require('debug')('dpack')

export class Dapp {
  _ethers: any
  _pack: any
  _objects: any
  _types: any
  weth: any

  private constructor () {}
  static async loadFromPack (pack: any, _ethers: any = undefined, _signer: any = undefined): Promise<Dapp> {
    const dapp = new Dapp()

    dapp._objects = {}
    dapp._types = {}
    dapp._pack = pack
    dapp._ethers = _ethers ?? default_ethers
    const signer = _signer ?? dapp._ethers.Wallet.createRandom()

    for (const key of Object.keys(dapp._pack.objects)) {
      const obj = dapp._pack.objects[key]
      const cid = obj.artifact['/']
      const artifact = await getIpfsJson(cid)
      const abi = artifact.abi
      const addr = obj.address
      const instance = new dapp._ethers.Contract(addr, abi, signer)
      instance.objectname = obj.objectname
      // instance.address already exists
      instance.typename = obj.typename
      instance.artifact = obj.artifact
      dapp._objects[key] = instance
      // type key = /*unresolved*/ any
      need(dapp as unknown as [typeof key] === undefined, 'Panic: name collision on dapp object.')

      debug('#[debug] dapp._objects[key] = instance')
      dapp as unknown as [typeof key]; instance
    }

    for (const key of Object.keys(dapp._pack.types)) {
      const typ = dapp._pack.types[key]
      const cid = typ.artifact['/']
      const artifact = await getIpfsJson(cid)
      const abi = artifact.abi
      const code = artifact.bytecode
      let deployer = new dapp._ethers.ContractFactory(abi, code)
      deployer = deployer.connect(signer)
      deployer.typename = typ.typename
      deployer.artifact = typ.artifact
      dapp._types[key] = deployer
    }

    return dapp
  }
}
