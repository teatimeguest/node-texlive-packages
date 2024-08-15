import js from '@eslint/js';
import n from 'eslint-plugin-n';
import regexp from 'eslint-plugin-regexp';
import tsdoc from 'eslint-plugin-tsdoc';
import ts, { config as defineConfig } from 'typescript-eslint';

export const common = defineConfig(
  {
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  {
    extends: [js.configs.recommended],
    rules: {
      eqeqeq: 'error',
      'no-extra-boolean-cast': 'off',
      'no-implicit-coercion': 'error',
      'no-inner-declarations': 'off',
      'no-mixed-operators': 'error',
      'no-new-object': 'error',
      'no-new-wrappers': 'error',
      'no-useless-return': 'error',
      'prefer-const': 'error',
      'prefer-exponentiation-operator': 'error',
      'prefer-numeric-literals': 'error',
      'prefer-object-spread': 'error',
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': 'error',
      'require-unicode-regexp': 'error',
    },
  },
  {
    extends: ts.configs.recommendedTypeChecked,
    languageOptions: {
      parserOptions: {
        project: true,
        ecmaVersion: 'latest',
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: false,
        EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
      },
    },
    rules: {
      '@typescript-eslint/array-type': [
        'error',
        { default: 'array' },
      ],
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'as' },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },
  {
    extends: [n.configs['flat/recommended-module']],
    settings: {
      node: {
        version: '20',
      },
    },
    rules: {
      'n/no-missing-import': 'off',
      'n/no-path-concat': 'error',
    },
  },
  regexp.configs['flat/recommended'],
);

export const sources = defineConfig(
  {
    rules: {
      'func-style': [
        'error',
        'declaration',
        { allowArrowFunctions: true },
      ],
      'no-await-in-loop': 'error',
      'no-constructor-return': 'error',
      'no-eval': 'error',
      'no-underscore-dangle': 'error',
      'no-useless-rename': 'error',
      'one-var': ['error', 'never'],
    },
  },
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'no-public' },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'memberLike',
          modifiers: ['readonly'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'accessor',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/no-confusing-void-expression': 'error',
      '@typescript-eslint/no-implied-eval': 'error',
      '@typescript-eslint/no-invalid-this': 'error',
      '@typescript-eslint/no-loop-func': 'error',
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-shadow': [
        'error',
        { ignoreOnInitialization: true },
      ],
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true },
      ],
      '@typescript-eslint/non-nullable-type-assertion-style': 'error',
      '@typescript-eslint/only-throw-error': 'error',
      '@typescript-eslint/prefer-readonly-parameter-types': [
        'error',
        {
          ignoreInferredTypes: true,
          treatMethodsAsReadonly: true,
        },
      ],
      '@typescript-eslint/prefer-regexp-exec': 'error',
      '@typescript-eslint/prefer-return-this-type': 'error',
      '@typescript-eslint/require-array-sort-compare': [
        'error',
        { ignoreStringArrays: true },
      ],
      '@typescript-eslint/return-await': ['error', 'always'],
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowNullableObject: false,
          allowNumber: false,
          allowString: false,
        },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
    },
  },
  {
    rules: {
      'n/prefer-global/buffer': ['error', 'never'],
      'n/prefer-global/process': ['error', 'never'],
      'n/prefer-global/url': 'error',
      'n/prefer-global/url-search-params': 'error',
    },
  },
  {
    rules: {
      'regexp/no-super-linear-move': 'warn',
      'regexp/no-useless-flag': 'error',
      'regexp/prefer-escape-replacement-dollar-char': 'error',
      'regexp/require-unicode-sets-regexp': 'error',
    },
  },
  {
    plugins: { tsdoc },
    rules: {
      'tsdoc/syntax': 'error',
    },
  },
);

export const tests = defineConfig(
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  {
    rules: {
      'n/no-extraneous-import': [
        'error',
        {
          allowModules: ['vitest'],
        },
      ],
    },
  },
);

export default { common, sources, tests };
export { defineConfig };
