# Indicate the use of @tracked (`ember-observer/no-tracked`)

<!-- end auto-generated rule header -->

Don't use @tracked when supporting Ember < 3.13

## Rule name: `no-tracked`

Octane is awesome and we all want to use the best-new-stuff NOW! So why use this rule? 
`@tracked` is not supported in Ember < 3.13 and there is no polyfill. For now, if your addon 
wants to do the responsible thing and support all supported Embers, you need to avoid `@tracked`.

## Examples

Examples of **incorrect** code for this rule:

```javascript
  import { tracked } from '@glimmer/tracking';
```
