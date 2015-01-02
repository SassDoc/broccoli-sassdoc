/*
 * broccoli-sassdoc
 *
 * unlicenced
 * https://github.com/SassDoc/broccoli-sassdoc/blob/master/UNLICENCE
 */

'use strict';

var Writer = require('broccoli-writer');
var fs = require('fs');
var path = require('path');
var sassdoc = require('sassdoc');
var chalk = require('chalk');
var _ = require('lodash');


function fileExists() {
  var filePath = path.join.apply(path, arguments);
  return fs.existsSync(filePath);
}


function loadJSON(filePath) {
  if (!fileExists(filePath)) {
    console.log('Source file "' + chalk.cyan(filePath) + '" not found.');
    return false;
  }
  else {
    return require(path.join(process.cwd(), filePath));
  }
}


function handleOptions(options) {
  // Defaults.
  options = _.assign({
    verbose: false,
    config: null,
    display: {
      access: ['public', 'private'],
      alias: false,
      watermark: true
    },
    groups: {
      'undefined': 'Ungrouped'
    },
    package: null,
    theme: 'default',
    basePath: null,
    force: true,
    interactive: false
  }, options);

  // If a config file is passed and found,
  // its options will prevail over defauts.
  if (options.config) {
    var config = loadJSON(options.config);

    if (config) {
      options = _.assign(options, config);
    }
  }

  // If a package path is passed try to load the file.
  if (_.isString(options.package)) {
    options.package = loadJSON(options.package);
  }
  // If options.package is not usable, delete it.
  if (!_.isPlainObject(options.package) || _.isEmpty(options.package)) {
    options = _.omit(options, 'package');
  }

  // Enable SassDoc logger.
  if (options.verbose) {
    sassdoc.logger.enabled = true;
  }

  // Clean options not expected by SassDoc.
  options = _.omit(options, ['verbose', 'config']);

  return options;
}


function SassDocCompile(inputTree, options) {
  if (!(this instanceof SassDocCompile)) {
    return new SassDocCompile(inputTree, options);
  }

  this.inputTree = inputTree;
  this.options = options || {};
}

SassDocCompile.prototype = Object.create(Writer.prototype);
SassDocCompile.prototype.constructor = SassDocCompile;
SassDocCompile.prototype.description = 'Generates SassDoc documentation';

SassDocCompile.prototype.write = function (readTree, destDir) {
  var options = handleOptions(this.options);

  return readTree(this.inputTree).then(function (srcDir) {

    return sassdoc
      .documentize(srcDir, destDir, options)
      .then(function () {
        console.log('SassDoc documentation successfully generated.');
      })
      .catch(function (err) {
        throw err;
      });

  });

};


module.exports = SassDocCompile;
