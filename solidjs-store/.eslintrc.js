module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:solid/recommended"
  ],
  "plugins": ["solid", "import"],
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "linebreak-style": ["error", "unix"],
    "max-len": ["warn", { "code": 120 }],
    "indent": ["error", 2, { "VariableDeclarator": 3 }],
    "comma-dangle": ["error", "never"],
    "space-in-parens": ["error", "always"],
    "array-bracket-spacing": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "no-console": ["warn", { "allow": ["warn", "error", "info"] }]
  }
};
