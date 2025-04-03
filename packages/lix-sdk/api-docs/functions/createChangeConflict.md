[**@lix-js/sdk**](../README.md)

***

[@lix-js/sdk](../README.md) / createChangeConflict

# Function: createChangeConflict()

> **createChangeConflict**(`args`): `Promise`\<\{ `change_set_id`: `string`; `id`: `string`; `key`: `string`; \}\>

Defined in: [packages/lix-sdk/src/change-conflict/create-change-conflict.ts:10](https://github.com/opral/monorepo/blob/c1910f74abb6a0c11c72843e559a3503d21f8bdb/packages/lix-sdk/src/change-conflict/create-change-conflict.ts#L10)

Creates a new change conflict with the given conflicting changes.

## Parameters

### args

#### conflictingChangeIds

`Set`\<`string`\>

#### key

`string`

The key of the change conflict.

#### lix

`Pick`\<[`Lix`](../type-aliases/Lix.md), `"db"`\>

#### version

`Pick`\<\{ `id`: `string`; `name`: `string`; \}, `"id"`\>

## Returns

`Promise`\<\{ `change_set_id`: `string`; `id`: `string`; `key`: `string`; \}\>
