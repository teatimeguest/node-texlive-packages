#!/usr/bin/env bash
set -eu

function process {
  local -r api="$1"

  openapi-typescript \
    "./node_modules/ctan-openapi/dist/${api}.yml" \
    -o "./dist/openapi/${api}.d.ts"

  node -p - -- "${api}" <<'EOF' >|"./lib/${api}.ts"
  const [,,, api] = process.argv;
  const baseUrl = require(`ctan-openapi/${api}.json`).servers[0].url;
  require('nunjucks')
    .configure({ autoescape: false, throwOnUndefined: true })
    .render("./src/index.ts.j2", { api, baseUrl });
EOF
}

rm -rf dist lib
mkdir -p lib

(
  export -f process
  # shellcheck disable=SC2016
  xargs -P0 -I{} bash -c 'process "$0"' {} <<'EOF'
  json-2.0
  json-1.3
  json-1.2
  json-1.1
  json-1.0
  search
EOF
)

esbuild \
  --bundle \
  --external:openapi-fetch \
  --format=esm \
  --outdir=dist \
  --platform=node \
  --sourcemap \
  --target=esnext \
  lib/*.ts

tsc -p tsconfig.build.json
