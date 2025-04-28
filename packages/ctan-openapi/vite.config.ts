import { readFile } from 'node:fs/promises';
import * as path from 'node:path';

import Swagger from '@apidevtools/swagger-parser';
import { createFromBuffer } from '@dprint/formatter';
import { getPath } from '@dprint/typescript';
// @ts-expect-error
import { run as openapiFormat } from 'openapi-format/bin/cli.js';
import { type Plugin, defineConfig } from 'vite';
import {
  type Target as StaticCopyTarget,
  type ViteStaticCopyOptions as StaticCopyOptions,
  viteStaticCopy as copy,
} from 'vite-plugin-static-copy';
import YAML from 'yaml';

const dprint = createFromBuffer(await readFile(getPath()));
dprint.setConfig({
  lineWidth: 65535,
}, {
  quoteStyle: 'preferSingle',
  quoteProps: 'asNeeded',
});

export default defineConfig({
  build: {
    lib: {
      entry: ['index.js'],
      formats: ['es'],
    },
  },
  plugins: [
    overlay('overlays/json-2.0.yml', 'openapi/json-{version}.yml'),
    overlay('overlays/json-1.3.yml', 'dist/json-2.0.yml'),
    overlay('overlays/json-1.2.yml', 'dist/json-1.3.yml'),
    overlay('overlays/json-1.1.yml', 'dist/json-1.2.yml'),
    overlay('overlays/json-1.0.yml', 'dist/json-1.1.yml'),
    overlay('overlays/json-2.0.yml', 'openapi/search.yml', {
      rename: 'search.yml',
    }),
    generate({
      src: 'dist/*.yml',
      async transform(content: string, document: string) {
        using _ = silence();
        return await openapiFormat(document, {
          filterSet: {
            textReplace: [
              {
                searchFor: '{version}',
                replaceWith: (YAML
                  .parse(content) as Swagger['api'])
                  .info
                  .version,
              },
            ],
          },
        });
      },
    }),
    generate({
      src: 'dist/*.yml',
      rename: (filename, ext) => `${filename}.deref.${ext}`,
      async transform(content: string) {
        const api = YAML.parse(content);
        const deref = await Swagger.dereference(api, {
          dereference: { circular: true },
        });
        return YAML.stringify(deref, undefined, {
          aliasDuplicateObjects: false,
          singleQuote: true,
        });
      },
    }),
    generate({
      src: 'dist/*.yml',
      rename: (filename) => `${filename}.json`,
      transform: (content: string) =>
        JSON.stringify(YAML.parse(content), undefined, 2),
    }),
    copy({
      targets: [
        {
          src: 'dist/*.json',
          dest: '',
          rename: (filename) => `${filename}.ts`,
          transform: (content: string) =>
            dprint.formatText({
              filePath: 'openapi.ts',
              fileText: `export default ${content} as const;`,
            }),
        },
      ],
    }),
  ],
});

type OverlayOptions = Omit<GenerateOptions, 'src' | 'dest'>;

function overlay(
  overlayFile: string,
  document: string,
  options?: Readonly<OverlayOptions>,
): Plugin[] {
  return generate({
    src: document,
    rename: path.basename(overlayFile),
    async transform(content: string, document: string): Promise<string> {
      using _ = silence();
      return await openapiFormat(document, { format: 'yaml', overlayFile });
    },
    ...options,
  });
}

type GenerateOptions =
  & Omit<StaticCopyTarget, 'dereference' | 'dest'>
  & Partial<Pick<StaticCopyTarget, 'dest'>>;

function generate(options: Readonly<GenerateOptions>): Plugin[] {
  return copy({
    targets: [{ dest: '', ...options }],
    hook: 'generateBundle',
  });
}

function silence(): Disposable {
  console.log = function() {};
  return {
    [Symbol.dispose]() {
      console.log = console.Console.prototype.log;
    },
  };
}
