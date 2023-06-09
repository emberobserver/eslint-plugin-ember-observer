# Disallow any usage of jQuery integration (`ember-observer/no-jquery-integration`)

<!-- end auto-generated rule header -->
This rule attempts to catch and prevent any usage of the jQuery integration.

## Examples

If you want to turn off the jQuery integration this rule can help you by warning you of any usage of the jQuery integration
in your app.

That includes:
- `this.$`, either on components or tests.
- `Ember.$` or `const { $ } = Ember;`

For replacing `this.$` on components you can use the native DOM counterpart `this.element`
For replacing `this.$` on tests, check [ember-native-dom-helpers](https://github.com/cibernox/ember-native-dom-helpers)

Examples of **incorrect** code for this rule:

```js
export default Component.extend({
  didInsertElement() {
    this.$('input').focus();
  }
});
```

```js
export default Component.extend({
  click() {
    Ember.$('body').addClass('expanded');
  }
});
```

Examples of **correct** code for this rule:

```js
export default Component.extend({
  didInsertElement() {
    this.element.querySelector('input').focus();
  }
});
```

```js
export default Component.extend({
  click() {
    document.body.classList.add('expanded');
  }
});
