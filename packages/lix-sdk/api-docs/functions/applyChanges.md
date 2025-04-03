[**@lix-js/sdk**](../README.md)

***

[@lix-js/sdk](../README.md) / applyChanges

# Function: applyChanges()

> **applyChanges**(`args`): `Promise`\<`void`\>

Defined in: [packages/lix-sdk/src/change/apply-changes.ts:24](https://github.com/opral/monorepo/blob/c1910f74abb6a0c11c72843e559a3503d21f8bdb/packages/lix-sdk/src/change/apply-changes.ts#L24)

Applies the given changes to the lix.

Calls the `applyChanges` method of the corresponding plugin for each change.
**Carefull**, the changes are not validated before applying them. It is up to
the caller to ensure that the changes are valid. Usually, only the leaf changes
of a given version should be applied.

## Parameters

### args

#### changes

`object`[]

#### lix

`Pick`\<[`Lix`](../type-aliases/Lix.md), `"db"` \| `"plugin"`\>

## Returns

`Promise`\<`void`\>

## Example

```ts
  const changes = await lix.db.selectFrom("change")
     .where(changeIsLeafInVersion(currentVersion))
     .selectAll()
     .execute();

  await applyChanges({ lix, changes });
  ```
