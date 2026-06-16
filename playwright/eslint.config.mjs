import * as babelParser from "@babel/eslint-parser";
import spacingLiterals from "./.eslint-rules/spacing-literals.mjs";
import requireBlockIf from "./.eslint-rules/require-block-if.mjs";

export default [
  {
    ignores: [],
  },

  {
    plugins: {
      custom: {
        rules: {
          "space-in-function-parens": spacingLiterals,
          "require-block-if": requireBlockIf,
        },
      },
    },

    rules: {
      "custom/space-in-function-parens": "error",
      "custom/require-block-if": "error",

      "curly": ["error", "all"],
      "quotes": ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
      "comma-spacing": ["error", { before: false, after: true }],
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    },
  },

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: "latest",
        sourceType: "module",
        babelOptions: {
          presets: ["@babel/preset-env"],
        },
      },
    },
  },
];
