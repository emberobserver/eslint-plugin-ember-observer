// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-tracked');
const RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const { ERROR_MESSAGE } = rule;
const eslintTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: 'module' },
});
eslintTester.run('no-tracked', rule, {
  valid: [
    'import { computed } from "@ember/object"',
  ],
  invalid: [
    {
      code: `
        import { tracked }  from "@glimmer/tracking";
      `,
      output: null,
      errors: [{ message: ERROR_MESSAGE, type: 'ImportDeclaration' }],
    }
  ],
});
