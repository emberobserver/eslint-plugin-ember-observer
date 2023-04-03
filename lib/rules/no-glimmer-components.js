'use strict';

//------------------------------------------------------------------------------
// General rule - Indicates the use of Glimmer Components
//------------------------------------------------------------------------------

const ERROR_MESSAGE = "This addon uses Glimmer Components";

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'indicates use of glimmer components',
      category: 'Ember Observer',
      recommended: false,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/no-glimmer-components.md',
    },
    fixable: null,
    schema: [],
  },

  ERROR_MESSAGE,

  create(context) {
    const report = function(node) {
      context.report(node, ERROR_MESSAGE);
    };

    return {
      ImportDeclaration(node) {
        const importSource = node.source.value;

        if (importSource === '@glimmer/component' && node.specifiers.some(s => s.local.name === 'Component')) {
          report(node);
        }
      },
    };
  },
};
