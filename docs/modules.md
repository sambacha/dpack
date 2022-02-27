[@etherpacks/dpack](README.md) / Exports

# @etherpacks/dpack

## Table of contents

### Classes

- [Dapp](classes/Dapp.md)
- [PackBuilder](classes/PackBuilder.md)

### Functions

- [builder](modules.md#builder)
- [getIpfsJson](modules.md#getipfsjson)
- [load](modules.md#load)
- [putIpfsJson](modules.md#putipfsjson)

## Functions

### builder

▸ **builder**(`network`): [`PackBuilder`](classes/PackBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `network` | `any` |

#### Returns

[`PackBuilder`](classes/PackBuilder.md)

#### Defined in

[index.ts:13](https://github.com/dapphub/dpack/blob/526b80f/index.ts#L13)

___

### getIpfsJson

▸ **getIpfsJson**(`cid`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cid` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/ipfs-util.ts:10](https://github.com/dapphub/dpack/blob/526b80f/src/ipfs-util.ts#L10)

___

### load

▸ **load**(`arg`, `ethers?`): `Promise`<[`Dapp`](classes/Dapp.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `arg` | `any` | `undefined` |
| `ethers` | `any` | `undefined` |

#### Returns

`Promise`<[`Dapp`](classes/Dapp.md)\>

#### Defined in

[index.ts:6](https://github.com/dapphub/dpack/blob/526b80f/index.ts#L6)

___

### putIpfsJson

▸ **putIpfsJson**(`obj`, `pin?`): `Promise`<`string`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `obj` | `any` | `undefined` |
| `pin` | `boolean` | `false` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/ipfs-util.ts:25](https://github.com/dapphub/dpack/blob/526b80f/src/ipfs-util.ts#L25)
