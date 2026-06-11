import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-debugger": "error",
      "eqeqeq": ["error", "always", { null: "ignore" }],
      "no-fallthrough": "error",
      "radix": "error",
      "quotes": ["error", "double"],
      "semi": ["error", "always"]
    }
  }
);
