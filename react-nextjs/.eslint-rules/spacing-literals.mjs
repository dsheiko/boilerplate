export default {
  meta: {
    type: "layout",
    version: "2.1.0",
    docs: {
      description:
        "Enforce space inside parentheses, brackets, braces, and control statements, except for nested arrays/objects or function literals",
    },
    fixable: "whitespace",
    schema: [],
    messages: {
      missingSpaceAfter: "Missing space after '('.",
      missingSpaceBefore: "Missing space before ')'.",
      missingSpaceAfterBracket: "Missing space after '['.",
      missingSpaceBeforeBracket: "Missing space before ']'.",
      missingSpaceAfterBrace: "Missing space after '{'.",
      missingSpaceBeforeBrace: "Missing space before '}'.",
    },
  },

  create( context ) {
    const sourceCode = context.getSourceCode();

    /** --- Helpers --- */
    function checkParens( opening, first, last ) {
      if ( !opening || !first || !last ) {
        return;
      }

      if ( !sourceCode.isSpaceBetweenTokens( opening, first ) ) {
        context.report( {
          loc: opening.loc.end,
          messageId: "missingSpaceAfter",
          fix: fixer => fixer.insertTextAfter( opening, " " ),
        } );
      }
      if ( !sourceCode.isSpaceBetweenTokens( last, last.parentClosingParen ) ) {
        context.report( {
          loc: last.parentClosingParen.loc.start,
          messageId: "missingSpaceBefore",
          fix: fixer => fixer.insertTextBefore( last.parentClosingParen, " " ),
        } );
      }
    }

    function checkBrackets( opening, innerToken, closing ) {
      if ( !sourceCode.isSpaceBetweenTokens( opening, innerToken ) ) {
        context.report( {
          loc: opening.loc.end,
          messageId: "missingSpaceAfterBracket",
          fix: fixer => fixer.insertTextAfter( opening, " " ),
        } );
      }
      if ( !sourceCode.isSpaceBetweenTokens( innerToken, closing ) ) {
        context.report( {
          loc: closing.loc.start,
          messageId: "missingSpaceBeforeBracket",
          fix: fixer => fixer.insertTextBefore( closing, " " ),
        } );
      }
    }

    function checkBraces( opening, innerToken, closing ) {
      if ( !sourceCode.isSpaceBetweenTokens( opening, innerToken ) ) {
        context.report( {
          loc: opening.loc.end,
          messageId: "missingSpaceAfterBrace",
          fix: fixer => fixer.insertTextAfter( opening, " " ),
        } );
      }
      if ( !sourceCode.isSpaceBetweenTokens( innerToken, closing ) ) {
        context.report( {
          loc: closing.loc.start,
          messageId: "missingSpaceBeforeBrace",
          fix: fixer => fixer.insertTextBefore( closing, " " ),
        } );
      }
    }

    /** --- Reporters --- */
    function reportCallExpression( node ) {
      if ( !node.arguments.length ) {
        return;
      }

      const opening = sourceCode.getTokenBefore( node.arguments[ 0 ] );
      const closing = sourceCode.getLastToken( node );

      const tokensInside = sourceCode.getTokensBetween( opening, closing, { includeComments: false } );
      if ( !tokensInside.length ) {
        return;
      }

      const first = tokensInside[ 0 ];
      const last = tokensInside[ tokensInside.length - 1 ];
      last.parentClosingParen = closing;

      checkParens( opening, first, last );
    }

    function reportFunctionParams( fnNode ) {
      if ( !fnNode.params || !fnNode.params.length ) {
        return;
      }

      const firstParam = fnNode.params[ 0 ];
      const lastParam = fnNode.params[ fnNode.params.length - 1 ];

      const opening = sourceCode.getTokenBefore( firstParam );
      const closing = sourceCode.getTokenAfter( lastParam );

      const tokensInside = sourceCode.getTokensBetween( opening, closing, { includeComments: false } );
      if ( !tokensInside.length ) {
        return;
      }

      const first = tokensInside[ 0 ];
      const last = tokensInside[ tokensInside.length - 1 ];
      last.parentClosingParen = closing;

      // Skip if first param is array/object/function literal
      if (
        ![ "ArrayExpression", "ObjectExpression", "ArrowFunctionExpression", "FunctionExpression"].includes( firstParam.type )
      ) {
        checkParens( opening, first, last );
      }
    }

    function reportArrayExpression( node ) {
      if ( !node.elements.length ) {
        return;
      }

      const opening = sourceCode.getFirstToken( node );
      const closing = sourceCode.getLastToken( node );

      const hasNonLiteral = node.elements.some(
        el => el && ![ "ArrayExpression", "ObjectExpression"].includes( el.type )
      );

      if ( hasNonLiteral ) {
        const firstToken = sourceCode.getFirstToken( node.elements[ 0 ] );
        const lastToken = sourceCode.getLastToken( node.elements[ node.elements.length - 1 ] );
        checkBrackets( opening, firstToken, closing );
      }
    }

    function reportObjectExpression( node ) {
      if ( !node.properties.length ) {
        return;
      }

      const opening = sourceCode.getFirstToken( node );
      const closing = sourceCode.getLastToken( node );

      const hasNonLiteral = node.properties.some(
        prop =>
          prop.value &&
          ![ "ArrayExpression", "ObjectExpression"].includes( prop.value.type )
      );

      if ( hasNonLiteral ) {
        const firstToken = sourceCode.getFirstToken( node.properties[ 0 ] );
        const lastToken = sourceCode.getLastToken( node.properties[ node.properties.length - 1 ] );
        checkBraces( opening, firstToken, closing );
      }
    }

    /** --- Control statements --- */
    function reportControlStatement( testNode ) {
      const opening = sourceCode.getTokenBefore( testNode );
      const closing = sourceCode.getTokenAfter( testNode );

      const tokensInside = sourceCode.getTokensBetween( opening, closing, { includeComments: false } );
      if ( !tokensInside.length ) {
        return;
      }

      const first = tokensInside[ 0 ];
      const last = tokensInside[ tokensInside.length - 1 ];
      last.parentClosingParen = closing;

      checkParens( opening, first, last );
    }

    return {
      // Functions
      FunctionDeclaration: reportFunctionParams,
      FunctionExpression: reportFunctionParams,
      ArrowFunctionExpression: reportFunctionParams,
      MethodDefinition( node ) {
        reportFunctionParams( node.value );
      },
      Property( node ) {
        if ( node.method ) {
          reportFunctionParams( node.value );
        }
      },

      // Calls
      CallExpression: reportCallExpression,
      NewExpression: reportCallExpression,

      // Arrays / Objects
      ArrayExpression: reportArrayExpression,
      ObjectExpression: reportObjectExpression,

      // Member expressions
      MemberExpression( node ) {
        if ( !node.computed ) {
          return;
        }

        const property = node.property;
        const opening = sourceCode.getTokenBefore( property );
        const closing = sourceCode.getTokenAfter( property );

        if ( !opening || opening.value !== "[" ) {
          return;
        }
        if ( !closing || closing.value !== "]" ) {
          return;
        }

        checkBrackets( opening, property, closing );
      },

      // Control statements
      IfStatement( node ) {
        reportControlStatement( node.test );
      },
      WhileStatement( node ) {
        reportControlStatement( node.test );
      },
      ForStatement( node ) {
        // Use init and update tokens to get full parens range
        const opening = sourceCode.getTokenBefore( node.init ?? node );
        const closing = sourceCode.getTokenAfter( node.update ?? node );
        const tokensInside = sourceCode.getTokensBetween( opening, closing, { includeComments: false } );
        if ( !tokensInside.length ) {
          return;
        }
        const first = tokensInside[ 0 ];
        const last = tokensInside[ tokensInside.length - 1 ];
        last.parentClosingParen = closing;
        checkParens( opening, first, last );
      },
      SwitchStatement( node ) {
        reportControlStatement( node.discriminant );
      },
      CatchClause( node ) {
        if ( !node.param ) {
          return;
        }
        reportControlStatement( node.param );
      },
    };
  },
};
