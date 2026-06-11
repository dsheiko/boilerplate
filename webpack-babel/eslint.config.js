const js = require( "@eslint/js" );
const babelParser = require( "@babel/eslint-parser" );
const importPlugin = require( "eslint-plugin-import" );

module.exports = [
  js.configs.recommended,
  {
    plugins: {
      import: importPlugin
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: true
      },
      ecmaVersion: 2024,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        Promise: "readonly",
        fetch: "readonly"
      }
    },
    rules: {
      "max-len": [ "error", { "code": 120, "comments": 120 } ],
      "import/prefer-default-export": "off",
      "linebreak-style": [ "error", "unix" ],
      "quotes": [ "error", "double", { "allowTemplateLiterals": true } ],
      "semi": [ "error", "always" ],
      "no-console": [ "warn", { "allow": [ "warn", "error", "info" ] } ],
      "one-var": [ "error", "consecutive" ],
      "space-in-parens": [ "warn", "always", { "exceptions": [ "empty", "{}", "[]" ] } ],
      "array-bracket-spacing": [ "error", "always", {
        "objectsInArrays": false,
        "arraysInArrays": false
      } ],
      "object-curly-spacing": [ "error", "always", {
        "arraysInObjects": false,
        "objectsInObjects": false
      } ],
      "computed-property-spacing": [ "error", "always" ],
      "comma-dangle": [ "error", "never" ],
      "indent": [ "error", 2, {
        "VariableDeclarator": { "var": 2, "let": 2, "const": 3 },
        "SwitchCase": 1
      } ],
      "no-unused-vars": [ "error", {
        "caughtErrors": "none",
        "args": "after-used",
        "ignoreRestSiblings": true
      } ],
      "brace-style": [ "error", "1tbs", { "allowSingleLine": true } ]
    }
  }
];
