module.exports = {
    "extends": [ 
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "env": {
        "browser": true,
        "commonjs": true,
        "node": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 2019,
        "ecmaFeatures": {
          "jsx": true,
          legacyDecorators: true,
        }
    },
    "settings": {
      "react": {
        "createClass": "createReactClass", // Regex for Component Factory to use,
                                           // default to "createReactClass"
        "pragma": "React",  // Pragma to use, default to "React"
        "fragment": "Fragment",  // Fragment to use (may be a property of <pragma>), default to "Fragment"
        "version": "detect"
      }
    },
    "plugins": [
      "react"
    ],
    "rules": {
      // disallow strict mode directives
      // https://eslint.org/docs/rules/strict
      "strict": 0,

      "prettier/prettier": 0,

      "import/no-unresolved": "off",

      "standard/no-callback-literal": "off",

      "prefer-promise-reject-errors": "off",

      "no-useless-escape": "off",
      
      // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md
      "react/display-name": "off",
      // enforce a maximum line length
      // https://eslint.org/docs/rules/max-len
      "max-len": [ "error", {"code": 120, "comments": 120} ],
      // enforce consistent linebreak style
      "linebreak-style": [
        "error",
        "unix"
      ],
      // requires the use of double quotes wherever possible, backtick are also allowed though
      "quotes": [
        "error",
        "double",
        {"allowTemplateLiterals": true}
      ],
      // require or disallow semicolons instead of ASI
      "semi": [
        "error",
        "always"
      ],
      // disallow the use of console
      "no-console": [ "error", {"allow": [ "warn", "error", "info" ]} ],
      // allows multiple variable declarations per scope
      // but requires consecutive variable declarations to be combined into a single declaration
        "one-var": [ "error", "consecutive" ],
      // Disallow or enforce spaces inside of parentheses
       "space-in-parens": [ 1, "always", {"exceptions": [ "empty", "{}", "[]" ]} ],
      // Disallow or enforce spaces inside of brackets
      "array-bracket-spacing": [ "error", "always", {
          "objectsInArrays": false,
          "arraysInArrays": false
  
        }],
      // enforce consistent spacing inside braces
      "object-curly-spacing": [ "error", "always", {
          "arraysInObjects": false,
          "objectsInObjects": false
        }],
      // Disallow or enforce spaces inside of computed properties
      "computed-property-spacing": [ "error", "always" ],
     
    
      // Disallow Unused Variables
      "no-unused-vars": [ "error", {
          "caughtErrors": "none",
          "args": "after-used",
          "ignoreRestSiblings": true
        }],
        
         // require "1tbs" brace style (https://eslint.org/docs/rules/brace-style)
      "brace-style": [ "error", "1tbs", { "allowSingleLine": true } ],
      // no more than two sequent empty lines
      "no-multiple-empty-lines": ["error", { "max": 2 }],
      // do not mix spaces and tabs for indentation
      "no-mixed-spaces-and-tabs": ["error"],
      // no trailing spaces llowed
      "no-trailing-spaces":  ["error"],
      // keyword words shall be surrounded by spaces
      "keyword-spacing": ["error", { "before": true, "after": true }]
    }
  };