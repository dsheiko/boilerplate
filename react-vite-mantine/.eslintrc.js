module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "plugins": [
    "react",
    "jsx-a11y"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/anchor-is-valid": [ "error", {
        "aspects": [ "invalidHref" ]
      } ],
    "jsx-a11y/click-events-have-key-events": "off",
    "react/display-name": "off",
    "max-len": [ "error", {"code": 120, "comments": 120} ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double",
      {"allowTemplateLiterals": true}
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": [ "error", {"allow": [ "log", "warn", "error" ]} ],
    "one-var": [ "error", "consecutive" ],
    "space-in-parens": [ 1, "always", {"exceptions": [ "empty", "{}", "[]" ]} ],
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
    "indent": [ "error", 2, {"VariableDeclarator": {"var": 2, "let": 2, "const": 3}} ],
    "no-unused-vars": [ "error", {
        "caughtErrors": "all",
        "args": "after-used",
        "ignoreRestSiblings": true
      } ],
    "brace-style": [ "error", "1tbs", { "allowSingleLine": true } ],
    "no-multiple-empty-lines": ["error", { "max": 2 }],
    "no-mixed-spaces-and-tabs": ["error"],
    "no-trailing-spaces": ["error"],
    "keyword-spacing": ["error", { "before": true, "after": true }]
  }
};
