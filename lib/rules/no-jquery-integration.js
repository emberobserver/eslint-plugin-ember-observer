'use strict';

const ember = require('eslint-plugin-ember/lib/utils/ember');
const utils = require('eslint-plugin-ember/lib/utils/utils');

//------------------------------------------------------------------------------
// General rule -  Disallow usage of jQuery integration
//------------------------------------------------------------------------------

const ERROR_MESSAGE = 'Do not use jQuery integration';

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow any usage of jQuery integration',
      category: 'Ember Observer',
      recommended: false,
      octane: false,
      url: 'https://github.com/ember-cli/eslint-plugin-ember/tree/master/docs/rules/no-jquery-integration.md',
    },
    fixable: null,
    schema: [],
  },

  ERROR_MESSAGE,

  create(context) {
    let emberImportAliasName;
    const report = function(node) {
      context.report(node, ERROR_MESSAGE);
    };

    return {
      ImportDeclaration(node) {
        emberImportAliasName = ember.getEmberImportAliasName(node);
      },

      VariableDeclarator(node) {
        if (
          utils
            .collectObjectPatternBindings(node, {
              Ember: ['$'],
            })
            .pop()
        ) {
          report(node);
        }
      },

      MemberExpression(node) {
        if (
          (node.object.name === 'Ember' ||
            node.object.name === 'Em' ||
            (emberImportAliasName && node.object.name === emberImportAliasName)) &&
          node.property.name === '$'
        ) {
          report(node);
        }
      },

      'CallExpression > MemberExpression > ThisExpression'(node) {
        if (node.parent.property.name === '$') {
          report(node);
        }
      },
    };
  },
};
