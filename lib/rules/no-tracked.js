'use strict';

//------------------------------------------------------------------------------
// General rule - Don't use @tracked (for Addons supporting Ember < 3.13)
//------------------------------------------------------------------------------

const ERROR_MESSAGE = "Don't use @tracked - consumers of your addon cannot use Ember < 3.13";

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'indicate the use of @tracked',
      category: 'Ember Observer',
      recommended: false,
      url:
        'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/no-tracked.md',
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

        if (importSource === '@glimmer/tracking' && node.specifiers.some(s => s.imported.name === 'tracked')) {
          report(node);
        }
      },
    };
  },
};
