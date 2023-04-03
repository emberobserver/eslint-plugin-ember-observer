const rule = require('../../../lib/rules/no-jquery-integration');
const RuleTester = require('eslint').RuleTester;

const { ERROR_MESSAGE } = rule;
const eslintTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
});

eslintTester.run('no-jquery-integration', rule, {
  valid: [
    `
        export default Ember.Component({
          didInsertElement() {
            this.element.classList.add('active')
          }
        });`,
    {
      filename: 'example-app/tests/integration/component/some-component-test.js',
      code: `
        import { moduleForComponent, test } from 'ember-qunit';
        import hbs from 'htmlbars-inline-precompile';

        moduleForComponent('some-component', 'Integration | Component | some-component', {
          integration: true
        });

        test('assert something', function() {
          assert.equal(find('.some-component').textContent.trim(), 'hello world');
        })`,
    },
    // Global $
    `
      export default Ember.Component({
        didInsertElement() {
          $(body).addClass('active')
        }
      });`,
    // import $
    `
    import $ from 'jquery';
    export default Ember.Component({
      didInsertElement() {
        $(body).addClass('active')
      }
    });`,
    `
    import $ from 'jquery';
    import Service from '@ember/service';
    export default Service.extend({
      myFunc(a, b) {
        return $.extend({}, a, b);
      }
    });`,
    // aliased import $ from jquery
    `
    import jq from 'jquery';
    import Service from '@ember/service';
    export default Service.extend({
      myFunc(a, b) {
        return jq.extend({}, a, b);
      }
    });`,
  ],
  invalid: [
    // Ember.$
    {
      code: `
        export default Ember.Component({
          didInsertElement() {
            Ember.$(body).addClass('active')
          }
        });`,
      output: null,
      errors: [
        {
          message: ERROR_MESSAGE,
          type: 'MemberExpression',
        },
      ],
    },
    // Em.$
    {
      code: `
        export default Ember.Component({
          didInsertElement() {
            Em.$(body).addClass('active')
          }
        });`,
      output: null,
      errors: [
        {
          message: ERROR_MESSAGE,
          type: 'MemberExpression',
        },
      ],
    },
    // AliasedEmber.$
    {
      code: `
        import E from 'ember';
        export default Ember.Component({
          didInsertElement() {
            E.$(body).addClass('active')
          }
        });`,
      output: null,
      errors: [
        {
          message: ERROR_MESSAGE,
          type: 'MemberExpression',
        },
      ],
    },
    // const jq = Ember.$
    {
      code: `
        const jq = Ember.$;
        export default Ember.Component({
          didInsertElement() {
            jq(body).addClass('active')
          }
        });`,
      output: null,
      errors: [
        {
          message: ERROR_MESSAGE,
          type: 'MemberExpression',
        },
      ],
    },
    // const { $ } = Ember;
    {
      code: `
        const { $ } = Ember;
        export default Ember.Component({
          didInsertElement() {
            $(body).addClass('active')
          }
        });`,
      output: null,
      errors: [
        {
          message: ERROR_MESSAGE,
          line: 2,
          type: 'VariableDeclarator',
        },
      ],
    },
    // this.$
    {
      code: `
        export default Ember.Component({
          didInsertElement() {
            this.$().addClass('active')
          }
        });`,
      output: null,
      errors: [
        {
          message: ERROR_MESSAGE,
          type: 'ThisExpression',
        },
      ],
    },
    {
      filename: 'example-app/tests/integration/component/some-component-test.js',
      code: `
        import { moduleForComponent, test } from 'ember-qunit';
        import hbs from 'htmlbars-inline-precompile';

        moduleForComponent('some-component', 'Integration | Component | some-component', {
          integration: true
        });

        test('assert something', function() {
          assert.equal(this.$('.some-component').text().trim(), 'hello world');
        })`,
      output: null,
      errors: [
        {
          message: ERROR_MESSAGE,
          type: 'ThisExpression',
        },
      ],
    },
  ],
});
