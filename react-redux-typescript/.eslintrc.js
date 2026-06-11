module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "no-debugger": "error",
    "eqeqeq": ["error", "always", { "null": "ignore" }],
    "no-fallthrough": "error",
    "radix": "error",
    "quotes": ["error", "double"],
    "semi": ["error", "always"]
  },
  env: {
    browser: true,
    node: true
  }
};
