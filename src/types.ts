/**
 * @package dpack
 * @tsince v0.0.1
 * {@link https://github.com/dapphub/dpack}
 */

/**
 * base64str
 *
 * @export
 * @typedef { string } base64str
 */

export type base64str = string

/**
 * Bundle
 *
 * @export
 * @interface Bundle
 * @typedef { { [key: string]: base64str } } Bundle
 */
export interface Bundle {[cid: string]: any}

/**
 * IpfsLink
 * @summary a link to a DPack artifact
 *
 * @export
 * @interface IpfsLink
 * @typedef { string }
 */
export interface IpfsLink {
  '/': string
}

/**
 * TypeInfo
 * @summary a type that describes a type in the IPLD schema.
 *
 * @export
 * @interface TypeInfo
 * @typedef {TypeInfo}
 */
export interface TypeInfo {
  typename: string
  artifact: IpfsLink
}


/**
 * ObjectInfo
 * @summary a type that describes an object in the IPLD schema.
 *
 * @export
 * @interface ObjectInfo
 * @typedef {ObjectInfo}
 */
export interface ObjectInfo {
  objectname: string
  address: string
  typename: string
  artifact: IpfsLink
}

/**
 * DPack
 * @summary the primrary interface that describes a DPack in the IPLD schema.
 *
 * @export
 * @interface DPack
 * @typedef {DPack}
 */
export interface DPack {
  format: string
  network: string
  types: {[typename: string]: TypeInfo}
  objects: {[objectname: string]: ObjectInfo}
}

export interface Artifact {
}

/**
 * ResolvedPack
 * @summary a DPack with the resolved artifacts.
 *
 * @export
 * @interface ResolvedPack
 * @typedef {ResolvedPack}
 * @extends {DPack}
 */
export interface ResolvedPack extends DPack {
  _bundle: Bundle
  _resolved: boolean
}
