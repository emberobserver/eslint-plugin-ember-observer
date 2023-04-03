# eslint-plugin-ember-observer

Eslint rules used for static analysis for emberobserver.com, so you probably don't want to enable these in your own project!

## Installation

```sh
npm install eslint-plugin-ember-observer --save-dev
```

## Usage

Add `ember-observer` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "ember-observer"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "ember-observer/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                                         | Description                              |
| :----------------------------------------------------------- | :--------------------------------------- |
| [no-ember-components](docs/rules/no-ember-components.md)     | indicate the usage of Ember Components   |
| [no-glimmer-components](docs/rules/no-glimmer-components.md) | indicates use of glimmer components      |
| [no-jquery-integration](docs/rules/no-jquery-integration.md) | disallow any usage of jQuery integration |

<!-- end auto-generated rules list -->


