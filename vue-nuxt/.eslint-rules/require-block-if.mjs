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
        // Skip if already has a block
        if ( node.consequent.type === "BlockStatement" ) {
          return;
        }

        context.report( {
          node: node,
          messageId: "requireBlock",
          fix( fixer ) {
            // Get text of the original consequent
            const consequentText = sourceCode.getText( node.consequent );

            // Wrap it in braces with proper indentation
            const indent = " ".repeat( node.loc.start.column + 2 ); // add 2 spaces inside block
            const lineBreak = "\n";
            const fixedText = `{${lineBreak}${indent}${consequentText}${lineBreak}${" ".repeat( node.loc.start.column )}}`;

            return fixer.replaceText( node.consequent, fixedText );
          },
        } );
      },
    };
  },
};
