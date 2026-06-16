export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce block statements for single-line if statements",
    },
    fixable: "code",
    schema: [],
    messages: {
      requireBlock: "Single-line if statement should use a block.",
    },
  },

  create( context ) {
    const sourceCode = context.getSourceCode();

    return {
      IfStatement( node ) {
        if ( node.consequent.type === "BlockStatement" ) {
          return;
        }

        context.report( {
          node: node,
          messageId: "requireBlock",
          fix( fixer ) {
            const consequentText = sourceCode.getText( node.consequent );
            const indent = " ".repeat( node.loc.start.column + 2 );
            const lineBreak = "\n";
            const fixedText = `{${lineBreak}${indent}${consequentText}${lineBreak}${" ".repeat( node.loc.start.column )}}`;
            return fixer.replaceText( node.consequent, fixedText );
          },
        } );
      },
    };
  },
};
