import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier/recommended';
import importPlugin from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  ...ts.configs.strict,
  ...ts.configs.stylistic,
    eslintConfigPrettier,
    ...prettier,
    {
        languageOptions: {
            globals: {
                ...globals.commonjs,
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
              ecmaVersion: 2020,
              sourceType: "module"
          }
        },
        plugins: {
            prettier,
            importPlugin,
        },
        rules: {
            'no-debugger': 'off',
            'no-console': 'off',
            'class-methods-use-this': 'off',
        },
    },
];
