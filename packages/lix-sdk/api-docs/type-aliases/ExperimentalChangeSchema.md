[**@lix-js/sdk**](../README.md)

***

[@lix-js/sdk](../README.md) / ExperimentalChangeSchema

# Type Alias: ExperimentalChangeSchema

> **ExperimentalChangeSchema** = \{ `key`: `string`; `schema`: `JSONSchema`; `type`: `"json"`; \} \| \{ `key`: `string`; `schema`: `undefined`; `type`: `"blob"`; \}

Defined in: [packages/lix-sdk/src/change-schema/types.ts:43](https://github.com/opral/monorepo/blob/c1910f74abb6a0c11c72843e559a3503d21f8bdb/packages/lix-sdk/src/change-schema/types.ts#L43)

The schema of a detected change.

The key is used to identify the schema. It is highly
recommended to use a unique key for each schema and
include a version number in the key when breaking
changes are made.

- use `as const` to narrow the types
- use `... satisfies ChangeSchema` to get autocomplete

## Example

```ts
const FooV1 = {
     key: "csv-plugin-foo-v1",
     type: "json",
     schema: jsonSchema,
  } as const satisfies ChangeSchema;
```
