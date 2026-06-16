module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },

  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-recommended"
  ],

  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },

  "plugins": ["vue"],

  "rules": {
    "strict": 0,
    "max-len": ["error", { "code": 120, "comments": 120 }],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    "semi": ["error", "always"],
    "no-console": ["error", { "allow": ["log", "warn", "error"] }],
    "one-var": ["error", "consecutive"],
    "object-curly-spacing": ["error", "always"],
    "comma-dangle": ["error", "never"],
    "indent": ["error", 2],
    "no-unused-vars": ["error", {
      "caughtErrors": "all",
      "args": "after-used",
      "ignoreRestSiblings": true
    }],
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "no-multiple-empty-lines": ["error", { "max": 2 }],
    "no-mixed-spaces-and-tabs": ["error"],
    "no-trailing-spaces": ["error"],
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "vue/html-indent": ["error", 2],
    "vue/max-attributes-per-line": ["error", { "singleline": 3, "multiline": 1 }],
    "vue/singleline-html-element-content-newline": "off",
    "vue/component-name-in-template-casing": ["error", "PascalCase"]
  }
};
