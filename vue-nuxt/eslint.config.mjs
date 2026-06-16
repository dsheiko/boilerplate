import vuePlugin from "eslint-plugin-vue";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import vueParser from "vue-eslint-parser";
import spacingLiterals from "./.eslint-rules/spacing-literals.mjs";
import requireBlockIf from "./.eslint-rules/require-block-if.mjs";

const sharedRules = {
  "custom/space-in-function-parens": "error",
  "custom/require-block-if": "error",
  "curly": [ "error", "all" ],
  "quotes": [ "error", "double", { avoidEscape: true, allowTemplateLiterals: true } ],
  "comma-spacing": [ "error", { "before": false, "after": true } ],
  "no-console": [ "warn", { allow: [ "warn", "error", "info" ] } ],
};

const customPlugin = {
  rules: {
    "space-in-function-parens": spacingLiterals,
    "require-block-if": requireBlockIf,
  },
};

export default [
  {
    ignores: [
      "**/*.stories.*",
      "**/*.test.*",
      ".nuxt/**",
      ".output/**",
    ],
  },

  {
    files: [ "**/*.vue" ],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      vue: vuePlugin,
      "@typescript-eslint": tsPlugin,
      custom: customPlugin,
    },
    rules: {
      ...vuePlugin.configs[ "vue3-recommended" ].rules,
      ...sharedRules,
      "vue/multi-word-component-names": "off",
      "vue/html-self-closing": [ "error", { html: { void: "always", normal: "never" } } ],
    },
  },

  {
    files: [ "**/*.ts" ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      custom: customPlugin,
    },
    rules: {
      ...sharedRules,
    },
  },
];
