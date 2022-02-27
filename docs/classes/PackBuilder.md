[@etherpacks/dpack](../README.md) / [Exports](../modules.md) / PackBuilder

# Class: PackBuilder

## Table of contents

### Constructors

- [constructor](PackBuilder.md#constructor)

### Properties

- [\_pack](PackBuilder.md#_pack)

### Methods

- [addObject](PackBuilder.md#addobject)
- [addType](PackBuilder.md#addtype)
- [build](PackBuilder.md#build)
- [merge](PackBuilder.md#merge)
- [packObject](PackBuilder.md#packobject)
- [packType](PackBuilder.md#packtype)

## Constructors

### constructor

• **new PackBuilder**(`network`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `network` | `string` |

#### Defined in

[src/builder.ts:16](https://github.com/dapphub/dpack/blob/526b80f/src/builder.ts#L16)

## Properties

### \_pack

• **\_pack**: `DPack`

#### Defined in

[src/builder.ts:15](https://github.com/dapphub/dpack/blob/526b80f/src/builder.ts#L15)

## Methods

### addObject

▸ **addObject**(`o`): [`PackBuilder`](PackBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `any` |

#### Returns

[`PackBuilder`](PackBuilder.md)

#### Defined in

[src/builder.ts:54](https://github.com/dapphub/dpack/blob/526b80f/src/builder.ts#L54)

___

### addType

▸ **addType**(`t`): [`PackBuilder`](PackBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `any` |

#### Returns

[`PackBuilder`](PackBuilder.md)

#### Defined in

[src/builder.ts:33](https://github.com/dapphub/dpack/blob/526b80f/src/builder.ts#L33)

___

### build

▸ **build**(): `any`

#### Returns

`any`

#### Defined in

[src/builder.ts:64](https://github.com/dapphub/dpack/blob/526b80f/src/builder.ts#L64)

___

### merge

▸ **merge**(...`packs`): [`PackBuilder`](PackBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...packs` | `DPack`[] |

#### Returns

[`PackBuilder`](PackBuilder.md)

#### Defined in

[src/builder.ts:59](https://github.com/dapphub/dpack/blob/526b80f/src/builder.ts#L59)

___

### packObject

▸ **packObject**(`o`, `alsoPackType?`): `Promise`<[`PackBuilder`](PackBuilder.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `o` | `any` | `undefined` |
| `alsoPackType` | `boolean` | `true` |

#### Returns

`Promise`<[`PackBuilder`](PackBuilder.md)\>

#### Defined in

[src/builder.ts:38](https://github.com/dapphub/dpack/blob/526b80f/src/builder.ts#L38)

___

### packType

▸ **packType**(`t`): `Promise`<[`PackBuilder`](PackBuilder.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `any` |

#### Returns

`Promise`<[`PackBuilder`](PackBuilder.md)\>

#### Defined in

[src/builder.ts:25](https://github.com/dapphub/dpack/blob/526b80f/src/builder.ts#L25)
