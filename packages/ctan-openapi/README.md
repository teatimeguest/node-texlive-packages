# ctan-openapi

> OpenAPI descriptions for the CTAN API

[![npm][npm-badge]](https://www.npmjs.com/package/ctan-openapi)

[npm-badge]: https://img.shields.io/npm/v/ctan-openapi?logo=npm&logoColor=959da5&labelColor=2e353b&color=c40000

This package provides OpenAPI documents for the following APIs:

- `json-2.0`: <https://ctan.org/help/json/2.0>
- `json-1.3`: <https://ctan.org/help/json/1.3>
- `json-1.2`: <https://ctan.org/help/json/1.2>
- `json-1.1`: <https://ctan.org/help/json/1.1>
- `json-1.0`: <https://ctan.org/help/json/1.0>
- `search`: <https://ctan.org/help/json/searching>

Each document contains no external `$ref`'s for portability and
is available in three formats: JSON, YAML, and TypeScript.
There is also a `*.deref` variant with all internal `$ref`'s dereferenced.

Note that each endpoint accepts HTTP `POST` requests as well as `GET` requests,
but there is no fuctional difference,
so only `GET` operations are described in the documents.

## Installation

```console
$ npm install ctan-openapi
```

## Usage

### With JSON

```javascript
import api from 'ctan-openapi/json-2.0.json' with { type: 'json' };

console.log(api.info.version); // '2.0'
```

### With TypeScript

```typescript
import api from 'ctan-openapi/json-2.0.ts';

console.log(api.info.version satisfies '2.0');
```

### With YAML

```console
$ cat ./node_modules/ctan-openapi/dist/json-2.0.yml
openapi: 3.1.1
info:
  title: Querying the CTAN Database with JSON
...
```

## Notice

The OpenAPI documents provided by this package are unofficial,
created based on the [CTAN help pages](https://ctan.org/help).
All rights to the API are reserved by the CTAN team.

## License

[MIT License](https://github.com/teatimeguest/node-texlive-packages/blob/main/packages/ctan-openapi/LICENSE)
