import * as babelParser from "@babel/eslint-parser";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import spacingLiterals from "./.eslint-rules/spacing-literals.mjs";
import requireBlockIf from "./.eslint-rules/require-block-if.mjs";

export default [
  {
    ignores: [
      "**/*.stories.*",
      "**/*.test.*",
    ],
  },

  {
    plugins: {
      "@next/next": nextPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": tsPlugin,
      custom: {
        rules: {
          "space-in-function-parens": spacingLiterals,
          "require-block-if": requireBlockIf,
        },
      },
    },

    rules: {
      // enforce consistent spacing inside function parentheses
      "custom/space-in-function-parens": "error",
      // require block statements for single-line if statements
      "custom/require-block-if": "error",

      // recommended Next.js rules
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs[ "core-web-vitals" ].rules,

      // require curly braces for all control statements
      "curly": ["error", "all"],

      // enforce double quotes in strings, allow template literals
      "quotes": ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],

      // enforce comma spacing: no space before, one space after
      "comma-spacing": ["error", { "before": false, "after": true }],

      // warn on console.log but allow console.warn/error/info
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],

      // enforce spacing before self-closing tag in JSX
      "react/jsx-tag-spacing": ["error", {
        "beforeSelfClosing": "always"
      }],

      // allow unescaped entities like '>' or '"'
      "react/no-unescaped-entities": "off",

      // allow anonymous default exports
      "import/no-anonymous-default-export": "off",

      // turn off exhaustive-deps warning for React hooks
      "react-hooks/exhaustive-deps": "off",

      // React hook used in a file that is not a client component
      "react-hooks/rules-of-hooks": "error",

      // enforce spaces inside JSX curly braces: { foo } instead of {foo}
      "react/jsx-curly-spacing": ["error", {
        "when": "always",
        "children": true,
        "spacing": { "objectLiterals": "always" }
      }],
    }
  },

  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["next/babel"],
        },
      },
    }
  },
];
