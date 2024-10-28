# @teatimeguest/vitest-plugin-update

> Override config when updating snapshots

## Usage

```typescript
import pluginUpdate from '@teatimeguest/vitest-plugin-update';

export default {
  plugins: [pluginUpdate(/* Override config goes here */)],
};
```

By default, `{ test: { env: { UPDATE: '1' } } }` will be applied,
so you can detect if snapshots are being updated in a test file as follows:

```typescript
test.runIf(import.meta.env['UPDATE'])(/* ... */);
```

## License

[MIT License](./LICENSE)
