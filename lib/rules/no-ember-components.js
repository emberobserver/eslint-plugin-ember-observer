'use strict';

//------------------------------------------------------------------------------
// General rule - Used to determine if an addon proviles Ember Components
//------------------------------------------------------------------------------

const ERROR_MESSAGE = "This addon provides Ember Components";

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'indicate the usage of Ember Components',
      category: 'Ember Observer',
      recommended: false,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/no-ember-components.md',
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

        if (importSource === '@ember/component' && node.specifiers.some(s => s.local.name === 'Component')) {
          report(node);
        }
      },
    };
  },
};
