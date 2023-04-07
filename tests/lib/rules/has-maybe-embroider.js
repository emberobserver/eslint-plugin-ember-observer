/**
 * @fileoverview Require maybeEmbroider function imported and called in ember-cli-build.js
 * @author Stanislav Dunajcan
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/has-maybe-embroider"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: "module" },
});
ruleTester.run("has-maybe-embroider", rule, {
  valid: [
    {
      // maybeEmbroider directly returned
      filename: 'some/path/ember-cli-build.js',
      code: `
      const { maybeEmbroider } = require("@embroider/test-setup");
      module.exports = function (defaults){
        return maybeEmbroider();
      }`
    },
    {
      // maybeEmbroider aliased, directly returned
      filename: 'some/path/ember-cli-build.js',
      code: `
      const { maybeEmbroider: me } = require("@embroider/test-setup");
      module.exports = function (defaults){
        return me();
      }`
    },
    {
      // maybeEmbroider from default export directly returned
      filename: 'some/path/ember-cli-build.js',
      code: `
      const testSetup = require("@embroider/test-setup");
      module.exports = function (defaults){
        return testSetup.maybeEmbroider();
      }`
    },
    {
      // maybeEmbroider assigned to result and then returned
      filename: 'some/path/ember-cli-build.js',
      code: `
      const { maybeEmbroider } = require("@embroider/test-setup");
      module.exports = function (defaults){
        let result = maybeEmbroider();
        return result;
      }`
    },
    {
      filename: 'some/path/ember-cli-build.js',
      code: `
      const { maybeEmbroider: me } = require("@embroider/test-setup");
      module.exports = function (defaults){
        let result = me();
        return result;
      }`
    },
    {
      filename: 'some/path/ember-cli-build.js',
      code: `
      const testSetup = require("@embroider/test-setup");
      module.exports = function (defaults){
        let result = testSetup.maybeEmbroider();
        return result;
      }`
    },
    {
      // other files are not checked
      filename: 'some/path/some-file.js',
      code: `const a = 1;`
    },
  ],

  invalid: [
    {
      // maybeEmbroider imported from different package
      filename: 'some/path/ember-cli-build.js',
      code: `
      const { maybeEmbroider } = require("different-package");
      module.exports = function (defaults){
        return maybeEmbroider();
      }`,
      errors: ['maybeEmbroider isn\'t called!'],
    },
    {
      // result not returned
      filename: 'some/path/ember-cli-build.js',
      code: `
      const { maybeEmbroider } = require("@embroider/test-setup");
      module.exports = function (defaults){
        maybeEmbroider();
      }`,
      errors: ['maybeEmbroider isn\'t called!'],
    },
    {
      // something else returned
      filename: 'some/path/ember-cli-build.js',
      code: `
      const { maybeEmbroider } = require("@embroider/test-setup");
      module.exports = function (defaults){
        return someOtherFunc();
      }`,
      errors: ['maybeEmbroider isn\'t called!'],
    },
    {
      // testSetup imported from different package
      filename: 'some/path/ember-cli-build.js',
      code: `
      const testSetup = require("different-package");
      module.exports = function (defaults){
        return testSetup.maybeEmbroider();
      }`,
      errors: ['maybeEmbroider isn\'t called!'],
    },
    {
      // maybeEmbroider assigned, but not returned
      filename: 'some/path/ember-cli-build.js',
      code: `
      const testSetup = require("@embroider/test-setup");
      module.exports = function (defaults){
        let result = testSetup.maybeEmbroider();
        return otherResult;
      }`,
      errors: ['maybeEmbroider isn\'t called!'],
    },
    {
      // function not exported
      filename: 'some/path/ember-cli-build.js',
      code: `
      const { maybeEmbroider } = require("@embroider/test-setup");
      function someFunc (defaults){
        return maybeEmbroider();
      }`,
      errors: ['maybeEmbroider isn\'t called!'],
    },
  ],
});