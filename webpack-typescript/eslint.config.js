const js = require( "@eslint/js" );
const tsPlugin = require( "@typescript-eslint/eslint-plugin" );
const tsParser = require( "@typescript-eslint/parser" );

module.exports = [
  js.configs.recommended,
  {
    files: [ "**/*.ts" ],
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: "module"
      },
      globals: {
        document: "readonly",
        console: "readonly",
        Map: "readonly",
        Promise: "readonly"
      }
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [ "error", { "argsIgnorePattern": "^_" } ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-debugger": "error",
      "eqeqeq": [ "error", "always", { "null": "ignore" } ],
      "quotes": [ "error", "double" ],
      "semi": [ "error", "always" ],
      "no-console": [ "warn", { "allow": [ "warn", "error", "info" ] } ]
    }
  }
];
