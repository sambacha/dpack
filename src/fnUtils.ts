import { keccak256, randomHex } from 'web3-utils'

import { CID } from 'multiformats/cid'
import { CodecCode } from 'multicodec'
import { create } from 'multiformats/hashes/digest'

/**
 * @type {*}
 */
const toBuffer = require('typedarray-to-buffer')

/**
 * @const version
 */
const version = 1
/**
 * @const keccakMultihashCode
 */
const keccakMultihashCode = 0x1b

/**
 * @export
 * @param {CodecCode} codec
 * @param {Buffer} rawhash
 * @returns {CID}
 */
export function cidFromHash (codec: CodecCode, rawhash: Buffer): CID {
  const multihash = create(keccakMultihashCode, rawhash)
  return CID.create(version, codec, multihash)
}

/**
 * @export
 * @param {CID} cid
 * @returns {Buffer}
 */
export function hashFromCID (cid: CID): Buffer {
  return toBuffer(cid.multihash.digest)
}

/**
 * @export
 * @returns {Buffer}
 */
export function randomHash (): Buffer {
  const rnHex = randomHex(32)
  const randomHash = keccak256(rnHex)
  return Buffer.from(randomHash, 'hex')
}

/**
 * @export
 * @param {Buffer} buf
 * @returns {bigint}
 */
export function bufferToBigInt (buf: Buffer): bigint {
  const hex: string[] = []
  const u8 = Uint8Array.from(buf)

  u8.forEach(function (i) {
    let h = i.toString(16)
    if (h.length % 2) { h = '0' + h }
    hex.push(h)
  })

  return BigInt('0x' + hex.join(''))
}

/**
 * @export
 * @param {Uint8Array} u8
 * @returns {bigint}
 */
export function arrayToBigInt (u8: Uint8Array): bigint {
  const hex: string[] = []

  u8.forEach(function (i) {
    let h = i.toString(16)
    if (h.length % 2) { h = '0' + h }
    hex.push(h)
  })

  return BigInt('0x' + hex.join(''))
}

/**
 * @export
 * @param {Buffer} buf
 * @returns {number}
 */
export function bufferToNumber (buf: Buffer): number {
  const hex: string[] = []
  const u8 = Uint8Array.from(buf)

  u8.forEach(function (i) {
    let h = i.toString(16)
    if (h.length % 2) { h = '0' + h }
    hex.push(h)
  })

  return Number('0x' + hex.join(''))
}

/**
 * @export
 * @param {Uint8Array} u8
 * @returns {number}
 */
export function arrayToNumber (u8: Uint8Array): number {
  const hex: string[] = []

  u8.forEach(function (i) {
    let h = i.toString(16)
    if (h.length % 2) { h = '0' + h }
    hex.push(h)
  })

  return Number('0x' + hex.join(''))
}

/**
 * @export
 * @param {*} node
 * @param {string[]} properties
 * @returns {boolean}
 */
export function hasOnlyProperties (node: any, properties: string[]): boolean {
  return !Object.keys(node).some((p) => !properties.includes(p))
}