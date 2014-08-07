# broccoli-sassdoc [![npm version](http://img.shields.io/npm/v/broccoli-sassdoc.svg?style=flat)](https://www.npmjs.org/package/broccoli-sassdoc) [![Build Status: Linux](http://img.shields.io/travis/SassDoc/broccoli-sassdoc.svg?style=flat)](https://travis-ci.org/SassDoc/broccoli-sassdoc?branch=master)

> [SassDoc] compiler for [Broccoli].

[SassDoc]: https://github.com/SassDoc/sassdoc
[Broccoli]: https://github.com/broccolijs/broccoli


## Installation

```sh
npm install --save-dev broccoli-sassdoc
```


## Usage

```js
var sassdoc = require('broccoli-sassdoc');
var docs = sassdoc(tree, options);
```

* `tree`: A [broccoli tree](https://github.com/broccolijs/broccoli#plugin-api-specification) or a directory path as a string.
* `options`: An object of options to pass to SassDoc.


## Options

Any specified option will be passed through directly to SassDoc, thus you can specify any option that SassDoc supports.
See the [SassDoc documentation](https://github.com/SassDoc/sassdoc/wiki/Customising-the-View) for a list of supported options.


#### verbose

Type: `Boolean`  
Default: `false`

Whether to enable SassDoc own logger or not.


#### config

Type: `String`  
Default: `null`

Path to a view configuration file.


#### display.access

Type: `Array`  
Default: `['public', 'private']`

Access levels that should be displayed.


#### display.alias

Type: `Boolean`  
Default: `false`

Enable/disable display of alias items.


#### display.watermark

Type: `Boolean`  
Default: `true`

Enable/disable display of SassDoc watermark in footer.


#### package

Type: `String | Object`  
Default: `null`

Pass your project informations to the generated view.
Either a path to your `package.json` or an object.

Following keys will be looked for:
`title`
`name`
`version`
`license`
`homepage`
`description`


#### theme

Type: `String`  
Default: `'default'`  
Since: `sassdoc@1.2.0`

Name of a custom theme, either a published package or a local one.
Check the [doc](https://github.com/SassDoc/sassdoc/wiki/Using-Your-Own-Theme) for more infos.


#### groups

Type: `Object`  
Default: `{ 'undefined': 'Ungrouped' }`  
Since: `sassdoc@1.2.0`

Give friendly names to your groups, if any.
Check the [doc](https://github.com/SassDoc/sassdoc-filter#group-name) for more infos.


#### basePath

Type: `String`  
Default: `null`  
Since: `sassdoc@1.2.0`

An URL or a path which will be transformed in a link to the source file.
Check the [doc](https://github.com/SassDoc/sassdoc/wiki/Customising-the-View) for more infos.


_**Heads up**: If a config file is passed and found, its options will prevail over defaults.
Additional options passed to the Broccoli build, will complement it but not override it.
You should really manage your options in one place._


### Config examples

```js
// Bare minimum, using defaults.
var docs = sassdoc('path/to/sass');
```

```js
// Example with external view configuration file.
var docs = sassdoc('path/to/sass', {
    config: 'path/to/view.json'
});
```

```js
// Example with passed in options.
var docs = sassdoc('path/to/sass', {
    verbose: true,
    display: {
      access: ['public', 'private'],
      alias: true,
      watermark: true
    },
    package: './package.json'
});
```


## Authors

[Pascal Duez](http://pascalduez.me)


## Licence

broccoli-sassdoc is [unlicensed](http://unlicense.org/).
