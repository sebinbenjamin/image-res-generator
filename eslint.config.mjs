import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  // Use the recommended ESLint configurations
  ...compat.extends('eslint:recommended'),

  // Additional configuration
  {
    languageOptions: {
      globals: {
        ...globals.commonjs,
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      ecmaVersion: 2021, // Updated to the latest stable version
      sourceType: 'module',
    },
    rules: {
      // Add or override additional ESLint rules here

      // Disallow the use of `var`
      'no-var': 'error',

      // Prefer `const` over `let` when variables are not reassigned
      'prefer-const': 'error',

      // Enforce consistent spacing inside array brackets
      'array-bracket-spacing': ['error', 'never'],

      // Enforce consistent spacing before function parentheses
      'space-before-function-paren': ['error', 'always'],

      // You can add more rules based on your project's needs
    },
  },

  // Add Prettier as a plugin to ESLint
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      // Add Prettier as a rule to automatically format code
      'prettier/prettier': 'error',
    },
  },

  // Import Prettier configurations to disable conflicting rules
  eslintConfigPrettier,
];
