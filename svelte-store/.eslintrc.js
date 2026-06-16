module.exports = {
  "env": {
    "browser": true,
    "es2020": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:svelte/recommended"
  ],
  "plugins": ["import"],
  "overrides": [
    {
      "files": ["*.svelte"],
      "parser": "svelte-eslint-parser"
    }
  ],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "linebreak-style": ["error", "unix"],
    "max-len": ["warn", { "code": 120 }],
    "indent": ["error", 2, { "VariableDeclarator": 3 }],
    "comma-dangle": ["error", "never"],
    "no-console": ["warn", { "allow": ["warn", "error", "info"] }]
  }
};
