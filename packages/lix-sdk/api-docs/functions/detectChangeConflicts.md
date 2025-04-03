[**@lix-js/sdk**](../README.md)

***

[@lix-js/sdk](../README.md) / detectChangeConflicts

# Function: detectChangeConflicts()

> **detectChangeConflicts**(`args`): `Promise`\<[`DetectedConflict`](../type-aliases/DetectedConflict.md)[]\>

Defined in: [packages/lix-sdk/src/change-conflict/detect-change-conflicts.ts:21](https://github.com/opral/monorepo/blob/9e4a0ed87313931bc006fc9fc84146a53943e93c/packages/lix-sdk/src/change-conflict/detect-change-conflicts.ts#L21)

Detects conflicts in the given set of changes.

The caller is responsible for filtering out changes
that should not lead to conflicts before calling this function.

For example, detecting conflicts between two versiones should
only include changes that are different between the two versiones
when calling this function.

## Parameters

### args

#### changes

`object`[]

#### lix

`Pick`\<[`LixReadonly`](../type-aliases/LixReadonly.md), `"db"` \| `"plugin"`\>

## Returns

`Promise`\<[`DetectedConflict`](../type-aliases/DetectedConflict.md)[]\>

## Example

```ts
const detectedConflicts = await detectChangeConflicts({
       lix: lix,
       changes: diffingChages,
  });
```
