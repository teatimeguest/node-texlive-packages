# node-texlive-packages

> TeX Live-related packages for Node.js

[![CI][ci-badge]][ci]
[![Codecov][codecov-badge]][codecov]

[ci-badge]: https://github.com/teatimeguest/node-texlive-packages/actions/workflows/ci.yml/badge.svg
[ci]: https://github.com/teatimeguest/node-texlive-packages/actions/workflows/ci.yml
[codecov-badge]: https://codecov.io/gh/teatimeguest/node-texlive-packages/graph/badge.svg?token=MS3A3ODVUX
[codecov]: https://codecov.io/gh/teatimeguest/node-texlive-packages

## Packages

| Name              |                    Version                     | Description                                                                    |
| ----------------- | :--------------------------------------------: | ------------------------------------------------------------------------------ |
| [depends-txt]     | [![npm][depends-txt-version]][depends-txt-npm] | A parser module for TeX Live's `DEPENDS.txt` file format                       |
| [texlive-mirrors] |               :heavy_minus_sign:               | JSON Schema file and TypeScript type definitions for [zauguin/texlive-mirrors] |

[depends-txt-npm]: https://www.npmjs.com/package/depends-txt
[depends-txt-version]: https://img.shields.io/npm/v/depends-txt?logo=npm&logoColor=959da5&labelColor=2e353b&color=c40000
[depends-txt]: ./packages/depends-txt
[texlive-mirrors]: ./packages/texlive-mirrors
[zauguin/texlive-mirrors]: https://github.com/zauguin/texlive-mirrors

## Small Utilities

| Name                                 |                 Version                  | Description                             |
| ------------------------------------ | :--------------------------------------: | --------------------------------------- |
| [@teatimeguest/peekable]             | [![npm][peekable-version]][peekable-npm] | Make an iterator peekable               |
| [@teatimeguest/vitest-plugin-update] |            :heavy_minus_sign:            | Override config when updating snapshots |

[@teatimeguest/peekable]: ./packages/peekable
[@teatimeguest/vitest-plugin-update]: ./packages/vitest-plugin-update
[peekable-npm]: https://www.npmjs.com/package/@teatimeguest/peekable
[peekable-version]: https://img.shields.io/npm/v/@teatimeguest/peekable?logo=npm&logoColor=959da5&labelColor=2e353b&color=c40000
